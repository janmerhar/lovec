<template>
  <card-normal>
    <template #right-top>
      <button-round color="danger" @click="emit('izbrisi')">
        <font-awesome-icon :icon="['fas', 'trash']" size="xl" fixed-width />
      </button-round>
    </template>
    <template #default>
      <text-card-title>
        {{ druzina.ime }}
      </text-card-title>
      <text-card-subtitle>
        <span style="margin-right: 0.5rem">
          <font-awesome-icon
            :icon="['fas', 'house-user']"
            size="xl"
            fixed-width
            style="margin-right: 0.25rem"
          />
          {{ druzina.claniCount }}
        </span>
        ·
        <span style="margin-left: 0.5rem">
          <font-awesome-icon
            :icon="['fas', 'map']"
            size="xl"
            fixed-width
            style="margin-right: 0.25rem"
          />
          {{ druzina.revirjiCount }}
        </span>
      </text-card-subtitle>
    </template>
  </card-normal>
</template>

<script setup lang="ts">
import CardNormal from "@/components/ui-components/card/CardNormal.vue"
import TextCardTitle from "@/components/ui-components/card/TextCardTitle.vue"
import TextCardSubtitle from "@/components/ui-components/card/TextCardSubtitle.vue"
import ButtonRound from "@/components/ui-components/button/ButtonRound.vue"

import type { DruzinaDetails } from "@/types"

defineProps({
  druzina: {
    type: Object as () => DruzinaDetails,
    required: true,
  },
})

const emit = defineEmits(["izbrisi"])
</script>
