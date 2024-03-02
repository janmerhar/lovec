<template>
  <ion-page class="responsive-body">
    <!--  -->
    <!-- TODO kreiraj sliko za ozadje -->
    <img
      src="https://image.api.playstation.com/cdn/UP0146/CUSA04107_00/XFEn5Mk8QsgH7gB9iTEWMgg9LLHFRiuD.png"
      alt=""
      srcset=""
    />

    <ion-content class="ion-padding" :scroll-y="false">
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
            @keyup.enter="loginRedirect"
          ></ion-input>
        </ion-item>
        <ion-item class="ion-margin-vertical">
          <font-awesome-icon :icon="['fas', 'lock']" />
          <ion-input
            placeholder="Geslo"
            type="password"
            required
            v-model="geslo"
            @keyup.enter="loginRedirect"
          ></ion-input>
        </ion-item>
        <ion-button expand="block" @click.prevent="loginRedirect"
          >Prijava</ion-button
        >

        <!-- TODO dodaj password reset ??? -->
        <ion-text color="primary">
          <p @click.prevent="">Pozabljeno geslo</p>
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  useIonRouter,
  IonInput,
  IonItem,
  IonContent,
  IonButton,
  IonText,
} from "@ionic/vue"

import { ref } from "vue"
import { useLoginStore } from "@/stores/useLoginStore"

const email = ref<string>("")
const geslo = ref<string>("")

const { login, logout } = useLoginStore()
const router = useIonRouter()

const loginRedirect = async () => {
  // TODO: check fields
  const result = await login(email.value, geslo.value)

  if (result) {
    router.push({ name: "jage" })
  }
  // TODO: sicer izpiši napako
}
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
  padding-top: 5vh;
}
</style>
