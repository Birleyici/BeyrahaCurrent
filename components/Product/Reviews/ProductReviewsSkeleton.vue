<template>
    <div
        class="bg-white dark:bg-neutral-800 rounded-none md:rounded-xl border-0 md:border border-neutral-200 dark:border-neutral-700 p-6 shadow-none md:shadow-soft animate-pulse -mx-4 md:mx-0 max-w-full">
        <!-- Header -->
        <div class="flex items-start space-x-4 mb-4">
            <!-- Avatar Skeleton -->
            <div class="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>

            <!-- User Info Skeleton -->
            <div class="flex-1 space-y-2">
                <div class="flex items-center space-x-3">
                    <!-- Name -->
                    <div class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-32"></div>
                    <!-- Badge -->
                    <div class="h-5 bg-neutral-200 dark:bg-neutral-700 rounded-full w-20"></div>
                </div>

                <!-- Rating & Date -->
                <div class="flex items-center space-x-3">
                    <!-- Stars -->
                    <div class="flex space-x-1">
                        <div v-for="i in 5" :key="i" class="w-4 h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                    </div>
                    <!-- Date -->
                    <div class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-20"></div>
                </div>
            </div>
        </div>

        <!-- Content Skeleton -->
        <div class="space-y-4">
            <!-- Comment Lines -->
            <div class="space-y-2">
                <div class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
                <div class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"></div>
                <div class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-4/6"></div>
            </div>

            <!-- Images Skeleton -->
            <div class="grid grid-cols-3 gap-3">
                <div v-for="i in 3" :key="i" class="h-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
            </div>
        </div>

        <!-- Actions Skeleton -->
        <div class="flex items-center justify-between pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-700">
            <!-- Helpful Votes -->
            <div class="flex items-center space-x-4">
                <div class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-24"></div>
                <div class="flex space-x-2">
                    <div class="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-12"></div>
                    <div class="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-12"></div>
                </div>
            </div>

            <!-- Reply Button -->
            <div class="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-16"></div>
        </div>
    </div>
</template>

<script setup>
// No props or logic needed for skeleton
</script>