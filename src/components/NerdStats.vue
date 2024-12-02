<template>
  <div class="stats">
    <div class="text">
      <h3>โปเกมอนที่จับได้</h3>
      <p>{{ stats.caughted }} จาก {{ stats.totalPkm }}</p>
      <h3>การ์ดที่มี</h3>
      <p>{{ stats.ownedCard }}</p>
      <h3>ราคารวม</h3>
      <p>฿{{ stats.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</p>
    </div>

    <div class="charts">
      <div class="percent">{{ (percent * 100).toFixed(2) }}%</div>
      <table class="charts-css pie">
        <tbody>
          <tr>
            <td :style="{
              '--start': 0.0, '--end': percent, '--color': 'white'
            }"></td>
          </tr>
        </tbody>
      </table>

      <table class="charts-css pie black-circle">
        <tbody>
          <tr>
            <td style="
            --start: 0.0; 
            --end: 100; 
            "></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue';
import { ref, computed } from 'vue';
import Data from '../assets/Pokemons.json';
import { Cards } from '../assets/Cards.json';

const stats = ref({
  caughted: 0,
  totalPkm: Data.Pokemons.length - 1,
  ownedCard: 0,
  value: 0
})

const percent = computed(() =>
  (stats.value.caughted / stats.value.totalPkm)
)

onMounted(() => {

  const Collections = inject('Collections')
  console.log(Collections.value);

  Collections.value.forEach(item => {
    stats.value.value += item.price ? (item.price * item.amt) : 0;
    stats.value.ownedCard += item.amt
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

  stats.value.caughted = pokemons.length
})
</script>

<style scoped>
.stats {
  margin-bottom: 1em;
  background-color: var(--dark);
  padding: 1em;
  border-radius: .5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  width: 60%;
}

.text p {
  margin-bottom: 1em;
}

.text p:last-child {
  margin: 0;
}

.charts {
  width: 40%;
  height: fit-content;
  position: relative;
}

.charts-css {
  --chart-bg-color: rgba(143, 144, 147, .1);
  border-radius: 2em;
}

.pie {
  position: relative;
  width: 100%;
}

.black-circle {
  --color: var(--dark);
  position: absolute;
  width: 70%;
  top: 15%;
  left: 15%;
}

.percent {
  position: absolute;
  width: 100%;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 99;
  justify-content: center;
}
</style>