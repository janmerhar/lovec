<template>
  <card-normal>
    <text-card-title>
      {{ druzina.ime }}
    </text-card-title>
    <text-card-subtitle>
      <span style="margin-right: 0.5rem">
        <font-awesome-icon
          :icon="['fas', 'house-user']"
          size="xl"
          fixed-width
        />
        {{ druzina.claniCount }}
      </span>
      ·
      <span style="margin-left: 0.5rem">
        <font-awesome-icon :icon="['fas', 'map']" size="xl" fixed-width />
        {{ druzina.revirjiCount }}
      </span>
    </text-card-subtitle>
  </card-normal>
</template>

<script setup lang="ts">
import CardNormal from "@/components/ui-components/card/CardNormal.vue"
import TextCardTitle from "@/components/ui-components/card/TextCardTitle.vue"
import TextCardSubtitle from "@/components/ui-components/card/TextCardSubtitle.vue"

import type { DruzinaDetails } from "@/types"

defineProps({
  druzina: {
    type: Object as () => DruzinaDetails,
    required: true,
  },
})
</script>
