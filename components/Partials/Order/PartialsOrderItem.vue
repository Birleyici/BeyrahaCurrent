<template>
  <div class="border rounded-md">
    <div class="lg:flex items-center justify-between lg:space-x-8 bg-tertiary-100 rounded-t-md p-minimal">
      <div class="flex justify-between space-x-8">

        <!-- <UAvatarGroup size="sm" :max="2">
          <NuxtImg v-for="orderItem in props.item.order_items" :src="'aws' + orderItem.image?.path"
            class="w-[50px] h-[50px] object-top object-cover border border-white drop-shadow-sm rounded-full" width="50"
            height="80" />
        </UAvatarGroup> -->
        <div>
          <p class="text-sm">Sipariş tarihi</p>
          <p class="font-medium text-sm">{{ formatDate(props.item.created_at) }}</p>
        </div>
      </div>
      <div class="flex justify-between my-minimal lg:my-0 lg:space-x-24 items-center">
        <div>
          <p class="text-sm">Toplam tutar</p>
          <p class="font-medium text-secondary-500">{{ formatPrice(props.item.total_with_shipping ) }}</p>
        </div>
        <!-- <div>
          <UBadge :ui="{ rounded: 'rounded-full' }" color="orange">
            {{ orderState[props.item] }}
          </UBadge>
        </div> -->
      </div>

    </div>
    <div>
      <UAccordion :items="[
        {
          label: 'Sipariş detayları',
          slot: 'getting-started',
          defaultOpen: props.index == 0


        }]" :ui="{
          wrapper: 'flex flex-col w-full',
          item: {
            padding: 'p-3'
          }
        }">
        <template #default="{ item, open }">
          <UButton color="gray" variant="ghost" class=" rounded-b-md border-gray-200 dark:border-gray-700"
            :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
            <template #leading>

            </template>

            <span class="truncate">{{ item.label }}</span>

            <template #trailing>
              <UIcon name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 ms-auto transform transition-transform duration-200" :class="[open && 'rotate-90']" />
            </template>
          </UButton>
        </template>
        <template #getting-started>
          <div v-for="subOrder in props.item.sub_orders" class="text-gray-900 dark:text-white text-center grid gap-4">
            <PartialsOrderSummary v-for="subOrderItem in subOrder.order_items" :item="subOrderItem" />
          </div>
          <slot />
        </template>
      </UAccordion>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['item', 'index'])
const orderState = useOrderManagementStore()

</script>