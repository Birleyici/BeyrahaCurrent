<template>
    <nav class="flex items-center space-x-1 text-sm my-2 md:my-6" aria-label="Breadcrumb">
        <!-- Mobil: Sadece geri butonu ve mevcut sayfa -->
        <div class="md:hidden flex items-center space-x-3">
            <UButton v-if="links.length > 1" @click="goBack" icon="i-heroicons-arrow-left" color="gray" variant="ghost"
                size="sm" class="p-2" />
            <span class="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                {{ currentPage }}
            </span>
        </div>

        <!-- Desktop: Tam breadcrumb -->
        <div class="hidden md:flex items-center space-x-1">
            <template v-for="(link, index) in links" :key="index">
                <!-- Ana Sayfa İkonu -->
                <UIcon v-if="index === 0" name="i-heroicons-home"
                    class="w-4 h-4 text-neutral-500 dark:text-neutral-400" />

                <!-- Link veya Metin -->
                <NuxtLink v-if="link.to && index < links.length - 1" :to="link.to"
                    class="text-neutral-600 dark:text-neutral-400 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors duration-200 font-medium">
                    {{ link.label }}
                </NuxtLink>
                <span v-else class="font-medium"
                    :class="index === links.length - 1 ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-600 dark:text-neutral-400'">
                    {{ link.label }}
                </span>

                <!-- Ayırıcı -->
                <UIcon v-if="index < links.length - 1" name="i-heroicons-chevron-right"
                    class="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            </template>
        </div>
    </nav>
</template>

<script setup>
const props = defineProps({
    links: {
        type: Array,
        required: true,
        default: () => []
    }
})

const router = useRouter()

const currentPage = computed(() => {
    return props.links[props.links.length - 1]?.label || ''
})

const goBack = () => {
    if (props.links.length > 1) {
        const previousLink = props.links[props.links.length - 2]
        if (previousLink.to) {
            router.push(previousLink.to)
        } else {
            router.back()
        }
    } else {
        router.back()
    }
}
</script>