<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
    <!-- Sidebar -->
    <div
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-neutral-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 border-r border-neutral-200 dark:border-neutral-700 flex flex-col"
      :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }">

      <!-- Logo Area -->
      <div
        class="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-primary-600 to-primary-700 flex-shrink-0">
        <div class="flex items-center space-x-3">
          <UAvatar size="sm" imgClass="object-contain" src="https://beyraha.vercel.app/logo.jpg" alt="Beyraha Logo" />
          <h1 class="text-lg lg:text-xl font-bold text-white">Beyraha Admin</h1>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 mt-6 px-3 overflow-y-auto">
        <div class="space-y-1 pb-20">
          <!-- Dashboard -->
          <NuxtLink to="/management"
            class="flex items-center px-4 py-3.5 text-neutral-700 dark:text-neutral-200 rounded-xl hover:bg-primary-50 dark:hover:bg-neutral-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 group touch-manipulation"
            :class="{ 'bg-primary-50 dark:bg-neutral-700 text-primary-600 dark:text-primary-400': $route.path === '/management' }"
            @click="closeMobileSidebar">
            <UIcon name="i-heroicons-home"
              class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
            <span class="font-medium">Dashboard</span>
          </NuxtLink>

          <!-- Ürünler Section -->
          <div class="pt-6">
            <h3 class="px-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
              Ürün Yönetimi
            </h3>

            <NuxtLink to="/management/urunler"
              class="flex items-center px-4 py-3.5 text-neutral-700 dark:text-neutral-200 rounded-xl hover:bg-primary-50 dark:hover:bg-neutral-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 group touch-manipulation"
              :class="{ 'bg-primary-50 dark:bg-neutral-700 text-primary-600 dark:text-primary-400': $route.path.includes('/management/urunler') }"
              @click="closeMobileSidebar">
              <UIcon name="i-heroicons-cube"
                class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span class="font-medium">Ürün Listesi</span>
            </NuxtLink>

            <NuxtLink to="/management/urunler/yeni"
              class="flex items-center px-4 py-3 text-neutral-600 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 group ml-4 touch-manipulation"
              @click="closeMobileSidebar">
              <UIcon name="i-heroicons-plus-circle"
                class="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span class="text-sm font-medium">Yeni Ürün</span>
            </NuxtLink>
          </div>

          <!-- Siparişler Section -->
          <div class="pt-6">
            <h3 class="px-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
              Sipariş Yönetimi
            </h3>

            <NuxtLink to="/management/siparisler"
              class="flex items-center px-4 py-3.5 text-neutral-700 dark:text-neutral-200 rounded-xl hover:bg-primary-50 dark:hover:bg-neutral-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 group touch-manipulation"
              :class="{ 'bg-primary-50 dark:bg-neutral-700 text-primary-600 dark:text-primary-400': $route.path.includes('/management/siparisler') }"
              @click="closeMobileSidebar">
              <UIcon name="i-heroicons-shopping-bag"
                class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span class="font-medium">Siparişler</span>
              <span v-if="pendingOrdersCount > 0"
                class="ml-auto bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full min-w-[22px] text-center">
                {{ pendingOrdersCount }}
              </span>
            </NuxtLink>
          </div>

          <!-- Yorumlar Section -->
          <div class="pt-6">
            <h3 class="px-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
              Müşteri Yorumları
            </h3>

            <NuxtLink to="/management/yorumlar"
              class="flex items-center px-4 py-3.5 text-neutral-700 dark:text-neutral-200 rounded-xl hover:bg-primary-50 dark:hover:bg-neutral-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 group touch-manipulation"
              :class="{ 'bg-primary-50 dark:bg-neutral-700 text-primary-600 dark:text-primary-400': $route.path.includes('/management/yorumlar') }"
              @click="closeMobileSidebar">
              <UIcon name="i-heroicons-chat-bubble-left-right"
                class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span class="font-medium">Yorum Yönetimi</span>
              <span v-if="pendingReviewsCount > 0"
                class="ml-auto bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full min-w-[22px] text-center">
                {{ pendingReviewsCount }}
              </span>
            </NuxtLink>
          </div>

          <!-- Ayarlar Section -->
          <div class="pt-6">
            <h3 class="px-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
              Sistem
            </h3>

            <NuxtLink to="/management/ayarlar"
              class="flex items-center px-4 py-3.5 text-neutral-700 dark:text-neutral-200 rounded-xl hover:bg-primary-50 dark:hover:bg-neutral-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 group touch-manipulation"
              :class="{ 'bg-primary-50 dark:bg-neutral-700 text-primary-600 dark:text-primary-400': $route.path === '/management/ayarlar' }"
              @click="closeMobileSidebar">
              <UIcon name="i-heroicons-cog-6-tooth"
                class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span class="font-medium">Ayarlar</span>
            </NuxtLink>

            <button @click="toggleDarkMode"
              class="w-full flex items-center px-4 py-3 text-neutral-700 dark:text-neutral-200 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 group touch-manipulation">
              <UIcon :name="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span class="font-medium">{{ isDark ? 'Açık Tema' : 'Koyu Tema' }}</span>
            </button>
          </div>
        </div>
      </nav>

      <!-- User Profile Section -->
      <div class="flex-shrink-0 p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
        <div
          class="flex items-center space-x-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors duration-200 cursor-pointer touch-manipulation"
          @click="showUserMenu = !showUserMenu">
          <UAvatar size="sm" imgClass="object-contain" src="https://beyraha.vercel.app/logo.jpg" alt="User Avatar" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-neutral-900 dark:text-white truncate">
              Admin User
            </p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">
              admin@beyraha.com
            </p>
          </div>
          <UIcon name="i-heroicons-chevron-up" class="w-4 h-4 text-neutral-400 transition-transform duration-200"
            :class="{ 'rotate-180': !showUserMenu }" />
        </div>

        <!-- User Menu Dropdown -->
        <div v-if="showUserMenu"
          class="mt-2 py-2 bg-white dark:bg-neutral-700 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-600">
          <button v-for="item in userMenuItems.flat()" :key="item.label" @click="item.click"
            class="w-full flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors duration-200 touch-manipulation">
            <UIcon :name="item.icon" class="w-4 h-4 mr-3" />
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
        class="bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-30">
        <div class="flex items-center justify-between px-4 lg:px-6 py-4">
          <!-- Mobile menu button and title -->
          <div class="flex items-center space-x-4 flex-1">
            <button @click="sidebarOpen = !sidebarOpen"
              class="lg:hidden p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 touch-manipulation">
              <UIcon name="i-heroicons-bars-3" class="w-6 h-6" />
            </button>

            <div class="min-w-0">
              <h1 class="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-white truncate">
                {{ pageTitle }}
              </h1>
              <p v-if="pageSubtitle" class="text-sm text-neutral-500 dark:text-neutral-400 hidden lg:block mt-1">
                {{ pageSubtitle }}
              </p>
            </div>
          </div>

          <!-- Header Actions -->
          <div class="flex items-center space-x-3">
            <!-- Theme Toggle - Desktop only -->
            <button @click="toggleDarkMode"
              class="hidden lg:flex p-2.5 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200 touch-manipulation">
              <UIcon :name="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'" class="w-5 h-5" />
            </button>

            <!-- User Menu -->
            <UDropdown :items="userMenuItems" :popper="{ placement: 'bottom-end' }">
              <UButton icon="i-heroicons-user-circle" size="sm" color="gray" variant="ghost"
                class="hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200" />
            </UDropdown>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-4 lg:p-6">
        <div class="max-w-7xl mx-auto">
          <LazyNuxtPage />
        </div>
      </main>

      <!-- Footer -->
      <footer class="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 py-4 mt-auto">
        <div class="max-w-7xl mx-auto px-4 lg:px-6">
          <div class="flex flex-col lg:flex-row items-center justify-between space-y-2 lg:space-y-0">
            <p class="text-sm text-neutral-600 dark:text-neutral-400 text-center lg:text-left">
              © 2024 Beyraha. Tüm hakları saklıdır.
            </p>
            <div class="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
              <span>Admin Panel v2.0</span>
              <span class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Çevrimiçi</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
const sidebarOpen = ref(false);
const showUserMenu = ref(false);
const pendingOrdersCount = ref(3);

// Admin stats composable'ını kullan
const { pendingReviewsCount, initAdminStats } = useAdminStats();

// Dark mode composable'ını kullan
const { isDark, toggleDarkMode, initDarkMode } = useDarkMode();

// Page title and subtitle computed properties
const pageTitle = computed(() => {
  const route = useRoute();
  if (route.path === '/management') return 'Dashboard';
  if (route.path === '/management/urunler') return 'Ürün Listesi';
  if (route.path === '/management/urunler/yeni') return 'Yeni Ürün';
  if (route.path.includes('/management/urunler/')) return 'Ürün Düzenle';
  if (route.path === '/management/siparisler') return 'Sipariş Yönetimi';
  if (route.path.includes('/management/siparisler/') && route.params.id) return 'Sipariş Detayı';
  if (route.path === '/management/yorumlar') return 'Yorum Yönetimi';
  return 'Admin Panel';
});

const pageSubtitle = computed(() => {
  const route = useRoute();
  if (route.path === '/management') return 'Genel bakış ve istatistikler';
  if (route.path === '/management/urunler') return 'Tüm ürünlerinizi görüntüleyin ve yönetin';
  if (route.path === '/management/urunler/yeni') return 'Sisteme yeni ürün ekleyin';
  if (route.path.includes('/management/urunler/')) return 'Ürün bilgilerini düzenleyin ve güncelleyin';
  if (route.path === '/management/siparisler') return 'Tüm siparişlerinizi görüntüleyin ve yönetin';
  if (route.path.includes('/management/siparisler/') && route.params.id) return `Sipariş #${route.params.id} detayları ve işlemleri`;
  if (route.path === '/management/yorumlar') return 'Müşteri yorumlarını görüntüleyin, onaylayın ve yönetin';
  return '';
});

// User menu items
const userMenuItems = [
  [{
    label: 'Profil Ayarları',
    icon: 'i-heroicons-user-circle',
    click: () => {
      console.log('Profil');
      showUserMenu.value = false;
    }
  }],
  [{
    label: 'Sistem Ayarları',
    icon: 'i-heroicons-cog-6-tooth',
    click: () => {
      console.log('Ayarlar');
      showUserMenu.value = false;
    }
  }],
  [{
    label: 'Güvenli Çıkış',
    icon: 'i-heroicons-arrow-right-on-rectangle',
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

// Auto-close sidebar on route change
watch(() => useRoute().path, () => {
  closeMobileSidebar();
  showUserMenu.value = false;
});

// Initialize dark mode on mount
onMounted(() => {
  initDarkMode();

  // Admin stats'ları başlat
  initAdminStats();

  if (process.client) {
    document.addEventListener('click', (event) => {
      const target = event.target;

      // Close user menu if clicked outside
      if (showUserMenu.value && !target.closest('.user-profile-section')) {
        showUserMenu.value = false;
      }
    });
  }
});
</script>
