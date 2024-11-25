<template>
  <div class="addCard">
    <img :src="card.image" alt="">
    <div class="title">
      <h1>{{ card.name }}</h1>
      <h4>
        <img src="https://cdn.countryflags.com/thumbs/thailand/flag-400.png" alt="" class="flag"> {{ card.set_name }}
      </h4>
    </div>
    <div class="menus">
      <div class="owned">
        <div class="btn" @click="addCard(false)">-</div>
        <div v-if="amt == 0" class="btn">ยังไม่มี</div>
        <div v-else class="btn">มีแล้ว {{ amt }} ใบ</div>
        <div class="btn" @click="addCard(true)">+</div>
      </div>
    </div>
    <hr>
    <div class="informations">
      <div class="item">
        <p>Artist</p>
        <p>{{ card.illustrator }}</p>
      </div>
      <div class="item">
        <p>National Number</p>
        <p>{{ card.national_no }}</p>
      </div>
      <div class="item">
        <p>Identifier</p>
        <p>{{ card.set_no }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref, onMounted } from 'vue';
import Data from '../assets/Cards.json';

const Collections = inject('Collections')

const props = defineProps({
  cardID: String
})

const card = computed(
  () => Data.Cards.filter(card => card.id == props.cardID)[0]
)

const amt = ref(0)
const isNew = ref(true)

const addCard = (isAdd) => {

  if (isNew.value) {
    Collections.value.push({
      cardID: props.cardID,
      amt: 0
    })

    isNew.value = false
  }

  if (isAdd) {
    amt.value += 1
  } else {
    if (amt.value > 0) {
      amt.value -= 1
    }
  }

  Collections.value.filter(card => card.cardID == props.cardID)[0].amt = amt.value

  if (amt.value == 0) {
    Collections.value = Collections.value.filter(card => card.cardID != props.cardID)
  }

  localStorage.setItem("Collections", JSON.stringify(Collections.value))
}

onMounted(() => {
  // Check if card is new
  if (Collections.value.filter(card => card.cardID == props.cardID)[0]) {
    amt.value = Collections.value.filter(card => card.cardID == props.cardID)[0].amt
    isNew.value = false
  }
})

</script>

<style scoped>
.addCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  padding-top: 2em;
  padding-bottom: 15vh;
  background-color: rgba(32, 33, 36, 0.85);
  border-radius: 2em;
  backdrop-filter: blur(1em);
}

.flag {
  height: 1em;
  width: auto;
  border-radius: 2px;
}

img {
  width: 90%;
}

hr {
  width: 90%;
  border: 1px solid var(--dark);
}

h4 {
  font-weight: normal;
  color: var(--gray);
  display: flex;
  align-items: center;
  gap: .5em;
}

.title {
  text-align: center;
}

.menus {
  width: 90%;
}

.owned {
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-size: 1.5em;
  gap: .5em;
}

.owned .btn {
  flex-basis: 20%;
  background-color: var(--dark);
  text-align: center;
  padding: .5em;
  border-radius: .5em;
}

.btn:nth-child(2) {
  flex-basis: 60%;
}

.informations {
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.item {
  width: 100%;
  background-color: var(--dark);
  padding: .5em;
  border-radius: .5em;
}

.item p:first-child {
  color: var(--gray);
}
</style>