<template>

  <div class="countries-page">

    <Header>
      <template v-slot:title>
        <h1>Where in the World?</h1>
      </template>

      <template v-slot:options>
        <ThemeToggle />
      </template>
    </Header>

    <ToolBar>
      <template v-slot:default>
        <div v-if="store.countries.length" class="input-group">
          <div v-if="!searchCountry.length" class="icon">
            <i class="fa fa-magnifying-glass" />
          </div>
          <input type="text" class="input" placeholder="Search for a country..." v-model="searchCountry" :style="searchCountry.length ? 'padding-left: 2em;' : 'padding-left: 4.5em;'">
        </div>

        <Select v-if="store.countries.length" placeholder="Filter by Region" v-model="selectedRegion" :options="regions"></Select>
      </template>
    </ToolBar>

    <div class="countries-list">
      <div v-for="(country, id) in filteredCountries" :key="id">
        <Card :country="country"/>
      </div>

      <div v-if="!filteredCountries.length && store.countries.length" class="no-match">
        No match found
      </div>
    </div>

    <teleport to="#loading">
      <Loading v-if="!store.countries.length" />
    </teleport>

  </div>

</template>

<script>
import ThemeToggle from "@/components/ThemeToggle";
import Card from "@/components/Card";
import Header from "@/components/Header";
import ToolBar from "@/components/ToolBar";
import axios from "axios";
import { useGlobalStateStore } from "@/stores/globalState";
import Select from "@/components/Select";
import Loading from "@/components/Loading";

export default {
  name: 'Countries',
  components: {
    ThemeToggle,
    Card,
    Header,
    ToolBar,
    Select,
    Loading,
  },

  data(){
    return {
      store: useGlobalStateStore(),
      searchCountry: '',
      selectedRegion: null,
    }
  },

  computed: {
    regions() {
      let regionsSet = new Set()
      this.store.countries.forEach(country => regionsSet.add(country.region))
      return regionsSet
    },

    filteredCountries() {
      let filteredCountries = this.store.countries
      if(this.searchCountry.length) filteredCountries = filteredCountries.filter(country => country.name.common.toString().toLowerCase().includes(this.searchCountry))
      if(this.selectedRegion) filteredCountries = filteredCountries.filter(country => country.region === this.selectedRegion)
      return filteredCountries
    },

  },

  methods: {
    getCountries(url) {
      return axios.get(url).then(res => this.sortCountries(res.data))
    },

    sortCountries(countries) {
      const countriesSorted = countries.sort((a, b) => {
          if(a.region === b.region) {
            return a.name.common < b.name.common ? -1 : 1
          } else {
            return a.region < b.region ? -1 : 1
          }
      })
      this.store.setCountries(countriesSorted)
    },

  },

  created() {
    if(!this.store.countries.length){
      this.getCountries(this.store.url)
    }
  },

}
</script>

<style scoped>
.countries-page {
  max-width: var(--desktop-width);
  margin-inline: auto;
}
.countries-list {
  position: relative;
  padding: 2em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 4em;
  row-gap: 4em;
  justify-content: center;
  z-index: 0;
}
.input-group {
  position: relative;
}
.icon {
  position: absolute;
  z-index: 2;
  left: 2em;
  top: 50%;
  transform: translateY(-50%);
}
.no-match {
  position: fixed;
  top: 50%;
  transform: translateY(50%);
}
</style>