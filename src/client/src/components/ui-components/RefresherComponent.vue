<template>
  <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { IonRefresher, IonRefresherContent } from "@ionic/vue"

export default defineComponent({
  components: {
    IonRefresher,
    IonRefresherContent,
  },
  props: {
    refresh: {
      type: Function,
      required: true,
    },
  },
  emits: ["refresh"],
  methods: {
    handleRefresh(event: CustomEvent) {
      // Verjetno lahko dodam se kaksen delay prej, bom videl
      this.refresh(event)
    },
  },
})
</script>
