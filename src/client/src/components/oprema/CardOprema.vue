<template>
  <card-horizontal>
    <template #left-side>
      <img
        class="carousel"
        src="https://t3.ftcdn.net/jpg/02/75/74/58/360_F_275745846_slBI2EsTudIShef6hMliS6Oa123tC9Zv.jpg"
      />
    </template>

    <template #right-top>
      <ion-button
        @click="emit('izbrisi')"
        color="danger"
        style="width: 40px; height: 40px"
      >
        <font-awesome-icon :icon="['fas', 'trash']" size="xl" fixed-width />
      </ion-button>
    </template>

    <template #right-side>
      <h3
        style="
          font-size: 1.3rem;
          text-transform: uppercase;
          padding-bottom: 0rem;
          margin-bottom: 0rem;
          font-weight: 800;
          letter-spacing: 2px;
          widows: 65%;
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
    </template></card-horizontal
  >
</template>

<script setup lang="ts">
import CardHorizontal from "@/components/ui-components/card/CardHorizontal.vue"
import type { Oprema } from "@/types"

defineProps({
  oprema: {
    type: Object as () => Oprema,
    required: true,
  },
})

const emit = defineEmits(["izbrisi"])

const formatDate = (datum: string) => {
  const date = new Date(datum)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}. ${month}. ${year}`
}
</script>

<style scoped>
.carousel {
  min-height: 10rem;
  object-fit: cover;
  object-position: 50% 20%;
}

ion-button {
  --border-radius: 100000rem;
}
</style>
