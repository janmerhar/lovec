import { defineStore } from "pinia"
import { ref } from "vue"
import { Uporabnik } from "@/entities/users/Uporabnik"
import { Lovec } from "@/entities/users/Lovec"
import { Pripravnik } from "@/entities/users/Pripravnik"

export const useUporabnikStore = defineStore({
  id: "uporabnik",
  state: () => ({
    uporabnik: ref<Uporabnik | null>(null),
  }),
  // https://www.bitovi.com/blog/how-to-get-started-with-pinia-in-vue
  getters: {
    isMentor: (state) =>
      state.uporabnik != null ? state.uporabnik instanceof Lovec : false,
    mentorIme: (state) =>
      state.uporabnik != null &&
      state.uporabnik instanceof Pripravnik &&
      state.uporabnik.mentor != null
        ? `${state.uporabnik.mentor.ime} ${state.uporabnik.mentor.priimek}`
        : "",
    token: (state) =>
      state.uporabnik != null ? state.uporabnik.jwt.token : "",
  },
  actions: {
    login(uporabnik: Uporabnik) {
      this.uporabnik = uporabnik
    },
    logout() {
      this.uporabnik = null
      // Naredi logout call na server
    },
    // Tukaj lahko preverjam, ali je token se veljaven
    async isLoggedIn() {
      if (!this.uporabnik?.jwt.token) return false

      // TODO preverjanje, ali je token se veljaven
      const tokenValidity = this.uporabnik.jwt.checkToken()

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
