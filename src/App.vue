<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { initCollapses } from 'flowbite';
import router from './router';

type NavListType = {
   name: string;
   path: string;
};

onMounted(() => {
   initCollapses();
});

const navList: NavListType[] = router
   .getRoutes()
   .sort((a, b) => Number(a.meta.order) - Number(b.meta.order))
   .map(route => ({
      name: route.name as string,
      path: route.path
   }));
</script>

<template>
   <header>
      <div>
         <nav class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="container mx-auto flex flex-wrap items-center justify-between p-4">
               <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                  <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vue Router</span>
               </RouterLink>
               <button
                  data-collapse-toggle="navbar-default"
                  type="button"
                  class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-default"
                  aria-expanded="false">
                  <span class="sr-only">Open main menu</span>
                  <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                  </svg>
               </button>
               <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                  <ul
                     class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                     <li v-for="(item, index) in navList" :key="index">
                        <RouterLink
                           :to="{ name: item.name }"
                           active-class="text-white bg-blue-700 dark:hover:!bg-blue-700 md:dark:text-blue-500"
                           class="block py-2 px-3 rounded hover:bg-gray-100 dark:text-white capitalize dark:hover:bg-gray-700 md:bg-transparent md:dark:hover:!bg-transparent md:dark:hover:text-blue-500"
                           aria-current="page">
                           {{ item.name }}
                        </RouterLink>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
      </div>
   </header>

   <main class="container px-4 mx-auto">
      <router-view v-slot="{ Component, route }">
         <transition :name="route.meta!.transition! as string">
            <component :is="Component" />
         </transition>
      </router-view>
   </main>
</template>

<style scoped></style>
