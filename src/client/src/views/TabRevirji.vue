<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 4</ion-title>
        </ion-toolbar>
      </ion-header>

      <map-component></map-component>
      <div class="ion-padding">
        <ion-item fill="solid">
          <ion-label position="stacked">Izbira revirja</ion-label>
          <ion-select aria-label="fruit" placeholder="Izberi revir">
            <ion-select-option value="m1">Revir 1</ion-select-option>
            <ion-select-option value="m2">Revir 2</ion-select-option>
            <ion-select-option value="m3">Revir 3</ion-select-option>
          </ion-select>
        </ion-item>
        <h4 class="ion-text-center">Podrobnosti o izbranem revirju</h4>
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
        voluptates nostrum odit minima sunt ipsa, laboriosam voluptate aut,
        doloremque officia quisquam, distinctio cum corrupti aliquam eligendi
        quia ipsam similique eaque.
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue"
import MapComponent from "@/components/MapComponent.vue"
</script>
