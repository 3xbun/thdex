<template>
  <div>
    <ul class="expansions">
      {{
        setCode
      }}
      <li v-for="exp in Expansions" :key="exp.expansionCode">
        <router-link :to="'/expansion/' + exp.expansionCode">
          <div class="expImage">
            <img :src="exp.expansionImage" alt="" />
          </div>
          <div class="expTitle">
            <p>{{ exp.expansionTitle }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { Expansions } from "../assets/Expansions.json";

import { useRoute } from "vue-router";
import axios from "axios";
const route = useRoute();
const setCode = route.params.setCode;

const Cards = ref([]);
const isLoading = ref(true);
const isAdd = ref(false);
const card = ref("");

onMounted(() => {
  axios
    .post("https://n8n.3xbun.com/webhook/cards/search", {
      keyword: setCode,
      type: "expansions",
    })
    .then((res) => {
      Cards.value = res.data;
      isLoading.value = false;
    });
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

.expansions {
  margin-top: 1em;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
}

.expansions li {
  align-items: flex-start;
  text-align: center;
}

.expImage {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 0.5em;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5em;
}

.expImage img {
  width: 120%;
}

.expHeader {
  width: 120%;
  position: absolute;
  top: -120%;
  left: -10%;
  filter: brightness(20%);
  z-index: -1;
}

.loading {
  width: 15%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
</style>
