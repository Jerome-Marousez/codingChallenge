<template>

  <div>
    <div>{{ uuid }}</div>
    <i class="fas fa-battery-three-quarters" />
  </div>


</template>


<script>
import { v4 as uuid } from "uuid"

export default {
  name: "TestComponent",

  data() {
    return {
      uuid: uuid(),
    }
  },

}
</script>


<style scoped>

</style>