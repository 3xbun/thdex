<template>
  <div>
    <img loading="lazy" :src="'https://asia.pokemon-card.com/th/card-img/' + props.cardID + '.png'" alt="props.cardID">
  </div>
</template>

<script setup>

const props = defineProps({
  cardID: String
})

</script>

<style scoped>
img {
  width: 100%;
}
</style>