<template>
  <div class="container">
    <Header />
    <RouterView />
  </div>
  <NavBar />
</template>

<script setup>
import { onMounted, provide, ref } from 'vue';
import Header from './components/Header.vue';
import NavBar from './components/NavBar.vue';

const Collections = ref([])

provide('Collections', Collections)
onMounted(() => {
  const col = localStorage.getItem("Collections")

  if (col) {
    Collections.value = JSON.parse(col)
  } else {
    localStorage.setItem("Collections", JSON.stringify(Collections.value))
  }
})
</script>

<style scoped></style>