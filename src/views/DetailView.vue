<template>

  <div class="detail-page">

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
        <button @click="$router.push('/')" class="btn-with-icon">
          <i class="fas fa-long-arrow-alt-left"/>
          <span>Back</span>
        </button>
      </template>
    </ToolBar>

    <div v-if="country" class="detail-card">

      <div class="section flag">
        <img :src="country.flags.svg" :alt="`${country.name}'s flag`">
      </div>

      <div class="section summary-card">
        <h1>{{ country.name.common }}</h1>
        <div class="summary">

          <div class="summary-detail">
            <div>
              <span class="title">Native Name: </span>
              <span>{{ nativeName }}</span>
            </div>
            <div>
              <span class="title">Population: </span>
              <span>{{ country.population.toLocaleString('en-US') }}</span>
            </div>
            <div>
              <span class="title">Region: </span>
              <span>{{ country.region }}</span>
            </div>
            <div>
              <span class="title">Sub Region: </span>
              <span v-if="country.subregion">{{ country.subregion }}</span>
              <span v-else class="disabled">No subregion</span>
            </div>
            <div>
              <span class="title">Capital: </span>
              <span v-if="country.capital">{{ country.capital[0] }}</span>
              <span v-else class="disabled">No capital</span>
            </div>
          </div>

          <div class="summary-detail">
            <div>
              <span class="title">Top Level Domain: </span>
              <span v-if="country.tld">{{ country.tld[0] }}</span>
              <span v-else class="disabled">Not tld</span>
            </div>
            <div>
              <span class="title">Currencies: </span>
              <span v-if="country.currencies">{{ currenciesList.join(', ') }}</span>
              <span v-else class="disabled">No currencies</span>
            </div>
            <div>
              <span class="title">Languages: </span>
              <span v-if="country.languages">{{ languagesList.join(', ') }}</span>
              <span v-else class="disabled">No languages</span>
            </div>
          </div>

        </div>

        <div class="borders">
          <span class="title border-title">Border Countr{{ country.borders && country.borders.length > 1 ? 'ies' : 'y' }}: </span>
          <div v-if="!borderingCountries.length">
            <span>No bordering countries</span>
          </div>
          <div v-else class="borders-list">
            <template v-for="(country, id) in borderingCountries">
              <button @click="selectCountry(country.cca3)" class="btn-border">{{ country.name.common }}</button>
            </template>
          </div>
        </div>

      </div>

    </div>


    <teleport to="#loading">
      <Loading v-if="!store.countries.length" />
    </teleport>


  </div>

</template>


<script>
import { useGlobalStateStore } from "@/stores/globalState";
import axios from "axios";
import ThemeToggle from "@/components/ThemeToggle";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import ToolBar from "@/components/ToolBar";

export default {
  name: "DetailView",

  components: {
    ThemeToggle,
    Header,
    Loading,
    ToolBar,
  },

  data(){
    return {
      country: null,
      borderingCountries: [],
      store: useGlobalStateStore(),
    }
  },

  computed: {
    currenciesList() {
      return Object.values(this.country.currencies).map(currency => currency.name)
    },

    languagesList() {
      return Object.values(this.country.languages)
    },

    nativeName() {
      if(this.country.altSpellings && this.country.altSpellings[1] && this.country.altSpellings[1].length) {
        return this.country.altSpellings[1]
      } else {
        return this.country.name.common
      }
    },

  },

  methods: {
    getCountries(url) {
      return axios.get(url).then(res => this.store.setCountries(res.data))
    },

    selectCountry(code) {
      this.$router.push({ name:'DetailView', params: {code: code} })
    },

    getBorderingCountries() {
      if(!this.country.borders) return

      this.borderingCountries = []
      const countries = this.country.borders
      countries.forEach(country => {
        this.borderingCountries.push(this.store.countries.filter(countryCandidate => countryCandidate.cca3 === country)[0])
      })
    },

  },

  async mounted() {
    if(!this.store.countries.length) {
      await this.getCountries(this.store.url)
    }
    this.country = this.store.countries.filter(country => country.cca3 === this.$route.params.code)[0]
    this.getBorderingCountries()
  },

}
</script>


<style scoped>
.detail-page {
  max-width: var(--desktop-width);
  margin-inline: auto;
}
.section {
  flex: 1;
  padding: 2em;
}
.detail-card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.summary {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 1.5em;
  min-width: 305px;
  width: 100%;
}
.summary-detail {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-width: 50%;
  row-gap: .6em;
}
.flag {
  min-width: clamp(350px, 50%, 100%);
}
.flag > img {
  width: 100%;
  min-width: 305px;
  box-shadow: 0 0 .5em .5em rgba(0, 0, 0, .1);
}
.title {
  font-weight: 600;
}
.border-title {
  white-space: nowrap;
}
.borders {
  margin-top: 4em;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: .5em;
  row-gap: .5em;
}
.borders-list {
  min-width: 100px;
}
</style>