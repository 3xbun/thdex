<template>
  <div class="container">
    <Header />
    <RouterView />
  </div>
  <NavBar />
</template>

<script setup>
import Header from './components/Header.vue';
import SearchBar from './components/SearchBar.vue';
import NavBar from './components/NavBar.vue';
</script>

<style lang="scss" scoped></style>