import { defineStore } from "pinia";

export const useGlobalStateStore = defineStore("globalState", {
    state: () => {
        return {
            isDarkMode: false,
            countries: [],
            url: 'https://restcountries.com/v3.1/all',
        }
    },

    actions: {
        setTheme(payload) {
            this.isDarkMode = payload
            document.documentElement.className = this.isDarkMode ? 'dark' : 'light'
            localStorage.setItem('theme', this.isDarkMode)
        },
        setCountries(payload) { this.countries = payload },
    },

    getters: {

    },

})