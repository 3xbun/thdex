<template>
  <nav>
    <ul>
      <li @click="select('collection')" :class="{ active: activePage == 'collection' }">
        <i class="fa-duotone fa-solid fa-cards-blank"></i>
        คอลเลคชั่น
      </li>
      <li @click="select('expansion')" :class="{ active: activePage == 'expansion' }">
        <i class="fa-duotone fa-solid fa-boxes-stacked"></i>
        ชุดการ์ด
      </li>
      <li @click="select('folder')" :class="{ active: activePage == 'folder' }">
        <i class="fa-duotone fa-solid fa-folders"></i>
        แฟ้ม
      </li>
      <li @click="select('search')" :class="{ active: activePage == 'search' }">
        <i class="fa-duotone fa-light fa-magnifying-glass"></i>
        ค้นหา
      </li>
      <li @click="select('sponsor')" :class="{ active: activePage == 'sponsor' }">
        <i class="fa-solid fa-heart"></i>
        สนับสนุน
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const activePage = ref('')

const select = (page) => {
  activePage.value = page
  router.push('/' + page)
}

onMounted(() => {
  activePage.value = window.location.pathname.substring(1)
  activePage.value == '' ? activePage.value = 'collection' : activePage.value = activePage.value
})
</script>

<style scoped>
nav {
  padding: .5em;
  width: 100vw;
  background-color: var(--dark);
  bottom: 0;
  position: fixed;
  padding-bottom: 2em;
  box-shadow: 0px -10px 15px -3px rgba(0, 0, 0, 0.1);
}

ul {
  margin: auto;
  max-width: 600px;
  display: flex;
  justify-content: space-around;
}

li {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  list-style: none;
  font-size: .5em;
  color: var(--gray);
  gap: .5em;
}

i {
  font-size: 3em;
}

.fa-heart {
  color: #e3350d;
}

.active {
  color: var(--secondary);
}
</style>