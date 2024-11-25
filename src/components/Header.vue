<template>
  <header>
    <h1>
      <i>
        <span class="red">T</span>
        <span class="white">h</span>
        <span class="blue">D</span>ex
      </i>
    </h1>

    <RouterLink to="/info">
      <i class="fa-light fa-circle-info"></i>
    </RouterLink>
  </header>
</template>

<script setup>

</script>

<style scoped>
.red {
  color: #e72c2f;
}

.white {
  color: #fcfcfc;
}

.blue {
  color: #3f59a8;
}

header {
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1em;
}

.fa-circle-info {
  font-size: 1.5em;
  color: var(--gray)
}
</style>