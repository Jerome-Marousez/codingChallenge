<template>

  <div class="tool-bar">
    <slot></slot>
  </div>

</template>


<script>
export default {
  name: "ToolBar",

}
</script>


<style scoped>
.tool-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-block: 1em;
  padding-inline: 2em;
  row-gap: 2em;
}
</style>