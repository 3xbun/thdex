<template>
  <header>
    <h1>
      <i>
        <span class="red">T</span>
        <span class="white">h</span>
        <span class="blue">D</span>ex
      </i>
      <span class="tag">ALPHA-1.0.0</span>
    </h1>

    <RouterLink to="/info">
      <i class="fa-light fa-circle-info"></i>
    </RouterLink>
  </header>
</template>

<script setup>

</script>

<style scoped>
.tag {
  position: absolute;
  top: 2.9rem;
  left: 5.5rem;
  padding: .2rem .2rem .1rem;
  border-radius: .2rem;
  background-color: #e40a1f;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
  color: #fff;
  font-size: .35rem;
  line-height: .7rem;
  letter-spacing: .5px;

  transform: rotate(-10deg);
}

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