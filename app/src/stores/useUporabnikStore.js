import { defineStore } from "pinia"
import { Uporabnik } from "../entities/Uporabnik"

export const useUporabnikStore = defineStore({
  id: "uporabnik",
  state: () => ({
    uporabnik: null,
  }),
  // https://www.bitovi.com/blog/how-to-get-started-with-pinia-in-vue
  // getters: {}, -- they use state in arguments OBVEZNO
  actions: {
    login(uporabnik) {
      this.uporabnik = uporabnik
    },
  },
  persist: true,
})
