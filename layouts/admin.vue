<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <div
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0"
      :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }">

      <!-- Logo Area -->
      <div class="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <div class="flex items-center space-x-3">
          <UAvatar size="sm" imgClass="object-contain" src="https://beyraha.vercel.app/logo.jpg" alt="Beyraha Logo" />
          <h1 class="text-lg lg:text-xl font-bold text-white">Beyraha Admin</h1>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="mt-6 px-3 pb-20 overflow-y-auto h-full">
        <div class="space-y-1">
          <!-- Dashboard -->
          <NuxtLink to="/management"
            class="flex items-center px-4 py-3.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group touch-manipulation"
            :class="{ 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400': $route.path === '/management' }"
            @click="closeMobileSidebar">
            <Icon name="mdi:view-dashboard"
              class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
            <span class="font-medium">Dashboard</span>
          </NuxtLink>

          <!-- Ürünler Section -->
          <div class="pt-4">
            <h3 class="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Ürün Yönetimi
            </h3>

            <NuxtLink to="/management/urunler"
              class="flex items-center px-4 py-3.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group touch-manipulation"
              :class="{ 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400': $route.path.includes('/management/urunler') }"
              @click="closeMobileSidebar">
              <Icon name="mdi:package-variant"
                class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span class="font-medium">Ürün Listesi</span>
            </NuxtLink>

            <NuxtLink to="/management/urunler/yeni"
              class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group ml-4 touch-manipulation"
              @click="closeMobileSidebar">
              <Icon name="mdi:plus-circle-outline"
                class="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span class="text-sm font-medium">Yeni Ürün</span>
            </NuxtLink>
          </div>

          <!-- Siparişler Section -->
          <div class="pt-4">
            <h3 class="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Sipariş Yönetimi
            </h3>

            <NuxtLink to="/management/siparisler"
              class="flex items-center px-4 py-3.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group touch-manipulation"
              :class="{ 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400': $route.path.includes('/management/siparisler') }"
              @click="closeMobileSidebar">
              <Icon name="mdi:shopping" class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span class="font-medium">Siparişler</span>
              <span v-if="pendingOrdersCount > 0"
                class="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                {{ pendingOrdersCount }}
              </span>
            </NuxtLink>
          </div>

          <!-- Ayarlar Section -->
          <div class="pt-4">
            <h3 class="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Sistem
            </h3>

            <button @click="toggleDarkMode"
              class="w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group touch-manipulation">
              <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'"
                class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span class="font-medium">{{ isDark ? 'Açık Tema' : 'Koyu Tema' }}</span>
            </button>
          </div>
        </div>
      </nav>

      <!-- User Profile Section -->
      <div
        class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div
          class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer touch-manipulation"
          @click="showUserMenu = !showUserMenu">
          <UAvatar size="sm" imgClass="object-contain" src="https://beyraha.vercel.app/logo.jpg" alt="User Avatar" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
              Admin User
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
              admin@beyraha.com
            </p>
          </div>
          <Icon name="mdi:chevron-up" class="w-4 h-4 text-gray-400 transition-transform duration-200"
            :class="{ 'rotate-180': !showUserMenu }" />
        </div>

        <!-- User Menu Dropdown -->
        <div v-if="showUserMenu"
          class="mt-2 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
          <button v-for="item in userMenuItems.flat()" :key="item.label" @click="item.click"
            class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 touch-manipulation">
            <Icon :name="item.icon" class="w-4 h-4 mr-3" />
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile sidebar overlay -->
    <div v-if="sidebarOpen" @click="sidebarOpen = false"
      class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden touch-manipulation">
    </div>

    <!-- Main Content Area -->
    <div class="lg:pl-64 flex flex-col min-h-screen">
      <!-- Top Header -->
      <header
        class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div class="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4">
          <!-- Mobile menu button and title -->
          <div class="flex items-center space-x-3 flex-1 lg:flex-none">
            <button @click="sidebarOpen = !sidebarOpen"
              class="lg:hidden p-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation">
              <Icon name="mdi:menu" class="w-6 h-6" />
            </button>

            <div class="min-w-0">
              <h1 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white truncate">
                {{ pageTitle }}
              </h1>
              <p v-if="pageSubtitle" class="text-sm text-gray-500 dark:text-gray-400 hidden lg:block">
                {{ pageSubtitle }}
              </p>
            </div>
          </div>

          <!-- Header Actions -->
          <div class="flex items-center space-x-2 lg:space-x-4">
            <!-- Search - Hidden on mobile -->
            <div class="hidden md:block">
              <div class="relative">
                <input v-model="searchQuery" type="text" placeholder="Ara..."
                  class="w-48 lg:w-64 pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  @keyup.enter="performSearch">
                <Icon name="mdi:magnify" class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <!-- Mobile search button -->
            <button @click="showMobileSearch = !showMobileSearch"
              class="md:hidden p-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 touch-manipulation">
              <Icon name="mdi:magnify" class="w-5 h-5" />
            </button>

            <!-- Notifications -->
            <button @click="showNotifications = !showNotifications"
              class="relative p-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 touch-manipulation">
              <Icon name="mdi:bell-outline" class="w-5 h-5 lg:w-6 lg:h-6" />
              <span v-if="notificationCount > 0"
                class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {{ notificationCount }}
              </span>
            </button>

            <!-- Theme Toggle - Hidden on mobile, shown in sidebar instead -->
            <button @click="toggleDarkMode"
              class="hidden lg:block p-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 touch-manipulation">
              <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="w-6 h-6" />
            </button>

            <!-- User Menu -->
            <UDropdown :items="userMenuItems" :popper="{ placement: 'bottom-end' }">
              <UAvatar size="sm"
                imgClass="object-contain cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-200 touch-manipulation"
                src="https://beyraha.vercel.app/logo.jpg" alt="User Menu" />
            </UDropdown>
          </div>
        </div>

        <!-- Mobile Search Bar -->
        <div v-if="showMobileSearch" class="md:hidden px-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div class="relative mt-3">
            <input v-model="searchQuery" type="text" placeholder="Ara..."
              class="w-full pl-10 pr-4 py-3 text-sm bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500"
              @keyup.enter="performSearch">
            <Icon name="mdi:magnify" class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </header>

      <!-- Breadcrumb - Hidden on mobile -->
      <nav
        class="hidden lg:block bg-gray-50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-200 dark:border-gray-700"
        aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li class="list-none">
            <NuxtLink to="/management"
              class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Icon name="mdi:home" class="w-4 h-4 mr-1" />
              Dashboard
            </NuxtLink>
          </li>
          <li v-if="$route.path !== '/management'" class="flex items-center">
            <Icon name="mdi:chevron-right" class="w-4 h-4 text-gray-400 mx-2" />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ pageTitle }}</span>
          </li>
        </ol>
      </nav>

      <!-- Page Content -->
      <main class="flex-1 p-4 lg:p-6">
        <div class="max-w-7xl mx-auto">
          <LazyNuxtPage />
        </div>
      </main>

      <!-- Footer -->
      <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 mt-auto">
        <div class="max-w-7xl mx-auto px-4 lg:px-6">
          <div class="flex flex-col lg:flex-row items-center justify-between space-y-2 lg:space-y-0">
            <p class="text-sm text-gray-600 dark:text-gray-400 text-center lg:text-left">
              © 2024 Beyraha. Tüm hakları saklıdır.
            </p>
            <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
              <span>Admin Panel v2.0</span>
              <span class="flex items-center space-x-1">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Çevrimiçi</span>
              </span>
            </div>
          </div>
        </div>
      </footer>

      <!-- Notifications Dropdown -->
      <div v-if="showNotifications"
        class="fixed top-16 right-4 lg:top-20 lg:right-6 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Bildirimler</h3>
            <button @click="showNotifications = false"
              class="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>
        </div>
        <div class="max-h-96 overflow-y-auto">
          <div v-if="notifications.length === 0" class="p-8 text-center text-gray-500 dark:text-gray-400">
            <Icon name="mdi:bell-outline" class="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Henüz bildirim yok</p>
          </div>
          <div v-else>
            <div v-for="notification in notifications" :key="notification.id"
              class="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ notification.title }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ notification.message }}</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ notification.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const sidebarOpen = ref(false);
const showUserMenu = ref(false);
const showMobileSearch = ref(false);
const showNotifications = ref(false);
const searchQuery = ref('');
const notificationCount = ref(2);
const pendingOrdersCount = ref(3);

// Dark mode composable'ını kullan
const { isDark, toggleDarkMode, initDarkMode } = useDarkMode();

// Sample notifications data
const notifications = ref([
  {
    id: 1,
    title: 'Yeni Sipariş',
    message: 'Yeni bir sipariş alındı (#1234)',
    time: '5 dakika önce'
  },
  {
    id: 2,
    title: 'Stok Uyarısı',
    message: 'iPhone 15 Pro stokta azalma',
    time: '1 saat önce'
  }
]);

// Page title and subtitle computed properties
const pageTitle = computed(() => {
  const route = useRoute();
  if (route.path === '/management') return 'Dashboard';
  if (route.path === '/management/urunler') return 'Ürün Listesi';
  if (route.path === '/management/urunler/yeni') return 'Yeni Ürün';
  if (route.path.includes('/management/urunler/')) return 'Ürün Düzenle';
  if (route.path.includes('/management/siparisler')) return 'Siparişler';
  return 'Admin Panel';
});

const pageSubtitle = computed(() => {
  const route = useRoute();
  if (route.path === '/management') return 'Genel bakış ve istatistikler';
  if (route.path === '/management/urunler') return 'Tüm ürünlerinizi yönetin';
  if (route.path === '/management/urunler/yeni') return 'Yeni ürün ekleyin';
  if (route.path.includes('/management/urunler/')) return 'Ürün bilgilerini düzenleyin';
  if (route.path.includes('/management/siparisler')) return 'Sipariş takibi ve yönetimi';
  return '';
});

// User menu items
const userMenuItems = [
  [{
    label: 'Profil Ayarları',
    icon: 'mdi:account-circle',
    click: () => {
      console.log('Profil');
      showUserMenu.value = false;
    }
  }],
  [{
    label: 'Sistem Ayarları',
    icon: 'mdi:cog',
    click: () => {
      console.log('Ayarlar');
      showUserMenu.value = false;
    }
  }],
  [{
    label: 'Güvenli Çıkış',
    icon: 'mdi:logout',
    click: () => {
      console.log('Çıkış');
      showUserMenu.value = false;
    }
  }]
];

// Methods
const closeMobileSidebar = () => {
  if (process.client && window.innerWidth < 1024) {
    sidebarOpen.value = false;
  }
};

const performSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value);
    showMobileSearch.value = false;
  }
};

// Close dropdowns when clicking outside
const closeDropdowns = () => {
  showUserMenu.value = false;
  showNotifications.value = false;
  showMobileSearch.value = false;
};

// Auto-close sidebar and dropdowns on route change
watch(() => useRoute().path, () => {
  closeMobileSidebar();
  closeDropdowns();
});

// Initialize dark mode on mount
onMounted(() => {
  initDarkMode();

  if (process.client) {
    document.addEventListener('click', (event) => {
      const target = event.target;

      // Close user menu if clicked outside
      if (showUserMenu.value && !target.closest('.user-profile-section')) {
        showUserMenu.value = false;
      }

      // Close notifications if clicked outside
      if (showNotifications.value && !target.closest('[data-notifications]')) {
        showNotifications.value = false;
      }

      // Close mobile search if clicked outside
      if (showMobileSearch.value && !target.closest('[data-mobile-search]')) {
        showMobileSearch.value = false;
      }
    });
  }
});
</script>
