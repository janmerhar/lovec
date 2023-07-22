import { defineStore } from "pinia"
import { Uporabnik } from "../entities/Uporabnik"

export const useUporabnikStore = defineStore({
  id: "uporabnik",
  state: () => ({
    uporabnik: null,
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
  },
  persist: true,
})
