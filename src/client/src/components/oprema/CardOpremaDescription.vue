<template>
  <ion-card
    style="
      display: flex !important;
      align-items: center;
      flex-direction: row;
      position: relative;
      gap: 1rem;
      border-radius: 20px;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    "
  >
    <div style="display: inline-block; width: 40%">
      <!-- TODO: porihtaj slike -->
      <img
        class="carousel"
        src="https://t3.ftcdn.net/jpg/02/75/74/58/360_F_275745846_slBI2EsTudIShef6hMliS6Oa123tC9Zv.jpg"
      />
    </div>
    <div style="position: absolute; top: 0.5rem; right: 0.5rem">
      <ion-button color="danger" style="border-radius: 10000000"
        ><font-awesome-icon :icon="['fas', 'trash']" size="xl" fixed-width
      /></ion-button>
    </div>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
        min-height: 10rem;
      "
    >
      <h3
        style="
          font-size: 1.5rem;
          text-transform: uppercase;
          padding-bottom: 0rem;
          margin-bottom: 0rem;
          font-weight: 800;
          letter-spacing: 2px;
        "
      >
        {{ oprema.naziv }}
      </h3>

      <p style="width: 14rem; line-height: 1.6; font-weight: 500">
        {{ oprema.stanje }}
      </p>
      <p style="color: var(--ion-color-medium); font-weight: 500">
        <span
          ><font-awesome-icon
            :icon="['fas', 'calendar-days']"
            size="xl"
            fixed-width
            style="padding-right: 0.3rem"
        /></span>
        {{ formatDate(oprema.datum) }}
      </p>
    </div>
  </ion-card>
</template>

<script lang="ts">
import { IonCard } from "@ionic/vue"

import { defineComponent } from "vue"
import { Oprema } from "@/types"

export default defineComponent({
  components: {
    IonCard,
  },
  props: {
    oprema: {
      type: Object as () => Oprema,
      required: true,
    },
  },
  emits: ["izbrisi"],
  methods: {
    formatDate(datum: string) {
      const date = new Date(datum)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      return `${day}. ${month}. ${year}`
    },
  },
})
</script>

<style scoped>
.carousel {
  /* width: 20rem; */
  /* height: 15rem; */
  min-height: 10rem;
  /* max-height: 13rem; */
  object-fit: cover;
  object-position: 50% 20%;
}

ion-button {
  --border-radius: 100000rem;
}
</style>
