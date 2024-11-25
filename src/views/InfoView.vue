<template>
  <div>
    <h1>Changelog</h1>
    <div id="changelog"></div>
    <hr>
    <p>
      © 2024 Bunnasorn Kaewsiri, All rights reserved.
    </p>
    <hr>
    <p>
      ข้อความและรูปภาพที่เกี่ยวข้องกับ Pokémon Trading Card Game รวมไปถึงรูปภาพการ์ด เป็นลิขสิทธิ์ของ The Pokémon
      Company Internaltional, inc <br>
      เว็บไซต์ THDex เป็นเว็บไซต์ที่ถูกจัดทำโดยบุคคลที่ 3 ไม่ได้จัดทำ ได้รับการรับรอง สนับสนุน หรือมีความเกี่ยวข้องกับ
      Nintendo, Game Freak, Niantic, Wizards
      of the Coast หรือ The Pokémon Company แต่อย่างใด
    </p>
  </div>
</template>

<script setup>
import axios from 'axios';
import { marked } from 'marked';
import { onMounted, ref } from 'vue';

const changelog = ref('')

onMounted(() => {
  axios.get("../../CHANGELOG.md").then(res => {
    console.log(res.data)

    changelog.value = res.data
    document.getElementById("changelog").innerHTML = marked.parse(res.data)
  })
})
</script>

<style scoped>
div {
  text-align: center;
  color: var(--gray);
}

hr {
  margin: 1em;
  width: 90%;
  border: 1px solid var(--dark);
}

#changelog {
  text-align: left
}
</style>