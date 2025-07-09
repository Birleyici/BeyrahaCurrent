<template>
  <div>
    <!-- Upload Button -->
    <div class="inline-block">
      <UButton :loading="loading" icon="i-heroicons-cloud-arrow-up" color="primary" variant="solid" size="sm"
        :label="loading ? 'Yükleniyor...' : 'Görsel Yükle'" :disabled="loading" @click="triggerFileInput"
        class="cursor-pointer" />
    </div>

    <!-- Hidden File Input -->
    <input ref="fileInput" type="file" multiple accept="image/*" class="hidden" @change="uploadImages($event)"
      :disabled="loading" />

    <!-- Drag & Drop Area (Alternative) -->
    <div v-if="showDropZone"
      class="mt-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary-400 dark:hover:border-primary-500 transition-colors duration-200"
      :class="{
        'border-primary-500 bg-primary-50 dark:bg-primary-900/20': isDragOver,
        'border-gray-300 dark:border-gray-600': !isDragOver
      }" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave" @drop.prevent="handleDrop">
      <div class="space-y-3">
        <Icon name="i-heroicons-cloud-arrow-up" class="w-12 h-12 mx-auto text-gray-400"
          :class="{ 'text-primary-500': isDragOver }" />
        <div>
          <p class="text-lg font-medium text-gray-900 dark:text-white">
            {{ isDragOver ? 'Dosyaları bırakın' : 'Görselleri sürükleyip bırakın' }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            veya
            <button type="button" @click="triggerFileInput"
              class="text-primary-600 dark:text-primary-400 hover:text-primary-500 cursor-pointer font-medium">
              dosya seçin
            </button>
          </p>
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400">
          PNG, JPG, GIF formatları desteklenir (Maks. 10MB)
        </div>
      </div>
    </div>

    <!-- Upload Progress Modal -->
    <UModal v-model="showProgressModal" :ui="{ width: 'sm:max-w-md' }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center gap-3">
            <Icon name="i-heroicons-cloud-arrow-up" class="w-5 h-5 text-primary-500" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Görseller Yükleniyor
            </h3>
          </div>
        </template>

        <div class="space-y-4">
          <div v-for="(progress, index) in uploadProgress" :key="index" class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Dosya {{ index + 1 }}</span>
              <span class="text-gray-900 dark:text-white font-medium">{{ Math.round(progress.percent) }}%</span>
            </div>
            <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div class="bg-primary-500 h-full transition-all duration-300 ease-out"
                :style="{ width: `${progress.percent}%` }" />
            </div>
          </div>
        </div>
      </UCard>
    </UModal>

    <!-- Upload Results Toast/Notification -->
    <div v-if="uploadResults.length > 0" class="fixed top-4 right-4 z-50 max-w-sm w-full space-y-2">
      <div v-for="result in uploadResults" :key="result.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 transform transition-all duration-300 ease-in-out"
        :class="{
          'border-l-4 border-l-green-500': result.success,
          'border-l-4 border-l-red-500': !result.success
        }">
        <div class="flex items-start gap-3">
          <Icon :name="result.success ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="w-5 h-5 mt-0.5"
            :class="{
              'text-green-500': result.success,
              'text-red-500': !result.success
            }" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white">
              {{ result.fileName }}
            </p>
            <p class="text-xs mt-1" :class="{
              'text-green-600 dark:text-green-400': result.success,
              'text-red-600 dark:text-red-400': !result.success
            }">
              {{ result.success ? 'Başarıyla yüklendi' : result.error }}
            </p>
          </div>
          <button @click="removeResult(result.id)" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <Icon name="i-heroicons-x-mark" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['uploadedImages']);

// Props
const props = defineProps({
  showDropZone: {
    type: Boolean,
    default: false
  },
  maxFileSize: {
    type: Number,
    default: 10 * 1024 * 1024 * 3 // 30MB
  },
  acceptedTypes: {
    type: Array,
    default: () => ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  }
});

// Reactive data
const loading = ref(false);
const isDragOver = ref(false);
const uploadProgress = ref([]);
const uploadResults = ref([]);
const fileInput = ref(null);
const showProgressModal = ref(false);

// Methods
const validateFile = (file) => {
  const errors = [];

  if (!props.acceptedTypes.includes(file.type)) {
    errors.push('Desteklenmeyen dosya formatı');
  }

  if (file.size > props.maxFileSize) {
    errors.push(`Dosya boyutu ${formatFileSize(props.maxFileSize)} limitini aşıyor`);
  }

  return errors;
};

const formatFileSize = (bytes) => {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

const uploadImages = async (event) => {
  console.log('Upload başlatıldı:', event.target.files);

  const files = Array.from(event.target.files);
  if (files.length === 0) {
    console.log('Dosya seçilmedi');
    return;
  }

  console.log('Seçilen dosyalar:', files);
  loading.value = true;
  showProgressModal.value = true;
  uploadProgress.value = [];
  uploadResults.value = [];

  // Validate files
  const validFiles = [];
  files.forEach(file => {
    console.log('Dosya kontrol ediliyor:', file.name, file.type, file.size);
    const errors = validateFile(file);
    if (errors.length > 0) {
      console.log('Dosya geçersiz:', file.name, errors);
      uploadResults.value.push({
        id: Math.random(),
        fileName: file.name,
        success: false,
        error: errors.join(', ')
      });
    } else {
      console.log('Dosya geçerli:', file.name);
      validFiles.push(file);
    }
  });

  if (validFiles.length === 0) {
    console.log('Geçerli dosya yok');
    loading.value = false;
    showProgressModal.value = false;
    return;
  }

  console.log('Geçerli dosyalar:', validFiles);

  // Initialize progress tracking
  uploadProgress.value = validFiles.map(() => ({ percent: 0 }));

  try {
    // Simulate progress for demo (replace with actual upload progress)
    const progressInterval = setInterval(() => {
      uploadProgress.value = uploadProgress.value.map(p => ({
        percent: Math.min(p.percent + Math.random() * 20, 90)
      }));
    }, 200);

    const formData = new FormData();
    validFiles.forEach(file => {
      formData.append("file[]", file);
    });

    console.log('API isteği gönderiliyor...');
    console.log('FormData:', formData);

    const response = await useBaseOFetchWithAuth("upload", {
      method: "post",
      body: formData,
    });

    console.log('API yanıtı:', response);

    clearInterval(progressInterval);
    uploadProgress.value = uploadProgress.value.map(() => ({ percent: 100 }));

    // Wait a bit to show 100% completion
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!response.error) {
      console.log(`Yükleme başarılı, path'ler kaydediliyor...`);
      const savedImages = await saveImagePaths(response);
      console.log('Kaydedilen görseller:', savedImages);

      // Add success results
      validFiles.forEach(file => {
        uploadResults.value.push({
          id: Math.random(),
          fileName: file.name,
          success: true
        });
      });

      emit('uploadedImages', savedImages);
    } else {
      console.error('API hatası:', response.error);
      throw new Error(response.error);
    }
  } catch (error) {
    console.error('Upload error:', error);

    // Add error results
    validFiles.forEach(file => {
      uploadResults.value.push({
        id: Math.random(),
        fileName: file.name,
        success: false,
        error: `Yükleme sırasında hata oluştu: ${error.message || error}`
      });
    });
  }

  loading.value = false;
  showProgressModal.value = false;
  uploadProgress.value = [];

  // Clear file input
  event.target.value = '';

  // Auto-clear results after 5 seconds
  setTimeout(() => {
    uploadResults.value = [];
  }, 5000);
};

const saveImagePaths = async (paths) => {
  try {
    const response = await useBaseOFetchWithAuth("vendor/images", {
      method: "POST",
      body: paths,
    });
    return response.data || [];
  } catch (error) {
    console.error('Save paths error:', error);
    throw error;
  }
};

// Drag & Drop handlers
const handleDragOver = (event) => {
  event.preventDefault();
  isDragOver.value = true;
};

const handleDragLeave = (event) => {
  event.preventDefault();
  isDragOver.value = false;
};

const handleDrop = (event) => {
  event.preventDefault();
  isDragOver.value = false;

  const files = Array.from(event.dataTransfer.files);
  if (files.length > 0) {
    // Create a fake event object for uploadImages
    const fakeEvent = {
      target: { files, value: '' }
    };
    uploadImages(fakeEvent);
  }
};

const clearResults = () => {
  uploadResults.value = [];
};

const triggerFileInput = () => {
  console.log('Dosya seçim ekranı açılıyor...');
  if (fileInput.value) {
    fileInput.value.click();
  } else {
    console.error('File input ref bulunamadı');
  }
};

const removeResult = (id) => {
  uploadResults.value = uploadResults.value.filter(result => result.id !== id);
};
</script>