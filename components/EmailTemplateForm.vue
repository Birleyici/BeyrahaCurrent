<template>
    <div class="py-6">
        <!-- Ana İçerik -->
        <div v-if="!isEdit || !templateLoading" class="max-w-7xl mx-auto ">
            <!-- Error State -->
            <div v-if="error"
                class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
                <div class="flex">
                    <ExclamationTriangleIcon class="h-5 w-5 text-red-400 dark:text-red-300 flex-shrink-0 mt-0.5" />
                    <div class="ml-3 flex-1">
                        <h3 class="text-sm font-medium text-red-800 dark:text-red-200">Hata</h3>
                        <div class="text-sm text-red-700 dark:text-red-300 mt-1">
                            <pre v-if="error.includes('\n')" class="whitespace-pre-wrap font-sans">{{ error }}</pre>
                            <p v-else>{{ error }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Sol Panel - Araçlar -->
                <div class="lg:col-span-1">
                    <div
                        class="bg-white dark:bg-neutral-800 shadow rounded-lg p-6 sticky top-6 border border-neutral-200 dark:border-neutral-700">
                        <!-- Temel Bilgiler -->
                        <div class="mb-6">
                            <h3 class="text-lg font-medium text-neutral-900 dark:text-white mb-4">Temel Bilgiler</h3>
                            <div class="space-y-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Şablon
                                        Adı *</label>
                                    <input v-model="form.name" type="text" required
                                        class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                                        placeholder="Örn: Hoş Geldin E-postası" />
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">E-mail
                                        Konusu</label>
                                    <input v-model="form.subject" type="text"
                                        class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                                        placeholder="Örn: Hoş Geldiniz!" />
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Şablon
                                        Tipi</label>
                                    <select v-model="form.type"
                                        class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white">
                                        <option value="">Tip Seçin</option>
                                        <option value="welcome"
                                            :disabled="existingTypes.welcome && (!isEdit || existingTypes.welcome.id !== templateData?.id)">
                                            Hoş Geldin {{ existingTypes.welcome && (!isEdit || existingTypes.welcome.id
                                                !== templateData?.id) ? '(Mevcut)' : '' }}
                                        </option>
                                        <option value="order_confirmation"
                                            :disabled="existingTypes.order_confirmation && (!isEdit || existingTypes.order_confirmation.id !== templateData?.id)">
                                            Sipariş Onayı {{ existingTypes.order_confirmation && (!isEdit ||
                                                existingTypes.order_confirmation.id !== templateData?.id) ? '(Mevcut)' : ''
                                            }}
                                        </option>
                                        <option value="shipping"
                                            :disabled="existingTypes.shipping && (!isEdit || existingTypes.shipping.id !== templateData?.id)">
                                            Kargo {{ existingTypes.shipping && (!isEdit || existingTypes.shipping.id !==
                                                templateData?.id) ? '(Mevcut)' : '' }}
                                        </option>
                                        <option value="order_status_change">
                                            Sipariş Durum Değişikliği
                                        </option>
                                        <option value="newsletter">Bülten</option>
                                        <option value="promotion">Promosyon</option>
                                    </select>

                                    <!-- Sipariş Durumu Seçimi -->
                                    <div v-if="form.type === 'order_status_change'" class="mt-4">
                                        <label
                                            class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                            Sipariş Durumu *
                                        </label>
                                        <!-- Sipariş durumları backend'den geliyor: pending, processing, prepared, shipped, in_transit, delivered, cancelled, returned, failed -->
                                        <select v-model="form.order_status"
                                            class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white">
                                            <option value="">Sipariş Durumu Seçin</option>
                                            <option v-for="(statusName, statusCode) in orderStatuses" :key="statusCode"
                                                :value="statusCode"
                                                :disabled="usedOrderStatuses[statusCode] && (!isEdit || !isCurrentTemplateUsingStatus(statusCode))">
                                                {{ statusName }}
                                                <span
                                                    v-if="usedOrderStatuses[statusCode] && (!isEdit || !isCurrentTemplateUsingStatus(statusCode))">
                                                    ({{ usedOrderStatuses[statusCode].template.name }} tarafından
                                                    kullanılıyor)
                                                </span>
                                            </option>
                                        </select>
                                        <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                            Bu şablonun hangi sipariş durumu değişikliğinde kullanılacağını seçin.
                                        </p>
                                    </div>

                                    <!-- Tip Uyarısı -->
                                    <div v-if="showTypeWarning"
                                        class="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                                        <div class="flex">
                                            <ExclamationTriangleIcon
                                                class="h-5 w-5 text-yellow-400 dark:text-yellow-300" />
                                            <div class="ml-3">
                                                <h4 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                                    Uyarı</h4>
                                                <p class="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                                                    "{{ getTypeDisplayName(form.type) }}"
                                                    tipinde {{ isEdit ? 'başka bir şablonda' : 'zaten bir şablon' }}
                                                    mevcut:
                                                    <strong>{{ existingTypes[form.type]?.name }}</strong>
                                                    <br>
                                                    <span class="text-xs">{{ isEdit ? 'Bu tip için başka şablon mevcut.'
                                                        : 'Bu tip için yeni şablon oluşturamazsınız.' }}
                                                        {{ isEdit ? 'Mevcut şablonu değiştirebilirsiniz.' : `Mevcut
                                                        şablonu düzenleyebilirsiniz.` }}</span>
                                                </p>
                                                <div class="mt-2">
                                                    <NuxtLink
                                                        :to="`/management/email/sablon/${existingTypes[form.type]?.id}/duzenle`"
                                                        class="text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200 underline">
                                                        {{ isEdit ? 'O şablonu düzenle' : 'Mevcut şablonu düzenle' }} →
                                                    </NuxtLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Açıklama</label>
                                    <textarea v-model="form.description" rows="3"
                                        class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                                        placeholder="Bu şablonun kullanım amacını açıklayın"></textarea>
                                </div>
                                <div class="flex items-center">
                                    <input v-model="form.is_active" type="checkbox"
                                        class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-neutral-600 rounded dark:bg-neutral-700" />
                                    <label class="ml-2 block text-sm text-neutral-900 dark:text-white">
                                        Şablon aktif
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Dinamik Değişkenler -->
                        <div class="mb-6">
                            <h3 class="text-lg font-medium text-neutral-900 dark:text-white mb-4">Dinamik Değişkenler
                            </h3>
                            <div class="space-y-3">
                                <div v-for="(variables, category) in availableVariables" :key="category">
                                    <h4
                                        class="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2 capitalize">
                                        {{ getCategoryName(category) }}</h4>
                                    <div class="grid grid-cols-1 gap-1">
                                        <button v-for="(label, key) in variables" :key="key" type="button"
                                            @click="insertVariable(`{${key}}`)"
                                            class="text-left px-2 py-1 text-xs bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600 rounded transition-colors text-neutral-900 dark:text-white">
                                            {{ label }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Email Bileşenleri -->
                        <div class="mb-6">
                            <h3 class="text-lg font-medium text-neutral-900 dark:text-white mb-4">Email Bileşenleri</h3>
                            <div class="space-y-2">
                                <button v-for="component in emailComponents" :key="component.type" type="button"
                                    @click="insertComponent(component)"
                                    class="w-full text-left px-3 py-2 text-sm bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 border border-primary-200 dark:border-primary-800 rounded transition-colors text-neutral-900 dark:text-white">
                                    {{ component.label }}
                                </button>
                            </div>
                        </div>

                        <!-- Hazır Şablonlar -->
                        <div>
                            <h3 class="text-lg font-medium text-neutral-900 dark:text-white mb-4">
                                {{ isEdit ? 'Şablon Değiştir' : 'Hazır Şablonlar' }}
                            </h3>
                            <div class="space-y-2">
                                <button v-for="preset in presetTemplates" :key="preset.type" type="button"
                                    @click="loadPresetTemplate(preset)"
                                    class="w-full text-left px-3 py-2 text-sm bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 border border-green-200 dark:border-green-800 rounded transition-colors text-neutral-900 dark:text-white">
                                    {{ preset.name }}
                                </button>
                            </div>
                            <p v-if="isEdit" class="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                                Hazır şablonlardan birini seçerek mevcut içeriği değiştirebilirsiniz.
                            </p>
                        </div>

                        <!-- Save Button in Sidebar for mobile -->
                        <div class="lg:hidden">
                            <button @click="handleSave"
                                :disabled="loading || !form.name || !form.content || isSelectedTypeCriticalAndExists || (form.type === 'order_status_change' && !form.order_status)"
                                class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-neutral-900 disabled:opacity-50">
                                <CheckIcon class="w-5 h-5 mr-2" />
                                {{ loading ? 'Kaydediliyor...' : isSelectedTypeCriticalAndExists ? 'Bu Tip Zaten Mevcut'
                                    :
                                    isEdit ? 'Değişiklikleri Kaydet' : 'Şablonu Kaydet' }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Sağ Kısım - Önizleme, Editör ve Kaydet Butonu -->
                <div class="lg:col-span-2">
                    <div class="space-y-6">
                        <!-- Save Button for Desktop -->
                        <div class="hidden lg:flex justify-end">
                            <button @click="handleSave"
                                :disabled="loading || !form.name || !form.content || isSelectedTypeCriticalAndExists || (form.type === 'order_status_change' && !form.order_status)"
                                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-neutral-900 disabled:opacity-50">
                                <CheckIcon class="w-5 h-5 mr-2" />
                                {{ loading ? 'Kaydediliyor...' : isSelectedTypeCriticalAndExists ? 'Bu Tip Zaten Mevcut'
                                    :
                                    isEdit ? 'Değişiklikleri Kaydet' : 'Şablonu Kaydet' }}
                            </button>
                        </div>

                        <!-- Üst Panel - Canlı Önizleme -->
                        <div
                            class="bg-white dark:bg-neutral-800 shadow rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-lg font-medium text-neutral-900 dark:text-white">Canlı Önizleme</h3>
                                <button @click="openFullPreview"
                                    class="inline-flex items-center px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm text-sm font-medium text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                                    <EyeIcon class="w-4 h-4 mr-2" />
                                    Tam Ekran
                                </button>
                            </div>
                            <div
                                class="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 h-80 overflow-y-auto">
                                <div v-html="renderLivePreview()"></div>
                            </div>
                        </div>

                        <!-- Alt Panel - HTML Editör (Accordion) -->
                        <div
                            class="bg-white dark:bg-neutral-800 shadow rounded-lg border border-neutral-200 dark:border-neutral-700">
                            <!-- Accordion Header -->
                            <div class="p-6 border-b border-neutral-200 dark:border-neutral-700">
                                <button @click="htmlEditorOpen = !htmlEditorOpen"
                                    class="w-full flex items-center justify-between text-left focus:outline-none">
                                    <h3 class="text-lg font-medium text-neutral-900 dark:text-white">E-mail İçeriği
                                        (HTML) *</h3>
                                    <ChevronDownIcon :class="['h-5 w-5 text-neutral-500 dark:text-neutral-400 transition-transform duration-300',
                                        htmlEditorOpen ? 'transform rotate-180' : '']" />
                                </button>
                                <p v-if="!htmlEditorOpen" class="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                    HTML editörünü açmak için tıklayın
                                </p>
                            </div>

                            <!-- Accordion Content -->
                            <div class="overflow-hidden transition-all duration-300 ease-in-out"
                                :class="htmlEditorOpen ? 'h-80' : 'h-0'">
                                <div class="p-6 h-full">
                                    <textarea ref="contentTextarea" v-model="form.content" required
                                        class="w-full h-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 font-mono text-sm resize-none bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                                        placeholder="HTML formatında e-mail içeriğinizi yazın..."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading State (Sadece düzenleme modunda) -->
        <div v-else-if="isEdit && templateLoading" class="max-w-7xl mx-auto">
            <div class="text-center py-12">
                <div
                    class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <ArrowPathIcon class="w-8 h-8 text-primary-600 dark:text-primary-400 animate-spin" />
                </div>
                <p class="text-lg font-medium text-neutral-600 dark:text-neutral-300">Şablon yükleniyor...</p>
            </div>
        </div>

        <!-- Tam Ekran Önizleme Modalı -->
        <div v-if="showFullPreview"
            class="fixed inset-0 bg-neutral-600 dark:bg-neutral-900 bg-opacity-50 dark:bg-opacity-75 overflow-y-auto h-full w-full z-50"
            @click="showFullPreview = false">
            <div class="relative top-4 mx-auto p-5 border w-11/12 max-w-5xl shadow-lg rounded-md bg-white dark:bg-neutral-800 dark:border-neutral-700"
                @click.stop>
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium text-neutral-900 dark:text-white">{{ form.name || (isEdit ? 'Şablon'
                        : 'Yeni Şablon') }}
                        - Tam Ekran Önizleme
                    </h3>
                    <button @click="showFullPreview = false"
                        class="text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300">
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>
                <div class="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg max-h-[80vh] overflow-auto">
                    <iframe :srcdoc="renderLivePreview()" class="w-full h-[70vh] border rounded bg-white"
                        sandbox="allow-same-origin"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    CheckIcon,
    XMarkIcon,
    EyeIcon,
    ChevronRightIcon,
    ExclamationTriangleIcon,
    ChevronDownIcon,
    ArrowPathIcon
} from '@heroicons/vue/24/outline'

// Props
const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false
    },
    templateId: {
        type: String,
        default: null
    },
    hideHeader: {
        type: Boolean,
        default: false
    }
})

// Emits
const emit = defineEmits(['saved', 'template-loaded'])

// Email Template Presets Composable
const {
    emailComponents,
    presetTemplates,
    availableVariables,
    getCategoryName,
    getSampleData
} = useEmailTemplatePresets()

// API Composable
const {
    loading,
    error,
    createTemplate,
    updateTemplate,
    checkExistingTypes,
    getOrderStatuses,
    getUsedOrderStatuses
} = useEmailTemplates()

// Local State
const showFullPreview = ref(false)
const contentTextarea = ref(null)
const htmlEditorOpen = ref(false)
const existingTypes = ref({})
const showTypeWarning = ref(false)
const templateLoading = ref(false)
const templateData = ref(null)
const orderStatuses = ref({})
const usedOrderStatuses = ref({})

// Form Data
const form = ref({
    name: '',
    description: '',
    content: '',
    subject: '',
    type: '',
    is_active: true,
    order_status: ''
})

// Kritik tipler listesi - sipariş durum değişikliği çıkarıldı
const criticalTypes = ['welcome', 'order_confirmation', 'shipping']

// Tip görüntü adlarını döndüren fonksiyon
const getTypeDisplayName = (type) => {
    const names = {
        welcome: 'Hoş Geldin',
        order_confirmation: 'Sipariş Onayı',
        shipping: 'Kargo',
        order_status_change: 'Sipariş Durum Değişikliği',
        newsletter: 'Bülten',
        promotion: 'Promosyon'
    }
    return names[type] || type
}

// Computed - seçilen tip kritik ve mevcut mu?
const isSelectedTypeCriticalAndExists = computed(() => {
    if (!form.value.type || !criticalTypes.includes(form.value.type)) return false

    const existingType = existingTypes.value[form.value.type]
    if (!existingType) return false

    // Düzenleme modunda ise aynı şablon değilse true döndür
    if (props.isEdit) {
        return existingType.id !== templateData.value?.id
    }

    // Oluşturma modunda ise var olan herhangi bir şablon varsa true döndür
    return true
})

// Template yükleme fonksiyonu (düzenleme modunda)
const loadTemplate = async () => {
    if (!props.isEdit || !props.templateId) return

    templateLoading.value = true
    try {
        const response = await useBaseOFetchWithAuth(`email-templates/${props.templateId}`, {
            headers: useRequestHeaders(['cookie'])
        })

        if (response.success) {
            templateData.value = response.data

            // Form'a template verilerini yükle
            form.value.name = templateData.value.name
            form.value.type = templateData.value.type || ''
            form.value.subject = templateData.value.subject || ''
            form.value.description = templateData.value.description || ''
            form.value.content = templateData.value.content
            form.value.is_active = templateData.value.is_active
            form.value.order_status = templateData.value.order_statuses?.[0]?.order_status || ''

            // Template yüklendiğini parent'a bildir
            emit('template-loaded', templateData.value)
        }
    } catch (err) {
        console.error('Şablon yükleme hatası:', err)
        await navigateTo('/management/email/sablonlar')
    } finally {
        templateLoading.value = false
    }
}

// Mounted hook - mevcut tipleri kontrol et
onMounted(async () => {
    try {
        // Paralel olarak çalıştır
        await Promise.all([
            checkExistingTypes().then(result => { existingTypes.value = result }),
            getOrderStatuses().then(result => { orderStatuses.value = result }),
            getUsedOrderStatuses().then(result => { usedOrderStatuses.value = result }),
            loadTemplate()
        ])
    } catch (err) {
        console.error('Başlangıç verileri yüklenirken hata:', err)
    }
})

// Watch - tip değiştiğinde uyarı göster
watch(() => form.value.type, (newType) => {
    if (!newType) {
        showTypeWarning.value = false
        return
    }

    if (criticalTypes.includes(newType) && existingTypes.value[newType]) {
        // Düzenleme modunda aynı şablon değilse uyarı göster
        if (props.isEdit) {
            showTypeWarning.value = existingTypes.value[newType].id !== templateData.value?.id
        } else {
            // Oluşturma modunda her zaman uyarı göster
            showTypeWarning.value = true
        }
    } else {
        showTypeWarning.value = false
    }
})

// Methods
const handleSave = async () => {
    try {
        // Form verisini hazırla
        const formData = { ...form.value }

        // Sipariş durum değişikliği tipindeyse order_status'u order_statuses array'ine çevir
        if (formData.type === 'order_status_change' && formData.order_status) {
            formData.order_statuses = [formData.order_status]
            delete formData.order_status
        }

        if (props.isEdit) {
            await updateTemplate(props.templateId, formData)
        } else {
            await createTemplate(formData)
        }

        emit('saved')
        await navigateTo('/management/email/sablonlar')
    } catch (err) {
        console.error('Şablon kaydetme hatası:', err)
    }
}

const insertVariable = (variable) => {
    if (contentTextarea.value) {
        const start = contentTextarea.value.selectionStart
        const end = contentTextarea.value.selectionEnd
        const text = form.value.content
        form.value.content = text.substring(0, start) + variable + text.substring(end)

        nextTick(() => {
            contentTextarea.value.focus()
            contentTextarea.value.setSelectionRange(start + variable.length, start + variable.length)
        })
    } else {
        form.value.content += variable
    }
}

const insertComponent = (component) => {
    form.value.content += '\n\n' + component.template + '\n\n'
}

const loadPresetTemplate = (preset) => {
    form.value.content = preset.content
    if (!form.value.name) {
        form.value.name = preset.name
    }
    if (!form.value.subject) {
        form.value.subject = preset.subject
    }
}

const renderLivePreview = () => {
    if (!form.value.content) return '<p class="text-gray-500 text-sm">İçerik henüz yok...</p>'

    // Composable'dan örnek veriyi al
    const sampleData = getSampleData()

    let rendered = form.value.content
    Object.entries(sampleData).forEach(([key, value]) => {
        rendered = rendered.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), value)
    })

    return rendered
}

const openFullPreview = () => {
    showFullPreview.value = true
}

// Helper metodları
const isCurrentTemplateUsingStatus = (statusCode) => {
    return templateData.value?.order_statuses?.some(os => os.order_status === statusCode)
}
</script>