<template>

  <div class="header">
    <slot name="title"></slot>
    <slot name="options"></slot>
  </div>

</template>


<script>
export default {
  name: "Header",

}
</script>


<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-inline: 2em;
  padding-block: .5em;
}
.header::before {
  content: "";
  position: absolute;
  box-shadow: 0 .3em .3em rgba(0, 0, 0, .3);
  background-color: var(--bg-primary);
  width: 100%;
  left: 0;
  top: 0;
  height: 5em;
  z-index: -1;
}
</style>