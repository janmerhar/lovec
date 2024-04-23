<template>
  <!-- TODO: naredi detector, ki onemogoci refresh, ko ni povezave -->
  <ion-refresher
    slot="fixed"
    @ionRefresh="handleRefresh($event)"
    v-if="isVisible"
  >
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
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["refresh"],
  methods: {
    async handleRefresh(event: CustomEvent) {
      await this.refresh(event)

      event.detail.complete()
    },
  },
})
</script>
