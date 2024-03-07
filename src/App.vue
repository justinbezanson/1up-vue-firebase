<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-3 w-full">
      <nav>
        <div class="max-w-6xl mx-auto px-4">
          <div class="float-left">
            <div class="float-left mr-5">Logo here</div>

            <!-- primary nav -->
            <div class="hidden md:flex items-center space-x-1 float-right">
              <router-link to="/" class="text-blue-600 font-semibold hover:text-blue-800 pr-3">Stats</router-link>
              <router-link to="/feed" class="text-blue-600 font-semibold hover:text-blue-800 pr-3">Games</router-link>
              <router-link v-if="!isLoggedIn" to="/sign-in" class="text-blue-600 font-semibold hover:text-blue-800 pr-3">Login</router-link>
            </div>
          </div>

          <!-- secondary nav -->
          <div class="float-right hidden md:flex items-center space-x-3" v-if="isLoggedIn">
            {{ auth.currentUser.displayName }}
            <button @click="handleSignOut" class="ml-2 text-blue-600 font-semibold hover:text-blue-800">
              Sign Out
            </button>
          </div>

          <!-- mobile menu -->
          <div class="mobile-menu float-right" :class="mobileMenuHidden">
            <ul class="">
              <li class="active">
                <router-link to="/" class="text-blue-600 font-semibold hover:text-blue-800 pr-3">Home</router-link>
              </li>
              <li>
                <router-link to="/feed" class="text-blue-600 font-semibold hover:text-blue-800 pr-3">Feed</router-link>
              </li>
              <li v-if="!isLoggedIn">
                <router-link to="/sign-in"
                  class="text-blue-600 font-semibold hover:text-blue-800 pr-3">Login</router-link>
              </li>
              <li v-if="isLoggedIn">
                {{ auth.currentUser.displayName }}
                <button @click="handleSignOut" class="ml-2 text-blue-600 font-semibold hover:text-blue-800">
                  Sign Out
                </button>
              </li>
            </ul>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center float-right">
            <button class="outline-none mobile-menu-button" @click="toggleButton">
              <svg class=" w-6 h-6 text-gray-500" x-show="!showMenu" fill="none" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  </div>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { applyActionCode, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import router from './router';

const isLoggedIn = ref(false);

let mobileMenuHidden = ref('hidden');

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = user ? true : false;
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/');
  });
};

const toggleButton = () => {
  mobileMenuHidden.value = mobileMenuHidden.value === 'hidden' ? '' : 'hidden';
};

</script>

<style scoped>

</style>
