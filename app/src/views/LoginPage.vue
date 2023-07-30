<template>
  <ion-page>
    <!--  -->
    <ion-header>
      <ion-toolbar>
        <ion-title size="large">Lovec</ion-title>
      </ion-toolbar>
      <!--  -->
    </ion-header>
    <ion-content class="ion-padding">
      <h3 class="ion-text-center">Prijava v aplikacijo</h3>
      <br />
      <ion-item fill="solid">
        <ion-label position="stacked">Elektronski naslov</ion-label>
        <ion-input
          placeholder="Elektronski naslov"
          type="text"
          required
          v-model="email"
          @keyup.enter="login()"
        ></ion-input>
      </ion-item>
      <ion-item fill="solid">
        <ion-label position="stacked">Geslo</ion-label>
        <ion-input
          placeholder="Geslo"
          type="password"
          required
          v-model="geslo"
          @keyup.enter="login()"
        ></ion-input>
      </ion-item>
      <br />
      <ion-button expand="full" @click.prevent="login()">Prijava</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonLabel,
  IonPage,
  useIonRouter,
  IonInput,
  IonItem,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/vue"

import { defineComponent } from "vue"

import { Uporabnik } from "@/entities/Uporabnik"
import { useUporabnikStore } from "@/stores/useUporabnikStore"

export default defineComponent({
  components: {
    IonLabel,
    IonPage,
    IonInput,
    IonContent,
    IonItem,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
  },
  setup() {
    const router = useIonRouter()
    const uporabnikStore = useUporabnikStore()

    return { router, uporabnikStore }
  },
  data() {
    return {
      email: "",
      geslo: "",
    }
  },
  methods: {
    async login() {
      const uporabnik = await Uporabnik.login(this.email, this.geslo)

      if (uporabnik.status == 200) {
        console.log("Prijava uspesna")
        // Update store
        this.uporabnikStore.login(uporabnik.data)

        // Set Bearer token
        this.axios.defaults.headers.Authorization =
          "Bearer " + uporabnik.data.token

        // console.log(this.axios.defaults.headers.Authorization)
        // Redirect to home pageq
        this.router.push({ name: "pripravniki" })
      }
      // TODO
      // Alert wrong login data
      // send reponse text from "message" attribute
    },
  },
  async beforeMount() {
    Uporabnik.setCustomAxios(this.axios)
  },
})
</script>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
@/stores/useUporabnikStore
