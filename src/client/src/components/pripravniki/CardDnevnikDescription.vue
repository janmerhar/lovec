<template>
  <card-horizontal :class="cardColor(dnevnik)">
    <template #left-side>
      <!-- <img
        class="carousel"
        src="https://t3.ftcdn.net/jpg/02/75/74/58/360_F_275745846_slBI2EsTudIShef6hMliS6Oa123tC9Zv.jpg"
      /> -->
      <font-awesome-icon :icon="['fas', 'broom']" size="8x" fixed-width />
    </template>

    <template #right-side>
      <text-username :url="dnevnik.pripravnikId.slika">
        {{ dnevnik.pripravnikId.ime }} {{ dnevnik.pripravnikId.priimek }}
      </text-username>

      <text-card-title> {{ dnevnik.delo }} </text-card-title>
      <text-card-subtitle>
        {{ useDate(dnevnik.datum).isoDate() }} · {{ dnevnik.ure }} h
      </text-card-subtitle>

      <text-card-body> {{ dnevnik.opis }} </text-card-body>

      <button-row v-if="showButtons && isNeobdelan(dnevnik)">
        <button-round color="success" @click="emit('accept')">
          <font-awesome-icon :icon="['fas', 'check']" size="xl" fixed-width />
        </button-round>
        <button-round color="danger" @click="emit('reject')">
          <font-awesome-icon :icon="['fas', 'times']" size="xl" fixed-width />
        </button-round>
      </button-row>
    </template>
  </card-horizontal>
</template>

<script setup lang="ts">
import CardHorizontal from "@/components/ui-components/card/CardHorizontal.vue"
import TextCardTitle from "@/components/ui-components/card/TextCardTitle.vue"
import TextCardBody from "@/components/ui-components/card/TextCardBody.vue"
import TextCardSubtitle from "@/components/ui-components/card/TextCardSubtitle.vue"
import ButtonRound from "@/components/ui-components/button/ButtonRound.vue"
import ButtonRow from "@/components/ui-components/button/ButtonRow.vue"
import TextUsername from "@/components/ui-components/text/TextUsername.vue"

import type { Dnevnik } from "@/types"
import { useDate } from "@/composables/useDate"

defineProps({
  dnevnik: {
    dnevnik: Object as () => Dnevnik,
    required: true,
  },
  showButtons: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["accept", "reject"])

const isNeobdelan = (dnevnik: Dnevnik) => dnevnik.status === "neobdelan"

const cardColor = (dnevnik: Dnevnik) => {
  if (dnevnik.status === "potrjen") {
    return ["potrjen"]
  }
  if (dnevnik.status === "zavrnjen") {
    return ["zavrnjen"]
  }
}
</script>

<style scoped>
.potrjen {
  --background: var(--ion-color-success-tint);
}

.zavrnjen {
  --background: var(--ion-color-danger-tint);
}

.carousel {
  min-height: 10rem;
  object-fit: cover;
  object-position: 50% 20%;
}
</style>
