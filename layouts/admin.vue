<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <div
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0"
      :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }">

      <!-- Logo Area -->
      <div class="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <div class="flex items-center space-x-3">
          <UAvatar size="sm" imgClass="object-contain" src="https://beyraha.vercel.app/logo.jpg" alt="Beyraha Logo" />
          <h1 class="text-xl font-bold text-white">Beyraha Admin</h1>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="mt-8 px-4">
        <div class="space-y-2">
          <!-- Dashboard -->
          <NuxtLink to="/management"
            class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
            :class="{ 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400': $route.path === '/management' }">
            <Icon name="mdi:view-dashboard"
              class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
            <span class="font-medium">Dashboard</span>
          </NuxtLink>

          <!-- Ürünler Section -->
          <div class="pt-4">
            <h3 class="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Ürün Yönetimi
            </h3>

            <NuxtLink to="/management/urunler"
              class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
              :class="{ 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400': $route.path.includes('/management/urunler') }">
              <Icon name="mdi:package-variant"
                class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span class="font-medium">Ürün Listesi</span>
            </NuxtLink>

            <NuxtLink to="/management/urunler/yeni"
              class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group ml-4">
              <Icon name="mdi:plus-circle-outline"
                class="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span class="text-sm">Yeni Ürün</span>
            </NuxtLink>
          </div>

          <!-- Siparişler Section -->
          <div class="pt-4">
            <h3 class="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Sipariş Yönetimi
            </h3>

            <NuxtLink to="/management/siparisler"
              class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
              :class="{ 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400': $route.path.includes('/management/siparisler') }">
              <Icon name="mdi:shopping" class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span class="font-medium">Siparişler</span>
            </NuxtLink>
          </div>
        </div>
      </nav>

      <!-- User Profile Section -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
          <UAvatar size="sm" imgClass="object-contain" src="https://beyraha.vercel.app/logo.jpg" alt="User Avatar" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
              Admin User
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
              admin@beyraha.com
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile sidebar overlay -->
    <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden">
    </div>

    <!-- Main Content Area -->
    <div class="lg:pl-64">
      <!-- Top Header -->
      <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between px-4 py-4">
          <!-- Mobile menu button -->
          <button @click="sidebarOpen = !sidebarOpen"
            class="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Icon name="mdi:menu" class="w-6 h-6" />
          </button>

          <!-- Page Title -->
          <div class="flex-1 lg:flex-none">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ pageTitle }}
            </h1>
          </div>

          <!-- Header Actions -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button
              class="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
              <Icon name="mdi:bell-outline" class="w-6 h-6" />
              <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            <!-- Theme Toggle -->
            <button @click="toggleDarkMode"
              class="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="w-6 h-6" />
            </button>

            <!-- User Menu -->
            <UDropdown :items="userMenuItems" :popper="{ placement: 'bottom-end' }">
              <UAvatar size="sm"
                imgClass="object-contain cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-200"
                src="https://beyraha.vercel.app/logo.jpg" alt="User Menu" />
            </UDropdown>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <div class="max-w-7xl mx-auto">
          <LazyNuxtPage />
        </div>
      </main>

      <!-- Footer -->
      <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div class="max-w-7xl mx-auto px-6">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              © 2024 Beyraha. Tüm hakları saklıdır.
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-500">
              Admin Panel v1.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
const sidebarOpen = ref(false);
const isDark = ref(false);

// Page title computed property
const pageTitle = computed(() => {
  const route = useRoute();
  if (route.path === '/management') return 'Dashboard';
  if (route.path.includes('/management/urunler')) return 'Ürün Yönetimi';
  if (route.path.includes('/management/siparisler')) return 'Sipariş Yönetimi';
  return 'Admin Panel';
});

// User menu items
const userMenuItems = [
  [{
    label: 'Profil',
    icon: 'mdi:account-circle',
    click: () => console.log('Profil')
  }],
  [{
    label: 'Ayarlar',
    icon: 'mdi:cog',
    click: () => console.log('Ayarlar')
  }],
  [{
    label: 'Çıkış Yap',
    icon: 'mdi:logout',
    click: () => console.log('Çıkış')
  }]
];

// Dark mode toggle
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  // Dark mode implementation will be added here
};

// Close sidebar on route change (mobile)
watch(() => useRoute().path, () => {
  if (process.client && window.innerWidth < 1024) {
    sidebarOpen.value = false;
  }
});
</script>
