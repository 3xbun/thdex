<template>
  <div class="searchBar">
    <i class="fa-light fa-magnifying-glass"></i>
    <input type="text" placeholder="ค้นหาด้วยชื่อโปเกมอน" v-model="searchText">
  </div>

  <NerdStats />
  <ul class="pokemons">
    <router-link v-for="pokemon in Pokemon" :key="pokemon.nat_no" :to="'/pokemon/' + pokemon.nat_no">
      <li class="pokemon">
        <img loading="lazy" v-if="collectedPokemon.includes(String(pokemon.nat_no))" class="unlock" :src="pokemon.image"
          alt="">
        <img loading="lazy" v-else class="locked" :src="pokemon.image" alt="">
        <p>{{ pokemon.name }}</p>
        <p class="nat_no">#{{ pokemon.nat_no }}</p>
      </li>
    </router-link>
  </ul>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import Data from '../assets/Pokemons.json';
import { Cards } from '../assets/Cards.json';

import NerdStats from '../components/NerdStats.vue';

const Collections = inject("Collections")
const collectedPokemon = computed(() => {

  const pokemons = []

  Collections.value.forEach(item => {
    const nat_no = Cards.filter(card => card.id == item.cardID)[0].national_no
    if (pokemons.includes(nat_no)) {
      null
    } else {
      pokemons.push(nat_no)
    }
  })

  console.log(pokemons);

  return pokemons
})

const searchText = ref("")

const Pokemon = computed(
  () => Data.Pokemons.filter(pokemon => pokemon.name.startsWith(searchText.value))
)
</script>

<style scoped>
router-link {
  width: 30%;
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

.pokemons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
}

.pokemon {
  /* width: 30%; */
  background-color: var(--dark);
  text-align: center;
  border-radius: .5em;
  padding-bottom: 1em;
}

.nat_no {
  color: var(--gray);
}

.locked {
  filter: grayscale(100%) brightness(10%) blur(3px);
}

.unlock {
  filter: none;
}
</style>