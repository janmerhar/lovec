<template>
  <ion-page class="responsive-body">
    <!--  -->
    <img
      src="https://image.api.playstation.com/cdn/UP0146/CUSA04107_00/XFEn5Mk8QsgH7gB9iTEWMgg9LLHFRiuD.png"
      alt=""
      srcset=""
    />

    <ion-content class="ion-padding">
      <ion-label position="stacked">Elektronski naslov</ion-label>
      <br />
      <br />
      <ion-item>
        <ion-input
          placeholder="Elektronski naslov"
          fill="solid"
          type="text"
          required
          v-model="email"
          @keyup.enter="login()"
        ></ion-input>
      </ion-item>
      <br />
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
      <br />
      <ion-button expand="full" @click.prevent="login()">Prijava</ion-button>
      <p>Pozabljeno geslo</p>
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
  IonButton,
} from "@ionic/vue"

import { defineComponent } from "vue"

import { UporabnikFactory } from "@/entities/UporabnikFactory"
import { useUporabnikStore } from "@/stores/uporabnikStore"

export default defineComponent({
  components: {
    IonLabel,
    IonPage,
    IonInput,
    IonContent,
    IonItem,
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
      const uporabnik = await UporabnikFactory.login(
        this.axios,
        this.email,
        this.geslo
      )

      if (uporabnik.status == 200) {
        console.log("Prijava uspesna")
        // Update store
        this.uporabnikStore.login(uporabnik.data)

        // Set Bearer token
        this.axios.defaults.headers.Authorization =
          "Bearer " + uporabnik.data.jwt.token

        // console.log(this.axios.defaults.headers.Authorization)
        // Redirect to home pageq
        this.router.push({ name: "pripravniki" })
      }
      // TODO
      // Alert wrong login data
      // send reponse text from "message" attribute
    },
  },
})
</script>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
  display: block;
}

img {
  height: 50vh;
  width: 100%;
}
</style>
@/stores/uporabnikStore
