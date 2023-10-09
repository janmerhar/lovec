// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { defineStore } from "pinia"
import { ref } from "vue"
import { Uporabnik } from "@/entities/users/Uporabnik"
import { Pripravnik } from "@/entities/users/Pripravnik"

export const useUporabnikStore = defineStore({
  id: "uporabnik",
  state: () => ({
    uporabnik: ref<Uporabnik | null>(null),
    role: ref<string | null>(null),
  }),
  // https://www.bitovi.com/blog/how-to-get-started-with-pinia-in-vue
  getters: {
    isMentor: (state) => state.role == "lovec",
    isAdmin: (state) => state.role == "admin",

    mentorIme: (state) =>
      state.uporabnik && state.role == "pripravnik"
        ? `${state.uporabnik.mentor.ime as string} ${
            state.uporabnik.mentor.priimek
          }`
        : "",

    token: (state) =>
      state.uporabnik != null ? state.uporabnik.jwt.token : "",
  },
  actions: {
    login(uporabnik: Uporabnik) {
      this.role = uporabnik.constructor.name?.toLowerCase()

      this.uporabnik =
        this.role == "pripravnik" ? (uporabnik as Pripravnik) : uporabnik
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
