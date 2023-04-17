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
        <ion-label position="stacked">Uporabniško ime</ion-label>
        <ion-input
          placeholder="Uporabniško ime"
          type="text"
          required
          v-model="username"
        ></ion-input>
      </ion-item>
      <ion-item fill="solid">
        <ion-label position="stacked">Geslo</ion-label>
        <ion-input
          placeholder="Geslo"
          type="password"
          required
          v-model="password"
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
  //   IonRouterOutlet,
  useIonRouter,
  IonInput,
  IonItem,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/vue"

export default {
  components: {
    IonLabel,
    IonPage,
    // IonRouterOutlet,
    // useIonRouter,
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
    return { router }
  },
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    login() {
      console.log(this.username)
      console.log(this.password)
    },
  },
}
</script>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
