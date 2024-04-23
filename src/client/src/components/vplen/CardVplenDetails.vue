<template>
  <card-normal>
    <text-card-body>
      <text-card-subtitle>
        <icon-username-inline
          :uporabnik="vplen.uporabnik"
        ></icon-username-inline>
      </text-card-subtitle>

      <text-card-title>
        <span
          ><font-awesome-icon
            :icon="['fas', 'calendar-days']"
            size="xl"
            fixed-width
            style="padding-right: 0.3rem"
        /></span>
        <!-- TODO: premisli, kako tocno naj prikazem datum in to naredi vse v eni funkciji -->
        {{ useDate(vplen.datum).isoDate() }}
      </text-card-title>

      <div style="padding-top: 1rem">
        <!-- TODO: dodaj ko dobim ikone -->
        <icon-user-picture
          :url="'https://static01.nyt.com/images/2023/10/12/science/00sci-deer/00sci-deer-facebookJumbo.jpg'"
        ></icon-user-picture>
        <icon-user-picture
          :url="'https://static01.nyt.com/images/2023/10/12/science/00sci-deer/00sci-deer-facebookJumbo.jpg'"
        ></icon-user-picture>
        <icon-user-picture
          :url="'https://upload.wikimedia.org/wikipedia/commons/7/71/2010-kodiak-bear-1.jpg'"
        ></icon-user-picture>
        <icon-user-picture
          :url="'https://upload.wikimedia.org/wikipedia/commons/3/30/Vulpes_vulpes_ssp_fulvus.jpg'"
        ></icon-user-picture>
      </div>
    </text-card-body>
  </card-normal>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import type { VplenDetails } from "@/types"

import CardNormal from "@/components/ui-components/card/CardNormal.vue"
import TextCardTitle from "@/components/ui-components/card/TextCardTitle.vue"
import TextCardSubtitle from "@/components/ui-components/card/TextCardSubtitle.vue"
import TextCardBody from "@/components/ui-components/card/TextCardBody.vue"
import IconUserPicture from "@/components/ui-components/misc/IconUserPicture.vue"
import IconUsernameInline from "@/components/ui-components/misc/IconUsernameInline.vue"

import { useDate } from "@/composables/useDate"

defineProps({
  vplen: {
    type: Object as () => VplenDetails,
    required: true,
  },
})
</script>
