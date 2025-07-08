<template>
  <div class="tiptap-editor-container">
    <!-- Toolbar -->
    <div v-if="editor" class="tiptap-toolbar">
      <!-- Formatting Tools -->
      <div class="toolbar-group">
        <UButton @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :color="editor.isActive('bold') ? 'orange' : 'gray'" :variant="editor.isActive('bold') ? 'solid' : 'ghost'"
          size="xs" icon="i-heroicons-bold" square />
        <UButton @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :color="editor.isActive('italic') ? 'orange' : 'gray'"
          :variant="editor.isActive('italic') ? 'solid' : 'ghost'" size="xs" icon="i-heroicons-italic" square />
        <UButton @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :color="editor.isActive('strike') ? 'orange' : 'gray'"
          :variant="editor.isActive('strike') ? 'solid' : 'ghost'" size="xs" square>
          <span class="text-xs font-bold">S</span>
        </UButton>
        <UButton @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :color="editor.isActive('code') ? 'orange' : 'gray'" :variant="editor.isActive('code') ? 'solid' : 'ghost'"
          size="xs" icon="i-heroicons-code-bracket" square />
        <UButton @click="editor.chain().focus().unsetAllMarks().run()" color="gray" variant="ghost" size="xs"
          icon="i-heroicons-x-mark" square title="Formatı temizle" />
      </div>

      <!-- Divider -->
      <div class="toolbar-divider"></div>

      <!-- Headings -->
      <div class="toolbar-group">
        <UButton @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :color="editor.isActive('heading', { level: 2 }) ? 'orange' : 'gray'"
          :variant="editor.isActive('heading', { level: 2 }) ? 'solid' : 'ghost'" size="xs" square>
          <span class="text-xs font-bold">H2</span>
        </UButton>
        <UButton @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :color="editor.isActive('heading', { level: 3 }) ? 'orange' : 'gray'"
          :variant="editor.isActive('heading', { level: 3 }) ? 'solid' : 'ghost'" size="xs" square>
          <span class="text-xs font-bold">H3</span>
        </UButton>
      </div>

      <!-- Divider -->
      <div class="toolbar-divider"></div>

      <!-- Lists -->
      <div class="toolbar-group">
        <UButton @click="editor.chain().focus().toggleBulletList().run()"
          :color="editor.isActive('bulletList') ? 'orange' : 'gray'"
          :variant="editor.isActive('bulletList') ? 'solid' : 'ghost'" size="xs" icon="i-heroicons-list-bullet"
          square />
        <UButton @click="editor.chain().focus().toggleOrderedList().run()"
          :color="editor.isActive('orderedList') ? 'orange' : 'gray'"
          :variant="editor.isActive('orderedList') ? 'solid' : 'ghost'" size="xs" square>
          <span class="text-xs font-bold">1.</span>
        </UButton>
      </div>

      <!-- Divider -->
      <div class="toolbar-divider"></div>

      <!-- Undo/Redo -->
      <div class="toolbar-group">
        <UButton @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()"
          color="gray" variant="ghost" size="xs" icon="i-heroicons-arrow-uturn-left" square title="Geri al" />
        <UButton @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()"
          color="gray" variant="ghost" size="xs" icon="i-heroicons-arrow-uturn-right" square title="Yinele" />
      </div>
    </div>

    <!-- Editor Content -->
    <div class="tiptap-content-wrapper">
      <TiptapEditorContent :editor="editor" class="tiptap-editor-content" />
    </div>
  </div>
</template>

<script setup>
// Import Placeholder extension
import { Placeholder } from '@tiptap/extension-placeholder'

const emit = defineEmits(['updatedContent'])
const props = defineProps(['initalData', 'placeholder'])

const editor = useEditor({
  content: props.initalData,
  extensions: [
    TiptapStarterKit,
    Placeholder.configure({
      placeholder: props.placeholder || 'Detaylı açıklama yazın...',
    }),
  ],
  onUpdate: () => {
    emit('updatedContent', editor.value.getHTML())
  }
});

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>

<style scoped>
.tiptap-editor-container {
  @apply border border-neutral-200 dark:border-neutral-600 rounded-lg overflow-hidden bg-white dark:bg-neutral-800;
}

.tiptap-toolbar {
  @apply flex flex-wrap items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-700 border-b border-neutral-200 dark:border-neutral-600;
}

.toolbar-group {
  @apply flex items-center gap-1;
}

.toolbar-divider {
  @apply w-px h-6 bg-neutral-300 dark:bg-neutral-500;
}

.tiptap-content-wrapper {
  @apply relative;
}

.tiptap-editor-content {
  @apply p-4 min-h-[200px] max-h-[400px] overflow-y-auto;
}

/* Editor content styling */
:deep(.tiptap-editor-content .ProseMirror) {
  @apply text-neutral-900 dark:text-neutral-100 focus:outline-none;
  line-height: 1.6;
}

:deep(.tiptap-editor-content .ProseMirror h2) {
  @apply text-xl font-semibold text-neutral-900 dark:text-white mt-4 mb-2 first:mt-0;
}

:deep(.tiptap-editor-content .ProseMirror h3) {
  @apply text-lg font-medium text-neutral-800 dark:text-neutral-100 mt-3 mb-2 first:mt-0;
}

:deep(.tiptap-editor-content .ProseMirror p) {
  @apply mb-3 last:mb-0 text-neutral-700 dark:text-neutral-200;
}

:deep(.tiptap-editor-content .ProseMirror ul) {
  @apply list-disc list-inside mb-3 space-y-1;
}

:deep(.tiptap-editor-content .ProseMirror ol) {
  @apply list-decimal list-inside mb-3 space-y-1;
}

:deep(.tiptap-editor-content .ProseMirror li) {
  @apply text-neutral-700 dark:text-neutral-200;
}

:deep(.tiptap-editor-content .ProseMirror strong) {
  @apply font-semibold text-neutral-900 dark:text-white;
}

:deep(.tiptap-editor-content .ProseMirror em) {
  @apply italic text-neutral-700 dark:text-neutral-200;
}

:deep(.tiptap-editor-content .ProseMirror s) {
  @apply line-through text-neutral-600 dark:text-neutral-300;
}

:deep(.tiptap-editor-content .ProseMirror code) {
  @apply px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded font-mono text-sm;
}

:deep(.tiptap-editor-content .ProseMirror pre) {
  @apply bg-neutral-100 dark:bg-neutral-700 p-3 rounded text-neutral-800 dark:text-neutral-200 font-mono text-sm overflow-x-auto mb-3;
}

/* Placeholder text */
:deep(.tiptap-editor-content .ProseMirror p.is-editor-empty:first-child::before) {
  @apply text-neutral-400 dark:text-neutral-500;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

/* Focus styles */
:deep(.tiptap-editor-content .ProseMirror:focus) {
  @apply outline-none;
}

/* Selection styles */
:deep(.tiptap-editor-content .ProseMirror ::selection) {
  @apply bg-secondary-200 dark:bg-secondary-800;
}
</style>
