<template>
  <card-horizontal>
    <template #left-side>
      <img
        class="carousel"
        src="https://t3.ftcdn.net/jpg/02/75/74/58/360_F_275745846_slBI2EsTudIShef6hMliS6Oa123tC9Zv.jpg"
      />
    </template>

    <template #right-top>
      <button-round color="danger" @click="emit('izbrisi')">
        <font-awesome-icon :icon="['fas', 'trash']" size="xl" fixed-width />
      </button-round>
    </template>

    <template #right-side>
      <text-card-title style="width: 65%">
        {{ oprema.naziv }}
      </text-card-title>

      <text-card-body>
        {{ oprema.stanje }}
      </text-card-body>

      <text-card-subtitle>
        <span
          ><font-awesome-icon
            :icon="['fas', 'calendar-days']"
            size="xl"
            fixed-width
            style="padding-right: 0.3rem"
        /></span>
        {{ formatDate(oprema.datum) }}
      </text-card-subtitle>
    </template></card-horizontal
  >
</template>

<script setup lang="ts">
import CardHorizontal from "@/components/ui-components/card/CardHorizontal.vue"
import TextCardTitle from "@/components/ui-components/card/TextCardTitle.vue"
import TextCardSubtitle from "@/components/ui-components/card/TextCardSubtitle.vue"
import TextCardBody from "@/components/ui-components/card/TextCardBody.vue"
import ButtonRound from "@/components/ui-components/button/ButtonRound.vue"
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
</style>
