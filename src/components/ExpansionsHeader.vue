<template>
  <header>
    <div class="image">
      <img :src="setImage" alt="" />
    </div>
    <h1>{{ setName }}</h1>
  </header>
  <div class="cards">
    <img
      src="https://assets-v2.lottiefiles.com/a/ae47ca2c-bd64-11ef-8a23-cfbc45d0a788/HgjuHFgI6d.gif"
      alt="loading"
      class="loading"
      v-if="isLoading"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { Expansions } from "../assets/Expansions.json";

import { useRoute } from "vue-router";
const route = useRoute();
const setCode = route.params.setCode;

const isLoading = ref(true);

const setName = computed(() => {
  return Expansions.find((expansion) => expansion.expansionCode == setCode)
    .expansionTitle;
});

const setImage = computed(() => {
  return Expansions.find((expansion) => expansion.expansionCode == setCode)
    .expansionImage;
});
</script>

<style scoped>
header {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20vh;
  border-radius: 0.5em;
  position: relative;
}

img {
  width: 120%;
  position: absolute;
  top: -120%;
  left: -10%;
  filter: brightness(20%);
  z-index: -1;
}
</style>
