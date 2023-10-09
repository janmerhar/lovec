<template>
  <ion-header>
    <ion-toolbar class="responsive-toolbar">
      <ion-title size="large">Lovec</ion-title>
      <ion-buttons slot="secondary">
        <ion-button @click="() => router.push({ name: 'izkaznica' })">
          <!-- <font-awesome-icon icon="fa-solid fa-id-card " /> -->
          <img
            :src="profile_picture"
            alt="Profilna slika"
            :class="{ 'active-tab': selectedTab === 'izkaznica' }"
          />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from "@ionic/vue"
import { defineComponent } from "vue"
import { useRouter } from "vue-router"

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
  },
  data() {
    return {
      profile_picture:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2018%2F08%2Fsimp_homersingle08_f_hires2-2000.jpg&q=60",
    }
  },
  computed: {
    selectedTab() {
      return this.$route.name
    },
  },
  setup() {
    const router = useRouter()
    return { router }
  },
})
</script>

<style scoped>
img {
  width: 31px;
  height: 31px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid var(--ion-color-step-600);
}

.active-tab {
  border: 2px solid var(--ion-color-primary);
}
</style>
