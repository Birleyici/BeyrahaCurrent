<template>
    <div class="bg-neutral-50 dark:bg-neutral-900 min-h-screen transition-colors duration-300">
        <!-- Breadcrumb - Tam genişlik -->
        <div>
            <UiCommonBreadcrumb :links="breadcrumbLinks" />
        </div>

        <!-- Ana layout -->
        <div class="container px-4 lg:px-8 mt-3">
            <div class="lg:grid lg:grid-cols-4 gap-6 lg:gap-8">
                <!-- Sol Menü - Mobilde gizli -->
                <div class="hidden lg:block lg:col-span-1">
                    <PartialsAccountMenu />
                </div>

                <!-- Ana İçerik Alanı -->
                <div class="lg:col-span-3 lg:mt-0">
                    <slot />

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()

// Route'dan breadcrumb otomatik generate et
const breadcrumbLinks = computed(() => {
    const links = [
        {
            label: 'Ana Sayfa',
            to: '/'
        },
        {
            label: 'Hesabım',
            to: '/hesap'
        }
    ]

    // Route'a göre ek linkler ekle
    const path = route.path

    if (path.includes('/adreslerim')) {
        links.push({ label: 'Adreslerim' })
    } else if (path.includes('/siparislerim')) {
        links.push({ label: 'Siparişlerim' })
    } else if (path.includes('/ayarlar')) {
        links.push({ label: 'Ayarlar' })
    } else if (path.includes('/sorularim')) {
        links.push({
            label: 'Sorularım',
            to: '/hesap/sorularim'
        })

        // Soru detay sayfası ise
        if (path.match(/\/sorularim\/\d+/)) {
            links.push({ label: 'Soru Detayı' })
        }
    }

    return links
})
</script>