<template>
  <card-normal>
    <template #right-top>
      <button-round color="danger" @click="emit('izbrisi')">
        <font-awesome-icon :icon="['fas', 'trash']" size="xl" fixed-width />
      </button-round>
    </template>
    <template #default>
      <text-card-title>
        <text-username :url="uporabnik.slika" style="padding-bottom: 1rem">
          {{ uporabnik.ime }} {{ uporabnik.priimek }} · {{ uporabnik.role }}
        </text-username>
      </text-card-title>
    </template>
  </card-normal>
</template>

<script setup lang="ts">
import CardNormal from "@/components/ui-components/card/CardNormal.vue"
import TextCardTitle from "@/components/ui-components/card/TextCardTitle.vue"
import TextUsername from "@/components/ui-components/text/TextUsername.vue"
import ButtonRound from "@/components/ui-components/button/ButtonRound.vue"

import type { UporabnikDetails } from "@/types"

const emit = defineEmits(["izbrisi"])

defineProps({
  uporabnik: {
    type: Object as () => UporabnikDetails,
    required: true,
  },
})
</script>
