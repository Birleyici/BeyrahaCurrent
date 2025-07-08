<template>
    <div class="space-y-6">
        <!-- Error State -->
        <UAlert v-if="error" color="red" variant="solid" :title="error" />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Sol Panel - Form ve Araçlar -->
            <div class="lg:col-span-1">
                <div
                    class="bg-white dark:bg-neutral-800 shadow rounded-lg border border-neutral-200 dark:border-neutral-700 sticky top-6">

                    <!-- Temel Bilgiler Akordiyonu -->
                    <UAccordion :items="accordionItems" :default-open="0" :ui="{
                        wrapper: 'divide-y divide-neutral-200 dark:divide-neutral-700',
                        item: {
                            base: '',
                            size: 'text-sm',
                            color: 'text-neutral-500 dark:text-neutral-400',
                            padding: 'px-4 py-3',
                            icon: 'ms-auto transform transition-transform duration-200'
                        }
                    }">
                        <!-- Temel Bilgiler -->
                        <template #temel-bilgiler>
                            <div class="space-y-4 p-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Şablon Adı *
                                    </label>
                                    <UInput v-model="form.name" placeholder="Şablon adını girin" />
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        E-mail Konusu
                                    </label>
                                    <UInput v-model="form.subject" placeholder="E-mail konusunu girin" />
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Şablon Tipi *
                                    </label>
                                    <USelect v-model="form.type" :options="templateTypeOptions" placeholder="Tip seçin">
                                        <template #option="{ option }">
                                            <div>
                                                <div class="font-medium">{{ option.label }}</div>
                                                <div class="text-xs text-neutral-500">{{ option.description }}</div>
                                            </div>
                                        </template>
                                    </USelect>
                                </div>

                                <!-- Sipariş Durumu Seçimi (order-status-change tipi için) -->
                                <div v-if="form.type === 'order-status-change'" class="space-y-4">
                                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        Sipariş Durumu *
                                    </label>
                                    <USelect v-model="selectedOrderStatus" :options="orderStatusOptions"
                                        placeholder="Sipariş durumu seçin" value-attribute="value"
                                        option-attribute="label">
                                        <template #option="{ option }">
                                            <div class="flex items-center justify-between w-full">
                                                <span
                                                    :class="option.disabled ? 'text-neutral-400 dark:text-neutral-500' : 'text-neutral-700 dark:text-neutral-300'">
                                                    {{ option.label }}
                                                </span>
                                                <span v-if="option.disabled" class="text-xs text-red-500">
                                                    (Kullanılıyor)
                                                </span>
                                            </div>
                                        </template>
                                    </USelect>

                                    <!-- Durum çakışma uyarısı -->
                                    <UAlert v-if="hasStatusConflict" color="amber" variant="soft" title="Uyarı"
                                        description="Bu sipariş durumu başka bir şablonda kullanılıyor." />
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Açıklama
                                    </label>
                                    <UTextarea v-model="form.description" :rows="3"
                                        placeholder="Şablon açıklamasını girin" />
                                </div>
                                <div class="flex items-center space-x-2">
                                    <UCheckbox v-model="form.is_active" />
                                    <label class="text-sm text-neutral-900 dark:text-white cursor-pointer">
                                        Şablon aktif
                                    </label>
                                </div>
                            </div>
                        </template>

                        <!-- Blade Değişkenleri -->
                        <template #blade-degiskenleri>
                            <div class="p-4 space-y-3 max-h-80 overflow-y-auto">
                                <div v-for="(variables, category) in bladeVariables" :key="category" class="space-y-2">
                                    <h4
                                        class="font-medium text-sm text-neutral-700 dark:text-neutral-300 sticky top-0 bg-white dark:bg-neutral-800 py-1">
                                        {{ getCategoryName(category) }}
                                    </h4>
                                    <div class="space-y-1">
                                        <button v-for="(description, variableName) in variables" :key="variableName"
                                            @click="insertVariable(variableName)"
                                            class="w-full text-left px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
                                            :title="description">
                                            <div class="font-mono text-secondary-600 dark:text-secondary-400">
                                                {{ formatBladeVariable(variableName) }}
                                            </div>
                                            <div class="text-neutral-500 dark:text-neutral-400 text-xs mt-1">
                                                {{ description }}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <!-- Blade Direktifleri -->
                        <template #blade-direktifleri>
                            <div class="p-4 space-y-2 max-h-60 overflow-y-auto">
                                <button v-for="directive in bladeDirectives" :key="directive.name"
                                    @click="insertText(directive.example)"
                                    class="w-full text-left px-2 py-2 text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
                                    :title="directive.description">
                                    <div class="font-medium text-neutral-900 dark:text-white">{{ directive.name }}</div>
                                    <div class="text-neutral-500 dark:text-neutral-400 text-xs">{{ directive.description
                                        }}
                                    </div>
                                </button>
                            </div>
                        </template>

                        <!-- Hazır Şablonlar -->
                        <template #hazir-sablonlar>
                            <div class="p-4 space-y-2">
                                <button v-for="preset in presetTemplates" :key="preset.type"
                                    @click="loadPresetTemplate(preset)"
                                    class="w-full text-left px-3 py-2 text-sm bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 border border-green-200 dark:border-green-800 rounded transition-colors text-neutral-900 dark:text-white">
                                    {{ preset.name }}
                                </button>
                            </div>
                        </template>
                    </UAccordion>

                    <!-- Save Button for mobile -->
                    <div class="lg:hidden p-4 border-t border-neutral-200 dark:border-neutral-700">
                        <UButton @click="handleSave" :disabled="!canSave" :loading="loading" color="primary" size="lg"
                            block>
                            {{ loading ? 'Kaydediliyor...' : (isEdit ? 'Değişiklikleri Kaydet' : 'Şablonu Kaydet') }}
                        </UButton>
                    </div>
                </div>
            </div>

            <!-- Sağ Panel - Editör ve Önizleme -->
            <div class="lg:col-span-2">
                <div class="space-y-6">
                    <!-- Save Button for Desktop -->
                    <div class="hidden lg:flex justify-end">
                        <UButton @click="handleSave" :disabled="!canSave" :loading="loading" color="primary" size="lg">
                            {{ loading ? 'Kaydediliyor...' : (isEdit ? 'Değişiklikleri Kaydet' : 'Şablonu Kaydet') }}
                        </UButton>
                    </div>

                    <!-- Canlı Önizleme -->
                    <UCard>
                        <template #header>
                            <div class="flex justify-between items-center">
                                <h3 class="text-lg font-medium text-neutral-900 dark:text-white">Canlı Önizleme</h3>
                                <UButton @click="openFullPreview" size="sm" color="gray" variant="outline">
                                    <UIcon name="i-heroicons-arrows-pointing-out" class="w-4 h-4 mr-2" />
                                    Tam Ekran
                                </UButton>
                            </div>
                        </template>

                        <div
                            class="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 h-80 overflow-y-auto">
                            <div v-html="livePreviewContent"></div>
                        </div>
                    </UCard>

                    <!-- HTML Editör -->
                    <UCard>
                        <template #header>
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-lg font-medium text-neutral-900 dark:text-white">Blade Template
                                        İçeriği *</h3>
                                    <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                                        Laravel Blade syntax kullanarak email şablonunuzu oluşturun
                                    </p>
                                </div>
                                <UBadge v-if="form.type" color="blue" size="sm">{{ form.type }}.blade.php</UBadge>
                            </div>
                        </template>

                        <div class="space-y-4">
                            <!-- Toolbar -->
                            <div class="flex items-center gap-2 p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                                <UButton size="xs" color="gray" variant="ghost" @click="insertText('{{ $')">
                                    <UIcon name="i-heroicons-variable" class="w-3 h-3 mr-1" />
                                    Değişken
                                </UButton>
                                <UButton size="xs" color="gray" variant="ghost"
                                    @click="insertText('@foreach($siparis_urunler as $urun)')">
                                    <UIcon name="i-heroicons-arrow-path" class="w-3 h-3 mr-1" />
                                    Foreach
                                </UButton>
                                <UButton size="xs" color="gray" variant="ghost" @click="insertText('@if(')">
                                    <UIcon name="i-heroicons-question-mark-circle" class="w-3 h-3 mr-1" />
                                    If Koşulu
                                </UButton>
                                <UButton size="xs" color="gray" variant="ghost" @click="formatTemplate">
                                    <UIcon name="i-heroicons-code-bracket" class="w-3 h-3 mr-1" />
                                    Formatla
                                </UButton>
                            </div>

                            <!-- Code Editor -->
                            <UTextarea ref="templateEditor" v-model="form.content" :rows="20"
                                placeholder="Laravel Blade template içeriğini buraya yazın..."
                                class="font-mono text-sm" />

                            <!-- Template Stats -->
                            <div
                                class="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                                <div class="flex items-center gap-4">
                                    <span>{{ lineCount }} satır</span>
                                    <span>{{ form.content?.length || 0 }} karakter</span>
                                </div>
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>
        </div>

        <!-- Tam Ekran Önizleme Modal -->
        <UModal v-model="showFullPreview" :ui="{ width: 'max-w-6xl' }">
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
                            {{ form.name || 'Yeni Şablon' }} - Tam Ekran Önizleme
                        </h3>
                        <UButton icon="i-heroicons-x-mark" size="sm" color="gray" variant="ghost"
                            @click="showFullPreview = false" />
                    </div>
                </template>

                <div class="space-y-4">
                    <div class="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                        <iframe :srcdoc="livePreviewContent" class="w-full h-[80vh] border rounded bg-white"
                            sandbox="allow-same-origin"></iframe>
                    </div>
                </div>
            </UCard>
        </UModal>
    </div>
</template>

<script setup>
// Props
const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false
    },
    templateData: {
        type: Object,
        default: () => ({})
    }
})

// Emits
const emit = defineEmits(['saved'])

// Blade Templates Composable
const {
    loading,
    error,
    api,
    getBladeVariables,
    getBladeDirectives,
    getTemplateTypes,
    formatBladeVariable,
    getCategoryName
} = useBladeTemplates()

// Debounce for preview updates
const { debounce } = useDebounce()

// Local State
const templateEditor = ref(null)
const showFullPreview = ref(false)
const orderStatuses = ref({})
const usedOrderStatuses = ref({})
const selectedOrderStatus = ref(null)
const livePreviewContent = ref('<p style="color: #666; font-style: italic;">İçerik henüz yok...</p>')

// Form Data
const form = ref({
    name: '',
    subject: '',
    description: '',
    content: '',
    type: '',
    is_active: true
})

// Template types
const templateTypes = getTemplateTypes()
const templateTypeOptions = computed(() => {
    return templateTypes.map(type => ({
        value: type.type,
        label: type.name,
        description: type.description
    }))
})

// Order status options
const orderStatusOptions = computed(() => {
    return Object.entries(orderStatuses.value).map(([statusCode, statusName]) => ({
        value: statusCode,
        label: statusName,
        disabled: isStatusUsedByOtherTemplate(statusCode)
    }))
})

// Blade variables and directives
const bladeVariables = ref({})
const bladeDirectives = getBladeDirectives()

// Backend'den değişkenleri yükle
const loadBladeVariables = async () => {
    try {
        const response = await api.getBladeVariables()
        if (response.success) {
            bladeVariables.value = response.variables
        } else {
            // Fallback: Eğer backend'den alınamazsa local değişkenleri kullan
            bladeVariables.value = getBladeVariables()
        }
    } catch (err) {
        console.error('Blade değişkenleri yüklenirken hata:', err)
        // Fallback: Hata durumunda local değişkenleri kullan
        bladeVariables.value = getBladeVariables()
    }
}

// Accordion items configuration
const accordionItems = computed(() => [
    {
        label: 'Temel Bilgiler',
        icon: 'i-heroicons-document-text',
        slot: 'temel-bilgiler',
        defaultOpen: true, // Temel bilgiler varsayılan olarak açık
        content: 'Şablon adı, tipi ve temel ayarlar'
    },
    {
        label: 'Blade Değişkenleri',
        icon: 'i-heroicons-variable',
        slot: 'blade-degiskenleri',
        defaultOpen: false,
        content: 'Email şablonunda kullanabileceğiniz değişkenler'
    },
    {
        label: 'Blade Direktifleri',
        icon: 'i-heroicons-code-bracket',
        slot: 'blade-direktifleri',
        defaultOpen: false,
        content: 'Koşullu ifadeler ve döngüler'
    },
    {
        label: 'Hazır Şablonlar',
        icon: 'i-heroicons-document-duplicate',
        slot: 'hazir-sablonlar',
        defaultOpen: false,
        content: 'Hızlı başlangıç için hazır şablonlar'
    }
])

// Preset templates
const presetTemplates = [
    {
        type: 'order-confirmation',
        name: 'Sipariş Onayı Şablonu',
        content: `<!-- Basit sipariş onayı şablonu -->
<h1>Siparişiniz Alındı!</h1>
<p>Merhaba {{ $musteri_ad_soyad }},</p>
<p>Sipariş No: {{ $siparis_numara }}</p>
<p>Toplam: {{ $siparis_toplam }}₺</p>`
    },
    {
        type: 'shipping-notification',
        name: 'Kargo Bildirimi Şablonu',
        content: `<!-- Basit kargo bildirimi şablonu -->
<h1>Siparişiniz Kargoya Verildi!</h1>
<p>Merhaba {{ $musteri_ad_soyad }},</p>
<p>Sipariş No: {{ $siparis_numara }}</p>
<p>Takip Kodu: {{ $kargo_takip }}</p>`
    },
    {
        type: 'welcome',
        name: 'Hoş Geldin Şablonu',
        content: `<!-- Basit hoş geldin şablonu -->
<h1>Hoş Geldiniz!</h1>
<p>Merhaba {{ $musteri_ad_soyad }},</p>
<p>{{ $site_ad }} ailesine katıldığınız için teşekkürler!</p>`
    }
]

// Computed
const lineCount = computed(() => {
    return form.value.content?.split('\n').length || 1
})

const canSave = computed(() => {
    const basic = form.value.name && form.value.content && form.value.type
    if (form.value.type === 'order-status-change') {
        return basic && selectedOrderStatus.value
    }
    return basic
})

const hasStatusConflict = computed(() => {
    if (form.value.type !== 'order-status-change') return false
    return usedOrderStatuses.value[selectedOrderStatus.value] &&
        (!props.isEdit || usedOrderStatuses.value[selectedOrderStatus.value].template.id !== props.templateData?.id)
})

// Lifecycle
onMounted(async () => {
    if (props.isEdit && props.templateData) {
        // Edit modunda template verilerini yükle
        Object.assign(form.value, props.templateData)
        selectedOrderStatus.value = props.templateData.order_status
    }

    // Backend'den değişkenleri yükle
    await loadBladeVariables()

    // Sipariş durumlarını yükle
    try {
        const [statusesResponse, usedStatusesResponse] = await Promise.all([
            api.getOrderStatuses(),
            api.getUsedOrderStatuses()
        ])

        if (statusesResponse.success) {
            orderStatuses.value = statusesResponse.order_statuses
        }

        if (usedStatusesResponse.success) {
            usedOrderStatuses.value = usedStatusesResponse.used_statuses
        }
    } catch (err) {
        console.error('Sipariş durumları yüklenirken hata:', err)
    }
})

// Methods
const handleSave = async () => {
    try {
        const formData = { ...form.value }

        // Sipariş durum değişikliği tipindeyse order_status'u ekle
        if (formData.type === 'order-status-change') {
            formData.order_status = selectedOrderStatus.value
        }

        console.log('Gönderilen Form Data:', formData)

        let response
        if (props.isEdit) {
            response = await api.update(props.templateData.id, formData)
        } else {
            response = await api.create(formData)
        }

        console.log('API Response:', response)

        if (response.success) {
            emit('saved', response.template)

            if (!props.isEdit) {
                // Yeni oluşturma ise düzenleme sayfasına yönlendir
                await navigateTo(`/management/email/blade-sablon/${response.template.type}/duzenle`)
            }
        }
    } catch (err) {
        console.error('Şablon kaydetme hatası:', err)
    }
}

const insertVariable = (variableName) => {
    const variable = formatBladeVariable(variableName)
    insertText(variable)
}

const insertText = (text) => {
    if (templateEditor.value) {
        const textarea = templateEditor.value.$el.querySelector('textarea')
        if (textarea) {
            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const currentText = form.value.content || ''

            form.value.content = currentText.substring(0, start) + text + currentText.substring(end)

            nextTick(() => {
                textarea.focus()
                textarea.setSelectionRange(start + text.length, start + text.length)
            })
        }
    } else {
        form.value.content = (form.value.content || '') + text
    }
}

const loadPresetTemplate = (preset) => {
    form.value.content = preset.content
    if (!form.value.name) {
        form.value.name = preset.name
    }
    if (!form.value.type) {
        form.value.type = preset.type
    }
}

const formatTemplate = () => {
    // Basit template formatlama
    if (form.value.content) {
        form.value.content = form.value.content
            .replace(/>\s*</g, '>\n<')
            .replace(/^\s+|\s+$/gm, '')
    }
}

const renderLivePreview = async () => {
    if (!form.value.content) {
        return '<p style="color: #666; font-style: italic;">İçerik henüz yok...</p>'
    }

    // Backend'den gerçek preview al (sadece content varsa)
    if (form.value.type && form.value.content) {
        try {
            const response = await api.preview(form.value.type, { content: form.value.content })
            if (response.success && response.html) {
                return response.html
            }
        } catch (err) {
            console.warn('Backend preview kullanılamıyor, fallback preview kullanılıyor:', err)
        }
    }

    // Fallback: Frontend'de basit preview
    let preview = form.value.content

    // Backend ile %100 senkronize edilmiş sample data
    const sampleData = {
        // Site bilgileri
        'site_ad': 'Beyraha',
        'site_adi': 'Beyraha',
        'site_url': 'https://beyraha.com',
        'site_email': 'info@beyraha.com',
        'site_telefon': '+90 212 555 00 00',
        'site_adres': 'Beyraha Merkez, İstanbul',
        'firma_adi': 'Beyraha',
        'sirket_adi': 'Beyraha',
        'logo_url': '/images/logo.png',
        'logo': '/images/logo.png',

        // Kullanıcı bilgileri
        'kullanici_adi': 'Ahmet Yılmaz',
        'kullanici_email': 'ahmet@example.com',
        'kullanici_telefon': '+90 555 123 45 67',
        'kullanici_ad': 'Ahmet',
        'kullanici_soyad': 'Yılmaz',
        'musteri_adi': 'Ahmet Yılmaz',
        'musteri_email': 'ahmet@example.com',
        'musteri_ad': 'Ahmet',
        'musteri_soyad': 'Yılmaz',
        'musteri_ad_soyad': 'Ahmet Yılmaz',
        'ad_soyad': 'Ahmet Yılmaz',
        'tam_ad': 'Ahmet Yılmaz',
        'isim': 'Ahmet Yılmaz',
        'ad': 'Ahmet',
        'soyad': 'Yılmaz',
        'telefon': '+90 555 123 45 67',
        'email': 'ahmet@example.com',
        'eposta': 'ahmet@example.com',

        // Sipariş bilgileri
        'siparis_no': '#2024001',
        'siparis_numara': '#2024001',
        'siparis_numarasi': '#2024001',
        'order_number': '#2024001',
        'siparis_id': 'ORD-2024-001',
        'siparis_kodu': 'ORD-2024-001',
        'siparis_tutari': 299.99,
        'siparis_toplami': 299.99,
        'siparis_tarihi': new Date().toLocaleDateString('tr-TR') + ' ' + new Date().toLocaleTimeString('tr-TR'),
        'siparis_saati': new Date().toLocaleTimeString('tr-TR'),
        'siparis_gun': new Date().toLocaleDateString('tr-TR'),
        'siparis_durumu': 'Onaylandı',
        'durum': 'Onaylandı',
        'status': 'confirmed',
        'teslimat_tarihi': new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR'),
        'teslimat_gun': new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR'),
        'toplam_tutar': 299.99,
        'toplam': 299.99,
        'tutar': 299.99,
        'fiyat': 299.99,
        'para_birimi': 'TL',
        'currency': 'TL',
        'adet': 3,
        'miktar': 3,
        'quantity': 3,

        // Kargo bilgileri  
        'kargo_takip_no': 'TRK123456789',
        'takip_no': 'TRK123456789',
        'takip_numarasi': 'TRK123456789',
        'kargo_no': 'TRK123456789',
        'kargo_takip': 'TRK123456789',
        'kargo_takip_url': 'https://www.araskargo.com.tr/takip/TRK123456789',
        'kargo_firma': 'Aras Kargo',
        'kargo_firmasi': 'Aras Kargo',
        'kargo_sirket': 'Aras Kargo',
        'kargo_adi': 'Aras Kargo',
        'carrier': 'Aras Kargo',

        // Tarih/Zaman
        'tarih': new Date().toLocaleDateString('tr-TR'),
        'saat': new Date().toLocaleTimeString('tr-TR'),
        'bugun': new Date().toLocaleDateString('tr-TR'),
        'simdi': new Date().toLocaleDateString('tr-TR') + ' ' + new Date().toLocaleTimeString('tr-TR'),
        'zaman': new Date().toLocaleTimeString('tr-TR'),
        'gun': new Date().getDate(),
        'ay': new Date().getMonth() + 1,
        'yil': new Date().getFullYear(),

        // Genel ifadeler
        'hosgeldin': 'Hoş geldiniz',
        'tesekkurler': 'Teşekkürler',
        'saygilar': 'Saygılarımızla',
        'iyi_gunler': 'İyi günler',
        'baslik': 'Örnek İçerik Başlığı',
        'mesaj': 'Bu bir örnek mesajdır.',
        'icerik': 'Bu bir örnek içeriktir.',

        // Backend default case'den ek değişkenler
        'content_title': 'Örnek İçerik Başlığı',
        'content_message': 'Bu bir örnek mesajdır.',
        'action_url': '/',
        'action_text': 'Siteyi Ziyaret Et',
        'link': '/',
        'url': '/',
        'buton_metni': 'Siteyi Ziyaret Et',
        'footer_text': 'Bu e-posta otomatik olarak gönderilmiştir.',
        'copyright': '© ' + new Date().getFullYear() + ' Beyraha. Tüm hakları saklıdır.',
        'destek_email': 'destek@beyraha.com',
        'iletisim_telefon': '+90 212 555 00 00',
        'web_sitesi': 'https://beyraha.com',
        'ana_sayfa': 'https://beyraha.com',
        'iletisim_email': 'info@beyraha.com',
        'adres': 'Beyraha Merkez, İstanbul',
        'sehir': 'İstanbul',
        'ulke': 'Türkiye'
    }

    // Blade değişkenlerini değiştir
    Object.entries(sampleData).forEach(([key, value]) => {
        const regex = new RegExp(`{{\\s*\\$${key}\\s*}}`, 'g')
        preview = preview.replace(regex, value)
    })

    // Basit Blade direktiflerini işle
    preview = preview.replace(/@if\s*\([^)]+\)/g, '')
    preview = preview.replace(/@endif/g, '')
    preview = preview.replace(/@foreach\s*\([^)]+\)/g, '')
    preview = preview.replace(/@endforeach/g, '')
    preview = preview.replace(/@isset\s*\([^)]+\)/g, '')
    preview = preview.replace(/@endisset/g, '')

    return preview
}

// Debounced preview update
const updatePreview = debounce(async () => {
    livePreviewContent.value = await renderLivePreview()
}, 500)

const openFullPreview = () => {
    showFullPreview.value = true
}

const isStatusUsedByOtherTemplate = (statusCode) => {
    return usedOrderStatuses.value[statusCode] &&
        (!props.isEdit || usedOrderStatuses.value[statusCode].template.id !== props.templateData?.id)
}

// Watchers for live preview
watch(() => form.value.content, () => {
    updatePreview()
}, { immediate: true })

watch(() => form.value.type, () => {
    updatePreview()
})
</script>