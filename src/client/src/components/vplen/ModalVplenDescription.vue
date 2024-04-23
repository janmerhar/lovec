<template>
  <header-modal @cancel="cancel()" @confirm="confirm()" :confirm-button="false"
    >Vplen</header-modal
  >
  <!--  -->
  <ion-content class="ion-padding">
    <h3 class="ion-text-center ion-padding-bottom">Datum</h3>

    <template v-for="vplen in vplenStore.vpleni" :key="vplen.id">
      <card-vplen-description :vplen="vplen"></card-vplen-description>
    </template>
  </ion-content>
  <!--  -->
</template>

<script setup lang="ts">
import { IonContent, modalController } from "@ionic/vue"
import { onMounted, useAttrs } from "vue"

import CardVplenDescription from "@/components/vplen/CardVplenDescription.vue"
import HeaderModal from "@/components/ui-components/HeaderModal.vue"

const cancel = () => {
  return modalController.dismiss(null, "cancel")
}

const confirm = () => {
  return modalController.dismiss(null, "confirm")
}

import { useVplenStore } from "@/stores/useVplenStore"
import { VplenDetails } from "@/types"

const vplenStore = useVplenStore()

const { setVplenDetails } = vplenStore

const attrs = useAttrs()

onMounted(async () => {
  await setVplenDetails(attrs.selection as VplenDetails)
})
</script>
