<template>
  <div>
    <h1>การ์ดของ{{ pokemonName }}</h1>

    <img
      src="https://assets-v2.lottiefiles.com/a/ae47ca2c-bd64-11ef-8a23-cfbc45d0a788/HgjuHFgI6d.gif"
      alt="loading"
      class="loading"
      v-if="isLoading"
    />

    <ul class="cards">
      <li v-for="card in Cards" :key="card.link" @click="selectCard(card.link)">
        <img :src="card.img" :alt="card.img" />
      </li>
    </ul>

    <div class="wrapper" v-if="isAdd">
      <i class="fa-duotone fa-solid fa-circle-xmark" @click="isAdd = false"></i>
      <AddCard :card="card" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const national_no = route.params.national_no;

import AddCard from "../components/AddCard.vue";
import { Pokemons } from "../assets/Pokemons.json";
import { computed, ref, onMounted } from "vue";
import axios from "axios";

const isAdd = ref(false);
const card = ref("");

const Cards = ref([]);
const isLoading = ref(true);

const pokemonName = computed(() => {
  return Pokemons.find((pokemon) => pokemon.nat_no == national_no).name;
});

const selectCard = (link) => {
  axios
    .post("https://n8n.3xbun.com/webhook/card", {
      link: link,
    })
    .then((res) => {
      card.value = res.data[0];
      card.value.Link = link;
      isAdd.value = true;
    });
};

onMounted(() => {
  axios
    .post("https://n8n.3xbun.com/webhook/cards/search", {
      keyword: pokemonName.value,
    })
    .then((res) => {
      Cards.value = res.data;
      isLoading.value = false;
    });
});
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

.loading {
  width: 15%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fa-circle-xmark {
  position: absolute;
  right: 1em;
  top: 0.5em;
  font-size: 2em;
  opacity: 0.8;
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
