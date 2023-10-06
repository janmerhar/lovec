<template>
  <ion-page class="responsive-body">
    <!--  -->
    <!-- TODO kreiraj sliko za ozadje -->
    <img
      src="https://image.api.playstation.com/cdn/UP0146/CUSA04107_00/XFEn5Mk8QsgH7gB9iTEWMgg9LLHFRiuD.png"
      alt=""
      srcset=""
    />

    <ion-content class="ion-padding">
      <div class="centered-content">
        <!-- TODO pomisli, ali je ta ozanaka sploh potrebna -->
        <!-- <h3>Prijava</h3> -->
        <ion-item>
          <font-awesome-icon :icon="['fas', 'envelope']" />
          <ion-input
            placeholder="Elektronski naslov"
            type="text"
            expand="block"
            required
            v-model="email"
            @keyup.enter="login()"
          ></ion-input>
        </ion-item>
        <ion-item class="ion-margin-vertical">
          <font-awesome-icon :icon="['fas', 'lock']" />
          <ion-input
            placeholder="Geslo"
            type="password"
            required
            v-model="geslo"
            @keyup.enter="login()"
          ></ion-input>
        </ion-item>
        <ion-button expand="block" @click.prevent="login()">Prijava</ion-button>

        <!-- TODO dodaj password reset ??? -->
        <ion-text color="primary">
          <p @click.prevent="">Pozabljeno geslo</p>
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script type="ts">
import {
  IonPage,
  useIonRouter,
  IonInput,
  IonItem,
  IonContent,
  IonButton,
  IonText
} from "@ionic/vue"

import { defineComponent } from "vue"

import { UporabnikFactory } from "@/entities/UporabnikFactory"
import { useUporabnikStore } from "@/stores/uporabnikStore"

export default defineComponent({
  components: {
    IonPage,
    IonInput,
    IonContent,
    IonItem,
    IonButton,
    IonText
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

.button {
  margin-top: 2rem;
  margin-bottom: 1rem;
  height: 2.8rem !important;
}

p {
  text-decoration: underline;
  cursor: pointer;
}

.centered-content {
  padding-top: 3vh;
}
</style>
@/stores/uporabnikStore
