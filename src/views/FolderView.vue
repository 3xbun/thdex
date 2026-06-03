<template>
  <h1>แฟ้มสะสม</h1>
  <ul class="cards">
    <li
      v-for="card in Collections"
      :key="card.cardID"
      @click="selectCard(card.link)"
    >
      <img :src="card.img" alt="" srcset="" />
    </li>
  </ul>

  <div class="wrapper" v-if="isAdd">
    <i class="fa-duotone fa-solid fa-circle-xmark" @click="isAdd = false"></i>
    <AddCard :card="card" />
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import AddCard from "../components/AddCard.vue";
import axios from "axios";

const isAdd = ref(false);
const card = ref({});
const amt = ref(0);

const Collections = inject("Collections");

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
  top: 0.5em;
  font-size: 2em;
  opacity: 0.8;
  z-index: 99;
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
}

img {
  width: 100%;
}
</style>
