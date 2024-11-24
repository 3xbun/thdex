<template>
  <div class="searchBar">
    <i class="fa-light fa-magnifying-glass"></i>
    <input type="text" placeholder="ค้นหาด้วยชื่อโปเกมอน" v-model="searchText">
  </div>

  <ul class="pokemons">
    <li v-for="pokemon in Pokemon" :key="pokemon.nat_no" class="pokemon">
      <img :src="pokemon.image" alt="">
      <p>{{ pokemon.name }}</p>
      <p class="nat_no">#{{ pokemon.nat_no }}</p>
    </li>
  </ul>
  <!-- </div> -->
</template>

<script setup>
import { computed, ref } from 'vue';
import Data from '../assets/Pokemons.json';

const searchText = ref("")

const Pokemon = computed(
  () => Data.Pokemons.filter(pokemon => pokemon.name.startsWith(searchText.value))
)
</script>

<style scoped>
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

.pokemons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
}

.pokemon {
  width: 30%;
  background-color: var(--dark);
  text-align: center;
  border-radius: .5em;
}

.nat_no {
  color: var(--gray);
}
</style>