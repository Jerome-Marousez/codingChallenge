<template>

  <div class="loading-container">
    <div class="loading-text">Loading...</div>
  </div>

</template>

<script>
export default {
  name: "Loading",

}
</script>

<style scoped>
.loading-container {
  --size: 4em;

  position: absolute;
  inset: 0 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  font-size: 1.5em;
}

.loading-text {
  z-index: 2001;
  color: var(--text-color);
}

</style>