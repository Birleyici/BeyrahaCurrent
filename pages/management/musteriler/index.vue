<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <AdminCommonPageHeader title="Müşteri Yönetimi" description="Kayıtlı müşterileri görüntüleyin ve yönetin"
            :breadcrumb-links="breadcrumbLinks">
            <template #actions>
                <UButton @click="getUsers" :loading="loading" color="gray" variant="outline"
                    icon="i-heroicons-arrow-path">
                    Yenile
                </UButton>
            </template>
        </AdminCommonPageHeader>

        <!-- İstatistikler -->
        <div v-if="userStats" class="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Toplam Müşteri
                        </p>
                        <p class="text-xl sm:text-3xl font-bold text-neutral-900 dark:text-white mt-1 sm:mt-2">{{
                            userStats.total_users }}</p>
                    </div>
                    <div class="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                        <UIcon name="i-heroicons-users"
                            class="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Bugün Aktif</p>
                        <p class="text-xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mt-1 sm:mt-2">{{
                            userStats.active_today }}</p>
                    </div>
                    <div class="p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                        <UIcon name="i-heroicons-clock"
                            class="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Bu Hafta</p>
                        <p class="text-xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-1 sm:mt-2">{{
                            userStats.active_week }}</p>
                    </div>
                    <div class="p-2 sm:p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-full">
                        <UIcon name="i-heroicons-calendar-days"
                            class="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Bu Ay</p>
                        <p class="text-xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1 sm:mt-2">{{
                            userStats.active_month }}</p>
                    </div>
                    <div class="p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                        <UIcon name="i-heroicons-calendar"
                            class="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Sepetli Müşteri
                        </p>
                        <p class="text-xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mt-1 sm:mt-2">{{
                            userStats.users_with_cart }}</p>
                    </div>
                    <div class="p-2 sm:p-3 bg-orange-50 dark:bg-orange-900/20 rounded-full">
                        <UIcon name="i-heroicons-shopping-cart"
                            class="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Filtreler -->
        <div
            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Arama -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Arama</label>
                    <UInput v-model="filters.search" placeholder="İsim, email veya nickname ara..."
                        icon="i-heroicons-magnifying-glass" @input="debouncedSearch" />
                </div>

                <!-- Rol Filtresi -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Rol</label>
                    <USelectMenu v-model="filters.role" :options="roleOptions" option-attribute="label"
                        value-attribute="value" placeholder="Tüm roller" @change="getUsers" />
                </div>

                <!-- Aktivite Filtresi -->
                <div>
                    <label
                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Aktivite</label>
                    <USelectMenu v-model="filters.activity_filter" :options="activityOptions" option-attribute="label"
                        value-attribute="value" placeholder="Tüm kullanıcılar" @change="getUsers" />
                </div>

                <!-- Sıralama -->
                <div>
                    <label
                        class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Sıralama</label>
                    <USelectMenu v-model="filters.sort_by" :options="sortOptions" option-attribute="label"
                        value-attribute="value" @change="getUsers" />
                </div>
            </div>

            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
                <div class="text-sm text-neutral-600 dark:text-neutral-400">
                    {{ users?.total || 0 }} müşteri bulundu
                </div>
                <UButton @click="resetFilters" variant="outline" color="gray" size="sm" class="w-full sm:w-auto">
                    Filtreleri Temizle
                </UButton>
            </div>
        </div>

        <!-- Masaüstü Görünüm - Tablo -->
        <div class="hidden lg:block">
            <div
                class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <!-- Tablo Başlığı -->
                <div
                    class="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <UIcon name="i-heroicons-users" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Müşteri Listesi</h3>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="loading" class="p-8 text-center">
                    <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-500 mx-auto mb-4" />
                    <p class="text-neutral-600 dark:text-neutral-400">Müşteriler yükleniyor...</p>
                </div>

                <!-- Kullanıcı Tablosu -->
                <div v-else-if="users?.data?.length > 0" class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-neutral-50 dark:bg-neutral-700">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                    Müşteri
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                    Rol
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                    Kayıt Tarihi
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                    Son Aktivite
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                    Sepet
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-neutral-200 dark:divide-neutral-600">
                            <tr v-for="user in users.data" :key="user.id"
                                class="hover:bg-neutral-50 dark:hover:bg-neutral-700">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <UAvatar :alt="user.name" size="sm" class="flex-shrink-0" />
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                                {{ user.name }}
                                            </div>
                                            <div class="text-sm text-neutral-500 dark:text-neutral-400">
                                                {{ user.email }}
                                            </div>
                                            <div v-if="user.nickname"
                                                class="text-xs text-neutral-400 dark:text-neutral-500">
                                                @{{ user.nickname }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <UBadge :color="getRoleColor(user.role)" :label="getRoleLabel(user.role)"
                                        size="sm" />
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                                    <div v-if="user.created_at">
                                        {{ formatDate(user.created_at) }}
                                    </div>
                                    <div v-else class="text-neutral-400 dark:text-neutral-500">
                                        Kayıt tarihi bulunamadı
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                                    <div v-if="user.last_activity">
                                        {{ formatDate(user.last_activity) }}
                                    </div>
                                    <div v-else class="text-neutral-400 dark:text-neutral-500">
                                        Hiç giriş yapmamış
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div v-if="user.cart_items_count > 0" class="flex items-center">
                                        <UIcon name="i-heroicons-shopping-cart" class="w-4 h-4 text-orange-500 mr-2" />
                                        <span class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                            {{ user.cart_items_count }} ürün
                                        </span>
                                    </div>
                                    <div v-else class="text-sm text-neutral-400 dark:text-neutral-500">
                                        Boş sepet
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div class="flex items-center space-x-2">
                                        <UButton size="xs" color="gray" variant="ghost" icon="i-heroicons-eye"
                                            @click="viewUser(user)">
                                            Görüntüle
                                        </UButton>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Boş State -->
                <div v-else class="p-8 text-center">
                    <UIcon name="i-heroicons-users"
                        class="w-12 h-12 text-neutral-400 dark:text-neutral-500 mx-auto mb-4" />
                    <h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                        Müşteri bulunamadı
                    </h3>
                    <p class="text-neutral-600 dark:text-neutral-400">
                        Arama kriterlerinizi değiştirerek tekrar deneyin.
                    </p>
                </div>

                <!-- Desktop Pagination -->
                <div v-if="users?.last_page > 1"
                    class="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
                    <div class="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                        <div class="text-sm text-neutral-600 dark:text-neutral-400 text-center sm:text-left">
                            {{ users.from }}-{{ users.to }} / {{ users.total }} müşteri
                        </div>
                        <UPagination v-model="currentPage" :page-count="users.last_page" :total="users.total" :max="5"
                            :ui="{
                                wrapper: 'flex items-center gap-1',
                                rounded: '!rounded-md',
                                default: {
                                    size: 'sm'
                                }
                            }" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobil Görünüm - Kart Listesi -->
        <div class="lg:hidden space-y-4">
            <!-- Loading State -->
            <div v-if="loading" class="text-center py-12">
                <div
                    class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <UIcon name="i-heroicons-arrow-path"
                        class="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
                </div>
                <p class="text-lg font-medium text-neutral-600 dark:text-neutral-400">Müşteriler yükleniyor...</p>
            </div>

            <!-- Müşteri Kartları -->
            <div v-else-if="users?.data?.length > 0" class="space-y-4">
                <div v-for="user in users.data" :key="user.id"
                    class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow duration-300">

                    <!-- Kart Header -->
                    <div
                        class="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 rounded-t-xl p-4 border-b border-neutral-200 dark:border-neutral-700">
                        <div class="flex items-center space-x-3">
                            <UAvatar :alt="user.name" size="sm" class="flex-shrink-0" />
                            <div class="flex-1 min-w-0">
                                <div class="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                                    {{ user.name }}
                                </div>
                                <div class="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                                    {{ user.email }}
                                </div>
                                <div v-if="user.nickname" class="text-xs text-neutral-400 dark:text-neutral-500">
                                    @{{ user.nickname }}
                                </div>
                            </div>
                            <UBadge :color="getRoleColor(user.role)" :label="getRoleLabel(user.role)" size="sm" />
                        </div>
                    </div>

                    <!-- Kart İçerik -->
                    <div class="p-4">
                        <div class="grid grid-cols-2 gap-4 mb-3">
                            <!-- Kayıt Tarihi -->
                            <div>
                                <p class="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Kayıt Tarihi</p>
                                <p class="text-sm text-neutral-900 dark:text-neutral-100">
                                    {{ user.created_at ? formatDate(user.created_at) : 'Bilinmiyor' }}
                                </p>
                            </div>

                            <!-- Son Aktivite -->
                            <div>
                                <p class="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Son Aktivite</p>
                                <p class="text-sm text-neutral-900 dark:text-neutral-100">
                                    {{ user.last_activity ? formatDate(user.last_activity) : 'Hiç giriş yapmamış' }}
                                </p>
                            </div>

                            <!-- Sepet Durumu -->
                            <div class="col-span-2">
                                <p class="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Sepet</p>
                                <div v-if="user.cart_items_count > 0" class="flex items-center">
                                    <UIcon name="i-heroicons-shopping-cart" class="w-4 h-4 text-orange-500 mr-1" />
                                    <span class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                        {{ user.cart_items_count }} ürün
                                    </span>
                                </div>
                                <div v-else class="text-sm text-neutral-400 dark:text-neutral-500">
                                    Boş sepet
                                </div>
                            </div>
                        </div>

                        <!-- Aksiyonlar -->
                        <div class="flex justify-end">
                            <UButton size="sm" color="gray" variant="ghost" icon="i-heroicons-eye"
                                @click="viewUser(user)" class="w-full sm:w-auto">
                                Görüntüle
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Boş State -->
            <div v-else class="text-center py-12">
                <div
                    class="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UIcon name="i-heroicons-users" class="w-12 h-12 text-neutral-400 dark:text-neutral-500" />
                </div>
                <h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    Müşteri bulunamadı
                </h3>
                <p class="text-neutral-600 dark:text-neutral-400">
                    Arama kriterlerinizi değiştirerek tekrar deneyin.
                </p>
            </div>

            <!-- Mobil Pagination -->
            <div v-if="users?.last_page > 1"
                class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 shadow-sm">
                <div class="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                    <div class="text-sm text-neutral-600 dark:text-neutral-400 text-center sm:text-left">
                        {{ users.from }}-{{ users.to }} / {{ users.total }} müşteri
                    </div>
                    <UPagination v-model="currentPage" :page-count="users.last_page" :total="users.total" :max="5" :ui="{
                        wrapper: 'flex items-center gap-1',
                        rounded: '!rounded-md',
                        default: {
                            size: 'sm'
                        }
                    }" />
                </div>
            </div>
        </div>

        <!-- Kullanıcı Detay Modal -->
        <UModal v-model="showUserModal" :ui="{ width: 'w-full max-w-2xl' }">
            <UCard v-if="selectedUser" :ui="{ header: { base: 'flex items-center justify-between' } }">
                <template #header>
                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Müşteri Detayları
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        @click="showUserModal = false" />
                </template>

                <div class="space-y-6">
                    <!-- Kullanıcı Bilgileri -->
                    <div>
                        <h4 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">Genel Bilgiler</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Ad
                                    Soyad</label>
                                <p class="text-sm text-neutral-900 dark:text-neutral-100">{{ selectedUser.name }}</p>
                            </div>
                            <div>
                                <label
                                    class="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">E-posta</label>
                                <p class="text-sm text-neutral-900 dark:text-neutral-100">{{ selectedUser.email }}</p>
                            </div>
                            <div v-if="selectedUser.nickname">
                                <label
                                    class="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Kullanıcı
                                    Adı</label>
                                <p class="text-sm text-neutral-900 dark:text-neutral-100">@{{ selectedUser.nickname }}
                                </p>
                            </div>
                            <div>
                                <label
                                    class="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Rol</label>
                                <UBadge :color="getRoleColor(selectedUser.role)"
                                    :label="getRoleLabel(selectedUser.role)" size="sm" />
                            </div>
                            <div>
                                <label
                                    class="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Kayıt
                                    Tarihi</label>
                                <p class="text-sm text-neutral-900 dark:text-neutral-100">
                                    {{ selectedUser.created_at ? formatDate(selectedUser.created_at) : 'Bilinmiyor' }}
                                </p>
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Son
                                    Giriş</label>
                                <p class="text-sm text-neutral-900 dark:text-neutral-100">
                                    {{ selectedUser.last_activity ? formatDate(selectedUser.last_activity) : `Hiç giriş
                                    yapmamış` }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Sepet Bilgileri -->
                    <div v-if="selectedUser.cart_items?.length > 0">
                        <h4 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                            Sepet ({{ selectedUser.cart_items.length }} ürün)
                        </h4>
                        <div class="space-y-2 max-h-64 overflow-y-auto">
                            <div v-for="item in selectedUser.cart_items" :key="item.id"
                                class="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                                <div class="flex-1">
                                    <p class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                        {{ item.product?.name || 'Ürün bilgisi bulunamadı' }}
                                    </p>
                                    <p class="text-xs text-neutral-500 dark:text-neutral-400">
                                        Miktar: {{ item.quantity }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h4 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">Sepet</h4>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400">Sepet boş</p>
                    </div>
                </div>

                <template #footer>
                    <div class="flex justify-end space-x-2">
                        <UButton color="gray" variant="ghost" @click="showUserModal = false">
                            Kapat
                        </UButton>
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin'
})

// Debounce composable'ını kullan
const { debounce } = useDebounce()

// Reactive Data
const users = ref(null)
const userStats = ref(null)
const loading = ref(false)
const currentPage = ref(1)
const showUserModal = ref(false)
const selectedUser = ref(null)

const filters = ref({
    search: '',
    role: '',
    activity_filter: '',
    sort_by: 'created_at',
    sort_order: 'desc'
})

// Breadcrumb links
const breadcrumbLinks = [
    {
        label: 'Dashboard',
        icon: 'i-heroicons-home',
        to: '/management'
    },
    {
        label: 'Müşteri Yönetimi',
        icon: 'i-heroicons-users'
    }
]

// Options
const roleOptions = [
    { label: 'Tüm Roller', value: '' },
    { label: 'Müşteri', value: 'user' },
    { label: 'Admin', value: 'admin' },
    { label: 'Satıcı', value: 'vendor' }
]

const activityOptions = [
    { label: 'Tüm Kullanıcılar', value: '' },
    { label: 'Bugün Aktif', value: 'active_today' },
    { label: 'Bu Hafta Aktif', value: 'active_week' },
    { label: 'Bu Ay Aktif', value: 'active_month' },
    { label: 'Pasif Kullanıcılar', value: 'inactive' }
]

const sortOptions = [
    { label: 'En Yeni', value: 'created_at' },
    { label: 'En Eski', value: 'created_at_asc' },
    { label: 'Son Aktivite', value: 'last_activity' },
    { label: 'Alfabetik (A-Z)', value: 'name' },
    { label: 'Alfabetik (Z-A)', value: 'name_desc' }
]

// Methods
const getUsers = async () => {
    loading.value = true
    try {
        const query = new URLSearchParams()

        // Filters
        if (filters.value.search) query.append('search', filters.value.search)
        if (filters.value.role) query.append('role', filters.value.role)
        if (filters.value.activity_filter) query.append('activity_filter', filters.value.activity_filter)

        // Sorting
        const sortValue = filters.value.sort_by
        if (sortValue.includes('_asc') || sortValue.includes('_desc')) {
            const [field, order] = sortValue.includes('_asc') ? [sortValue.replace('_asc', ''), 'asc'] : [sortValue.replace('_desc', ''), 'desc']
            query.append('sort_by', field)
            query.append('sort_order', order)
        } else {
            query.append('sort_by', sortValue)
            query.append('sort_order', 'desc')
        }

        query.append('page', currentPage.value)
        query.append('per_page', 15)

        // Auth fetch kullan
        const response = await useBaseOFetchWithAuth(`admin/users?${query.toString()}`)
        users.value = response

    } catch (error) {
        console.error('Kullanıcılar yüklenemedi:', error)
        // Toast notification eklenebilir
    } finally {
        loading.value = false
    }
}

const getUserStats = async () => {
    try {
        // Stats endpoint'i data wrapper kullanıyor
        const response = await useBaseOFetchWithAuth('admin/users/stats')
        userStats.value = response

    } catch (error) {
        console.error('İstatistikler yüklenemedi:', error)
    }
}

const viewUser = async (user) => {
    try {
        // Show endpoint direkt user objesini döndürür
        const response = await useBaseOFetchWithAuth(`admin/users/${user.id}`)
        selectedUser.value = response
        showUserModal.value = true

    } catch (error) {
        console.error('Kullanıcı detayları yüklenemedi:', error)
    }
}

const resetFilters = () => {
    filters.value = {
        search: '',
        role: '',
        activity_filter: '',
        sort_by: 'created_at',
        sort_order: 'desc'
    }
    currentPage.value = 1
    getUsers()
}

// Utility Methods
const getRoleColor = (role) => {
    const colors = {
        'admin': 'red',
        'vendor': 'blue',
        'user': 'green'
    }
    return colors[role] || 'gray'
}

const getRoleLabel = (role) => {
    const labels = {
        'admin': 'Admin',
        'vendor': 'Satıcı',
        'user': 'Müşteri'
    }
    return labels[role] || role
}

const formatDate = (date) => {
    return new Date(date).toLocaleString('tr-TR')
}

// Debounced search
const debouncedSearch = debounce(() => {
    currentPage.value = 1
    getUsers()
}, 500)

// Watchers
watch(currentPage, () => {
    getUsers()
})

// Initialize
onMounted(() => {
    getUsers()
    getUserStats()
})
</script>