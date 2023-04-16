<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!--  -->
      <h3 class="ion-text-center">Dnevniki za dan</h3>
      <div class="ion-padding">
        <ion-item fill="outline" class="">
          <ion-label position="stacked">Datum</ion-label>
          <ion-input
            placeholder="Datum"
            type="date"
            :clear-input="true"
            required
          ></ion-input>
        </ion-item>
      </div>
      <!--  -->
      <card-dnevnik-description
        :oprema="'Puška'"
        datum="Ponedeljek, 13. 3. 2023"
      ></card-dnevnik-description>
      <card-dnevnik-description
        :oprema="'Puška'"
        datum="Ponedeljek, 13. 3. 2023"
      ></card-dnevnik-description>
      <card-dnevnik-description
        :oprema="'Puška'"
        datum="Ponedeljek, 13. 3. 2023"
      ></card-dnevnik-description>

      <!--  -->

      <!-- Gumb samo za pripravnika, da vnese porocilo -->
      <fab-button-add @click.prevent="openModalPripravnikAdd"></fab-button-add>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  modalController,
  IonPage,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
} from "@ionic/vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import ModalDnevnikAdd from "@/components/pripravniki/ModalDnevnikAdd.vue"
import CardDnevnikDescription from "@/components/pripravniki/CardDnevnikDescription.vue"

export default {
  components: {
    IonPage,
    IonContent,
    FabButtonAdd,
    CardDnevnikDescription: CardDnevnikDescription,
    IonLabel,
    IonItem,
    IonInput,
  },
  methods: {
    async openModalPripravnikAdd() {
      const modal = await modalController.create({
        component: ModalDnevnikAdd,
      })
      modal.present()
    },
  },
}
</script>
