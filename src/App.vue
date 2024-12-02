<template>
  <div class="container">
    <Header />
    <RouterView />
  </div>
  <NavBar />
</template>

<script setup>
import { computed, onMounted, provide, ref } from 'vue';
import Header from './components/Header.vue';
import NavBar from './components/NavBar.vue';

import { Cards } from './assets/Cards.json';
import { Pokemons } from './assets/Pokemons.json';
import axios from 'axios';

const Collections = ref([])
const stats = computed(() => {
  const stat = {
    caughted: 0,
    totalPkm: Pokemons.length - 1,
    ownedCard: 0,
    value: 0
  }

  Collections.value.forEach(item => {
    stat.value += item.price ? (item.price * item.amt) : 0;
    stat.ownedCard += item.amt
  });

  const pokemons = []

  Collections.value.forEach(item => {
    const nat_no = Cards.filter(card => card.id == item.cardID)[0].national_no
    if (pokemons.includes(nat_no)) {
      null
    } else {
      pokemons.push(nat_no)
    }
  })

  stat.caughted = pokemons.length
  console.log(stat);

  return stat
})

provide('Collections', Collections)
provide('Stats', stats)

onMounted(() => {
  const col = localStorage.getItem("Collections")
  const updateCol = []

  Collections.value = JSON.parse(col)

  if (col) {
    JSON.parse(col).forEach(item => {
      const card = Cards.filter(card => card.id == item.cardID)[0]
      const link = `https://api.tcgthailand.com/api/v1/home/product_popular?page=1&search=${card.name}&filter_product=new&filter_category[]=%E0%B9%82%E0%B8%9B%E0%B9%80%E0%B8%81%E0%B8%A1%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%94%E0%B8%94%E0%B8%B4%E0%B9%89%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%94%E0%B9%80%E0%B8%81%E0%B8%A1&filter_set_name=all&filter_rarity=all&filter_accessory=all&filter_set_card=all&filter_buy_list=false&filter_sell_list=true`

      axios.get(link).then(res => {
        const data = res.data.order_item_data.data
        const tcgCard = data.filter(item => item.card_number == card.set_no)[0]

        if (tcgCard) {
          item.cardTCGID = tcgCard.set_code_card_number || "n/a"
          item.price = tcgCard.price_low || 0
        } else {
          item.cardTCGID = "n/a"
          item.price = 0
        }

        updateCol.push(item)
      })
    })

    Collections.value = updateCol
  } else {
    localStorage.setItem("Collections", JSON.stringify(Collections.value))
  }
})
</script>

<style scoped></style>