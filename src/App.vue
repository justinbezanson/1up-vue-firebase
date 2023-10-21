<template>
  <nav>
    <router-link to="/"> Home </router-link> |
    <router-link to="/feed"> Feed </router-link> |
    <router-link to="/register"> Register </router-link> |
    <router-link to="/sign-in"> Login </router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
  </nav>
  <router-view />
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
  import router from './router';

  const isLoggedIn = ref(false);

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
</script>

<style scoped>

</style>
