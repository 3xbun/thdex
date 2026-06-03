<template>
  <div class="addCard">
    <img :src="props.card.Image" alt="" />
    <div v-if="card" class="title">
      <h1>{{ props.card.Title }}</h1>
      <h4>
        <img
          src="https://cdn.countryflags.com/thumbs/thailand/flag-400.png"
          alt=""
          class="flag"
        />
        {{ props.card.setName }}
      </h4>
    </div>
    <div class="menus">
      <div class="owned">
        <div class="btn" @click="addCard(false)">-</div>
        <div v-if="amt == 0" class="btn">ยังไม่มี</div>
        <div v-else class="btn">มีแล้ว {{ amt }} ใบ</div>
        <div class="btn" @click="addCard(true)">+</div>
      </div>
      <!-- <a :href="tcgTH.link" target="_blank">
        <div class="tcg-th item">
          <img
            src="https://www.tcgthailand.com/_nuxt/img/TCG.9f64531.png"
            alt="tcgth-logo"
          />
          <div class="store">
            <p>TCG Thailand</p>
          </div>
          <p v-if="tcgTH.price_low">
            ฿{{
              tcgTH.price_low.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </p>
          <p v-else>-</p>
        </div>
      </a> -->
    </div>
    <hr />
    <div class="informations">
      <div class="item">
        <i class="fa-thin fa-pen-swirl"></i>
        <div class="text">
          <p>Artist</p>
          <p v-if="card.artist">{{ props.card.artist }}</p>
          <p v-else>n/a</p>
        </div>
      </div>
      <div class="item">
        <i class="fa-thin fa-percent"></i>
        <div class="text">
          <p>Rarity</p>
          <p v-if="tcgTH.rarity">{{ tcgTH.rarity }}</p>
          <p v-else>n/a</p>
        </div>
      </div>
      <div class="item">
        <i class="fa-thin fa-hashtag"></i>
        <div class="text">
          <p>National Number</p>
          <p>{{ props.card.natNo }}</p>
        </div>
        <router-link :to="'/pokemon/' + props.card.natNo">
          <i class="fa-thin fa-chevron-right"></i>
        </router-link>
      </div>
      <div class="item">
        <i class="fa-thin fa-signature"></i>
        <div class="text">
          <p>Identifier</p>
          {{ props.card.setCode }} {{ props.card.cardNo }}
        </div>
      </div>
    </div>
    <hr v-if="tcgTH.updated_at" />
    <p v-if="tcgTH.updated_at">
      ราคาการ์ดอัพเดทล่าสุดเมื่อ {{ tcgTH.updated_at }}
    </p>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";

const Collections = inject("Collections");

const tcgTH = ref({
  link: "#",
  price: "",
});

const props = defineProps({
  card: Object,
});

const amt = ref(0);
const isNew = ref(true);

const addCard = (isAdd) => {
  if (isNew.value) {
    Collections.value.push({
      cardID: `${props.card.setCode} ${props.card.cardNo}`,
      natNo: props.card.natNo,
      img: props.card.Image,
      link: props.card.Link,
      amt: 0,
    });

    isNew.value = false;
  }

  if (isAdd) {
    amt.value += 1;
  } else {
    if (amt.value > 0) {
      amt.value -= 1;
    }
  }

  Collections.value.filter(
    (card) => card.cardID == `${props.card.setCode} ${props.card.cardNo}`,
  )[0].amt = amt.value;

  if (amt.value == 0) {
    Collections.value = Collections.value.filter(
      (card) => card.cardID != `${props.card.setCode} ${props.card.cardNo}`,
    );
    isNew.value = true;
  }

  localStorage.setItem("Collections", JSON.stringify(Collections.value));
};

onMounted(() => {
  // Check if card is new
  if (
    Collections.value.filter(
      (card) => card.cardID == `${props.card.setCode} ${props.card.cardNo}`,
    )[0]
  ) {
    amt.value = Collections.value.filter(
      (card) => card.cardID == `${props.card.setCode} ${props.card.cardNo}`,
    )[0].amt;
    isNew.value = false;
  }
});
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
  justify-content: center;
  font-weight: normal;
  color: var(--gray);
  display: flex;
  align-items: center;
  gap: 0.5em;
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
  gap: 0.5em;
}

.owned .btn {
  flex-basis: 20%;
  background-color: var(--dark);
  text-align: center;
  padding: 0.5em;
  border-radius: 0.5em;
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
  display: flex;
  align-items: center;
  gap: 1em;
  width: 100%;
  background-color: var(--dark);
  padding: 0.5em 1em;
  border-radius: 0.5em;
}

.item i {
  font-size: 2em;
  width: 1em;
  text-align: center;
}

.item p:first-child {
  color: var(--gray);
}

.text {
  width: 100%;
}

.fa-chevron-right {
  color: var(--gray);
  font-size: 1.5em !important;
}

.tcg-th {
  display: flex;
  margin-top: 1em;
  height: fit-content;
  padding: 1em;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
}

.tcg-th img {
  height: 2em;
  width: auto;
}

.store {
  width: 100%;
}

.store p {
  color: var(--white) !important;
}
</style>
