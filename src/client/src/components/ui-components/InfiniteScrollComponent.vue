<template>
  <ion-infinite-scroll @ion-infinite="infiniteScroll">
    <ion-infinite-scroll-content
      :loading-text="$t('framework.InfiniteScrollComponent.fetching')"
      loading-spinner="lines"
    ></ion-infinite-scroll-content>
  </ion-infinite-scroll>
</template>

<script setup lang="ts">
import {
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue"

const props = defineProps({
  scroll: {
    type: Function,
    required: true,
  },
})

const infiniteScroll = async (event: InfiniteScrollCustomEvent) => {
  await props.scroll()

  setTimeout(() => {
    event.target.complete()
  }, 500)
}
</script>
