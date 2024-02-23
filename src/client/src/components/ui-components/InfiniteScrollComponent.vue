<template>
  <ion-infinite-scroll @ion-infinite="infiniteScroll">
    <ion-infinite-scroll-content
      loading-text="Prosim počakajte..."
      loading-spinner="lines"
    ></ion-infinite-scroll-content>
  </ion-infinite-scroll>
</template>

<script lang="ts">
import {
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue"
import { defineComponent } from "vue"

export default defineComponent({
  components: {
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  },
  props: {
    scroll: {
      type: Function,
      required: true,
    },
  },
  methods: {
    async infiniteScroll(event: InfiniteScrollCustomEvent) {
      await this.scroll()

      setTimeout(() => {
        event.target.complete()
      }, 500)
    },
  },
})
</script>
