<template>
  <div class="editor-container">
    <div v-if="editor" class="toolbar">
      <div class="toolbar-group">
        <button @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"
          title="Bold">
          <i class="icon-bold"></i>
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }" title="Italic">
          <i class="icon-italic"></i>
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }" title="Strike-through">
          <i class="icon-strikethrough"></i>
        </button>
        <button @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }"
          title="Code">
          <i class="icon-code"></i>
        </button>
        <button @click="editor.chain().focus().unsetAllMarks().run()" title="Clear formatting">
          <i class="icon-clear"></i>
        </button>
      </div>

      <div class="toolbar-group">

        <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" title="Heading 2">
          H2
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" title="Heading 3">
          H3
        </button>
      </div>

      <div class="toolbar-group">
        <button @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }" title="Bullet List">
          <i class="icon-bullet-list"></i>
        </button>
        <button @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }" title="Ordered List">
          <i class="icon-ordered-list"></i>
        </button>
      </div>

      <div class="toolbar-group">
        <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()"
          title="Undo">
          <i class="icon-undo"></i>
        </button>
        <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()"
          title="Redo">
          <i class="icon-redo"></i>
        </button>
      </div>
    </div>
    <!-- Editor content -->
    <TiptapEditorContent :editor="editor" class="editor-content" />
  </div>

</template>

<script setup>
const emit = defineEmits(['updatedContent'])
const props = defineProps(['initalData'])

const editor = useEditor({
  content: props.initalData,
  extensions: [TiptapStarterKit],
  onUpdate: () => {
    emit('updatedContent', editor.value.getHTML())
  }

});

function deneme() {

  console.log("deneme")
}

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>

<style scoped>
.editor-container {
  margin: 0 auto;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  gap: 10px;
}

.toolbar-group {
  display: flex;
  gap: 5px;
}

button {
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  font-size: 16px;
}

button.is-active {
  background-color: #e0e0e0;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #d0d0d0;
}

.editor-content {
  border: 1px solid #ddd;
  padding: 20px;
  min-height: 200px;
}

.icon-bold::before {
  content: '𝐁';
}

.icon-italic::before {
  content: '𝑖';
}

.icon-strikethrough::before {
  content: 'S';
}

.icon-code::before {
  content: '</>';
}

.icon-clear::before {
  content: '✖';
}

.icon-bullet-list::before {
  content: '•';
}

.icon-ordered-list::before {
  content: '1.';
}

.icon-undo::before {
  content: '↺';
}

.icon-redo::before {
  content: '↻';
}
</style>
