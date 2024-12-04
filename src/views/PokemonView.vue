<template>
  <div>
    <h1>{{ pokemonName }}การ์ด</h1>
    <ul class="cards">
      <li @click="selectCard(card.id)" v-for="card in pokemonCards" :key="card.id">
        <img :src="'https://asia.pokemon-card.com/th/card-img/' + card.id + '.png'" :alt="card.name">
      </li>
    </ul>

    <div class="wrapper" v-if="isAdd">
      <i class="fa-duotone fa-solid fa-circle-xmark" @click="isAdd = false"></i>
      <AddCard :cardID="cardID" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
const national_no = route.params.national_no

import AddCard from '../components/AddCard.vue';
import { Cards } from '../assets/Cards.json';
import { computed, ref } from 'vue';

const isAdd = ref(false)
const cardID = ref("")

const pokemonCards = computed(() => Cards.filter(card => card.national_no == national_no))
const pokemonName = pokemonCards.value[0].name

const selectCard = (id) => {
  isAdd.value = true
  cardID.value = id
}
</script>

<style scoped>
.wrapper {
  position: fixed;
  top: 10vh;
  height: 80vh;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  max-width: 600px;
  overflow: scroll;
  border-radius: 2em;
  box-shadow: 0px -11px 20px -3px rgba(0, 0, 0, 0.75);
}

.fa-circle-xmark {
  position: absolute;
  right: 1em;
  top: .5em;
  font-size: 2em;
  opacity: .8;
  z-index: 99;
}

.cards {
  margin-top: 1em;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
}

li {
  width: 30%;
  display: flex;
  align-items: center;
}

img {
  width: 100%;
}
</style>