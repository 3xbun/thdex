<template>
  <div class="searchBar">
    <div class="searchItem">
      <i class="fa-light fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="ค้นหาด้วยชื่อโปเกมอน"
        v-model="searchText"
        @keydown.enter="searchCards()"
      />
    </div>

    <p class="btn" @click="searchCards()">ค้นหา</p>
  </div>

  <!-- {{ Cards }} -->
  <img
    src="https://assets-v2.lottiefiles.com/a/ae47ca2c-bd64-11ef-8a23-cfbc45d0a788/HgjuHFgI6d.gif"
    alt="loading"
    class="loading"
    v-if="isLoading"
  />
  <ul
    class="cards"
    v-if="Cards.length > 0 && searchText != '' && isLoading == false"
  >
    <li
      v-for="card in Cards"
      :key="card.link"
      @click="selectCard(card.link, card.img)"
    >
      <img
        v-show="isLoaded"
        :src="card.img"
        :alt="card.link"
        @load="onImageLoaded"
      />
      <Skeleton
        v-if="!isLoaded"
        containerClass="skeleton"
        childClass="skeleton-item"
      />
    </li>
  </ul>

  <div class="wrapper" v-if="isAdd">
    <i class="fa-duotone fa-solid fa-circle-xmark" @click="isAdd = false"></i>
    <AddCard :card="card" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
// import Data from "../assets/Cards.json";
import AddCard from "../components/AddCard.vue";
import axios from "axios";

const Cards = ref([]);
const isLoaded = ref(false);
const isLoading = ref(false);

const card = ref({});

const onImageLoaded = () => {
  isLoaded.value = true;
};

const isAdd = ref(false);
const selectedCardLink = ref("");
const selectedCardImg = ref("");

const searchText = ref("");

const selectCard = (link, img) => {
  axios
    .post("https://n8n.3xbun.com/webhook/card", {
      link: link,
    })
    .then((res) => {
      card.value = res.data[0];
      isAdd.value = true;
    });
};

const searchCards = () => {
  isLoading.value = true;
  Cards.value = [];
  axios
    .post("https://n8n.3xbun.com/webhook/cards/search", {
      keyword: searchText.value,
    })
    .then((res) => {
      Cards.value = res.data;
      isLoading.value = false;
    });
};
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
  top: 0.5em;
  font-size: 2em;
  opacity: 0.8;
  z-index: 99;
}

.loading {
  width: 15%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.searchBar {
  display: flex;
  gap: 0.5em;
  width: 100%;
  margin-bottom: 1em;
  align-items: center;
}

.searchItem {
  background-color: var(--dark);
  border-radius: 0.5em;
  padding: 0.5em;
  display: flex;
  gap: 0.5em;
  align-items: center;
  width: 100%;
}

p.btn {
  width: 10%;
  background-color: var(--dark);
  border-radius: 0.5em;
  padding: 0.5em;
  text-align: center;
  cursor: pointer;
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
