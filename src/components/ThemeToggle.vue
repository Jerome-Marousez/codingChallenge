<template>

  <button
      @click="store.setTheme(!store.isDarkMode)"
      :class="{ active : store.isDarkMode}"
  >
    <div v-if="store.isDarkMode" class="theme">
      <i class="fas fa-moon"/>
      <span v-if="viewportWidth > 700">Light Mode</span>
    </div>

    <div v-else class="theme">
      <i class="far fa-moon"/>
      <span v-if="viewportWidth > 700">Dark Mode</span>
    </div>
  </button>

</template>


<script>
import { useGlobalStateStore } from "@/stores/globalState";

export default {
  name: "ThemeToggle",

  data() {
    return {
      store: useGlobalStateStore(),
      viewportWidth: window.innerWidth,
    }
  },

  methods: {
    onResize() {
      this.viewportWidth = window.innerWidth
    }
  },

  mounted(){
    this.store.setTheme(JSON.parse(localStorage.getItem('theme')))
    window.addEventListener('resize', this.onResize)
  },

  destroyed(){
    window.removeEventListener('resize', this.onResize)
  },

}
</script>


<style scoped>
.theme {
  display: flex;
  column-gap: .5em;
}
</style>