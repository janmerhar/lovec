import { defineStore } from "pinia"
import { ref } from "vue"
import { UporabnikFactory } from "../entities/UporabnikFactory"

export const useUporabnikStore = defineStore({
  id: "uporabnik",
  state: () => ({
    uporabnik: (ref < UporabnikFactory) | (null > null),
  }),
  // https://www.bitovi.com/blog/how-to-get-started-with-pinia-in-vue
  getters: {
    isMentor: (state) =>
      state.uporabnik != null ? state.uporabnik.role == "lovec" : false,
    mentorIme: (state) =>
      state.uporabnik != null && state.uporabnik.mentor != null
        ? `${state.uporabnik.mentor.ime} ${state.uporabnik.mentor.priimek}`
        : "",
    token: (state) => (state.uporabnik != null ? state.uporabnik.token : ""),
  },
  actions: {
    login(uporabnik) {
      this.uporabnik = uporabnik
    },
    logout() {
      this.uporabnik = null
      // Naredi logout call na server
    },
    // Tukaj lahko preverjam, ali je token se veljaven
    async isLoggedIn() {
      if (!this.uporabnik.token) return false

      // TODO preverjanje, ali je token se veljaven
      const tokenValidity = this.uporabnik.isJWTvalid(this.uporabnik.token)

      // Token je veljaven
      // tebe bom verjetno mogel povezati na server
      if (tokenValidity >= 0) return true

      // Token ni veljaven
      if (tokenValidity == -1) return false

      // Token je pretekel in ga zato osvezim
      // if (tokenValidity == 0) ...

      // Sicer pac uporabnik ni prijavljen
      return false
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
