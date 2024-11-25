<template>
  <h1>แฟ้มสะสม</h1>
  <ul class="cards" v-if="searchText != ''">
    <li v-for="card in Collections" :key="card.cardID" @click="selectCard(card.cardID, card.amt)">
      <img :src="getCardImage(card.cardID)" alt="" srcset="">
    </li>
  </ul>


  <div class="wrapper" v-if="isAdd">
    <i class="fa-duotone fa-solid fa-circle-xmark" @click="isAdd = false"></i>
    <AddCard :cardID="cardID" />
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import Data from '../assets/Cards.json';
import AddCard from '../components/AddCard.vue';

const isAdd = ref(false)
const cardID = ref("")
const amt = ref(0)

const Collections = inject('Collections')

const getCardImage = (id) => {
  const cardImageUrl = Data.Cards.filter(card => card.id == id)[0].image
  return cardImageUrl
}

const selectCard = (id, a) => {
  isAdd.value = true
  cardID.value = id
  amt.value = a
}
</script>

<style scoped>
h1 {
  margin-bottom: 1em;
}

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
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em
}

li {
  width: 30%
}

img {
  width: 100%;
}
</style>