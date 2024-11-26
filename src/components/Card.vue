<template>
  <img v-show="isLoaded" :src="'https://asia.pokemon-card.com/th/card-img/' + props.cardID + '.png'" :alt="props.cardID"
    @load="onImageLoaded">
  <Skeleton v-if="!isLoaded" containerClass="skeleton" childClass="skeleton-item" />

</template>

<script setup>
import { ref } from 'vue';

const isLoaded = ref(false)

const props = defineProps({
  cardID: String
})

const onImageLoaded = () => {
  isLoaded.value = true
}

</script>

<style scoped>
img {
  width: 100%;
}
</style>