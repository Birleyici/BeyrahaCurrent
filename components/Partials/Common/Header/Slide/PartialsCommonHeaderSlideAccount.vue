<template>
    <USlideover v-model="model">
        <UCard class="flex flex-col flex-1" :ui="{
            body: { base: 'flex-1' },
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Hesap
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="model = false" />
                </div>
            </template>
            <PartialsFormLoginRegisterForm v-if="!$mainState.isAuthenticated" />
            <p v-else >
                <ul class="list-none">
                    <li
                    v-for="menu in menuItems"
                      class="flex  items-center p-4 mb-2 bg-slate-100 hover:bg-slate-50 cursor-pointer select-none duration-200"
                    >
                      <NuxtLink class="w-full h-full" :to="menu.link">  
                        <span class="ml-2">{{menu.name}}</span>
                      </NuxtLink>
                    </li>
               
                  </ul>
            </p>


        </UCard>
    </USlideover>
</template>

<script setup>
const { nextNotRegister } = defineProps(["nextNotRegister"]);
const model = defineModel();
const menuItems = [
    {
        name: 'Hesabım',
        link: '/hesap'
    },
    {
        name: 'Siparişlerim',
        link: '/hesap/siparislerim'
    }
]
</script>