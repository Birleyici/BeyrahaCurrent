<template>
  <div class="space-y-3">
    <!-- Ödeme Yöntemi -->
    <div class="flex justify-between items-center">
      <span class="font-medium text-neutral-700 dark:text-neutral-300">Ödeme yöntemi:</span>
      <span class="text-secondary-600 dark:text-secondary-400">Havale / EFT</span>
    </div>

    <!-- Kupon İndirimi (eğer varsa) -->
    <div v-if="props.couponUsage" class="flex justify-between items-center">
      <span class="font-medium text-green-600 dark:text-green-400">
        Kupon indirimi:
        <span class="text-xs text-neutral-500">({{ props.couponUsage.coupon?.code }})</span>
      </span>
      <span class="font-semibold text-green-600 dark:text-green-400">
        -{{ formatPrice(props.couponUsage.discount_amount || 0) }}
      </span>
    </div>

    <!-- Kargo -->
    <div class="flex justify-between items-center">
      <span class="font-medium text-neutral-700 dark:text-neutral-300">Kargo:</span>
      <span class="text-secondary-600 dark:text-secondary-400">
        {{ props.shippingCost ? formatPrice(props.shippingCost) : 'Ücretsiz' }}
      </span>
    </div>

    <!-- Genel Toplam -->
    <div class="flex justify-between items-center pt-2 border-t border-neutral-200 dark:border-neutral-700">
      <span class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Genel toplam:</span>
      <span class="text-xl font-bold text-secondary-600 dark:text-secondary-400">
        {{ formatPrice(props.total + props.shippingCost) }}
      </span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['total', 'shippingCost', 'couponUsage'])
</script>