<template>
  <card-normal>
    <template v-if="delete" #right-top>
      <button-round color="danger" @click.stop="emit('delete')">
        <font-awesome-icon :icon="['fas', 'trash']" size="xl" fixed-width />
      </button-round>
    </template>

    <text-card-subtitle>
      <icon-username-inline :uporabnik="jaga.organizator">
        &nbsp;·
        <span
          ><font-awesome-icon
            :icon="['fas', 'calendar-days']"
            size="xl"
            fixed-width
            style="padding-right: 0.3rem"
        /></span>
        {{ useDate(jaga.zacetek).isoDate() }}
      </icon-username-inline>
    </text-card-subtitle>
    <text-card-title>{{ jaga.naziv }}</text-card-title>
    <text-card-body> {{ jaga.opis }} </text-card-body>

    <div>
      <template v-for="udelezeni in jaga.udelezeni" :key="udelezeni.id">
        <icon-user-picture :url="udelezeni.slika"></icon-user-picture>
      </template>
    </div>
  </card-normal>
</template>

<script setup lang="ts">
import CardNormal from "@/components/ui-components/card/CardNormal.vue"
import TextCardTitle from "@/components/ui-components/card/TextCardTitle.vue"
import TextCardSubtitle from "@/components/ui-components/card/TextCardSubtitle.vue"
import TextCardBody from "@/components/ui-components/card/TextCardBody.vue"
import IconUserPicture from "@/components/ui-components/misc/IconUserPicture.vue"
import IconUsernameInline from "@/components/ui-components/misc/IconUsernameInline.vue"
import ButtonRound from "@/components/ui-components/button/ButtonRound.vue"

import type { Jaga } from "@/types"
import { useDate } from "@/composables/useDate"

defineProps({
  jaga: {
    type: Object as () => Jaga,
    required: true,
  },
  delete: {
    type: Boolean,
    value: false,
  },
})

const emit = defineEmits(["delete"])
</script>
