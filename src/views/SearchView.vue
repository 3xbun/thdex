<template>
  <div class="searchBar">
    <i class="fa-light fa-magnifying-glass"></i>
    <input type="text" placeholder="ค้นหาด้วยชื่อโปเกมอน" v-model="searchText">
  </div>

  <ul class="cards" v-if="searchText != ''">
    <li v-for="Card in Cards" :key="Card.id" @click="selectCard(Card.id)">
      <img v-show="isLoaded" :src="'https://asia.pokemon-card.com/th/card-img/' + Card.id + '.png'" :alt="Card.cardID"
        @load="onImageLoaded">
      <Skeleton v-if="!isLoaded" containerClass="skeleton" childClass="skeleton-item" />
    </li>
  </ul>

  <div class="wrapper" v-if="isAdd">
    <i class="fa-duotone fa-solid fa-circle-xmark" @click="isAdd = false"></i>
    <AddCard :cardID="cardID" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Data from '../assets/Cards.json';
import AddCard from '../components/AddCard.vue';

const isLoaded = ref(false)

const props = defineProps({
  cardID: String
})

const onImageLoaded = () => {
  isLoaded.value = true
}

const isAdd = ref(false)
const cardID = ref("")

const searchText = ref("")

const Cards = computed(
  () => {
    let counter = 0
    let results

    // search with card's name
    results = Data.Cards.filter(card => {
      if (card.name.startsWith(searchText.value)) {
        counter += 1

        if (counter <= 50) {
          return card.name.startsWith(searchText.value)
        }
      }
    })

    if (results.length > 0) {
      return results
    }

    // Search with national ID
    results = Data.Cards.filter(card => {
      if (card.national_no == searchText.value) {
        counter += 1

        if (counter <= 50) {
          return card.national_no == searchText.value
        }
      }
    })

    return results
  }
)

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

.searchBar {
  background-color: var(--dark);
  border-radius: .5em;
  padding: .5em;
  display: flex;
  gap: .5em;
  align-items: center;
  margin-bottom: 1em;
}

input {
  background: none;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  border: none;
  width: 100%;
}

input::placeholder,
i {
  color: var(--gray);
}

.cards {
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