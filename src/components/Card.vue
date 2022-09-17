<template>

  <section class="card" aria-labelledby="#country-name" @click="selectCountry">

    <div class="flag">
      <img :src="country.flags.svg" :alt="`${country.name}'s flag`">
    </div>

    <div class="summary">
      <h2 id="country-name">{{ country.name.common }}</h2>
      <div>
        <span class="title">Population: </span>
        <span>{{ country.population.toLocaleString('en-US') }}</span>
      </div>
      <div>
        <span class="title">Region: </span>
        <span>{{ country.region }}</span>
      </div>
      <div>
        <span class="title">Capital: </span>
        <span v-if="country.capital">{{ country.capital[0] }}</span>
        <span v-else class="disabled">No capital</span>
      </div>
    </div>

  </section>

</template>


<script>
export default {
  name: "Card",

  props: {
    country: {
      type: Object,
      required: true
    }
  },

  methods: {
    selectCountry(){
      this.$router.push({ name:'DetailView', params: {code: this.country.cca3} })
    }
  },

}
</script>


<style scoped>
.card {
  display: flex;
  flex-direction: column;
  max-width: 270px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 .5em .5em rgba(0, 0, 0, .1);
}
.card:hover {
  box-shadow: none;
}
.flag {
  width: 270px;
  height: 150px;
  overflow: hidden;
  position: relative;
}
.flag > img {
  width: 110%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.title {
  font-weight: 600;
}
.summary {
  background-color: var(--bg-secondary);
  display: flex;
  flex-direction: column;
  row-gap: .5em;
  padding-inline: 1.5em;
  padding-block: 2em;
  height: 195px;
}
</style>