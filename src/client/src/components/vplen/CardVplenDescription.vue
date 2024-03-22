<template>
  <card-horizontal>
    <template #left-side>
      <img
        class="carousel"
        src="https://i.natgeofe.com/n/9b97e60e-e8db-4961-853b-d68ba28d7629/red-fox_thumb_square.JPG?w=136&h=136"
      />
    </template>

    <template #right-top>
      <button-round color="danger" @click="emit('izbrisi')">
        <font-awesome-icon :icon="['fas', 'trash']" size="xl" fixed-width />
      </button-round>
    </template>

    <template #right-side>
      <text-card-title style="width: 65%">
        {{ vplen.zival }}
      </text-card-title>

      <text-card-body>
        <div>
          <span
            ><font-awesome-icon
              :icon="['fas', 'weight-hanging']"
              size="xl"
              fixed-width
              style="padding-right: 0.3rem"
          /></span>
          {{ vplen.teza }} kg
        </div>

        <div>
          <span
            ><font-awesome-icon
              :icon="['fas', 'compass']"
              size="xl"
              fixed-width
              style="padding-right: 0.3rem"
          /></span>
          Koordinate
        </div>

        <div>
          <span
            ><font-awesome-icon
              :icon="['fas', 'weight-hanging']"
              size="xl"
              fixed-width
              style="padding-right: 0.3rem"
          /></span>
          {{
            vplen.bolezni.join(", ").charAt(0).toUpperCase() +
            vplen.bolezni.join(", ").slice(1) +
            "."
          }}
        </div>
      </text-card-body>
    </template>
  </card-horizontal>
</template>

<script setup lang="ts">
import CardHorizontal from "@/components/ui-components/card/CardHorizontal.vue"
import TextCardTitle from "@/components/ui-components/card/TextCardTitle.vue"
import TextCardSubtitle from "@/components/ui-components/card/TextCardSubtitle.vue"
import TextCardBody from "@/components/ui-components/card/TextCardBody.vue"
import ButtonRound from "@/components/ui-components/button/ButtonRound.vue"

import type { Vplen } from "@/types"

defineProps({
  vplen: {
    type: Object as () => Vplen,
    required: true,
  },
})

const emit = defineEmits(["izbrisi"])
</script>

<style scoped>
ion-item {
  --padding-start: 0;
}

ion-thumbnail {
  height: 40px;
  width: 40px;
}

font-awesome-icon {
  height: 40px !important;
  width: 40px !important;
}
</style>
