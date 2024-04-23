<template>
  <p
    style="
      margin-bottom: -5px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.875rem;
      color: var(--ion-color-medium);
    "
  >
    <icon-user-picture :url="uporabnik.slika"></icon-user-picture>

    {{ uporabnik.ime }} {{ uporabnik.priimek }}

    <slot></slot>
  </p>
</template>

<script setup lang="ts">
import IconUserPicture from "@/components/ui-components/misc/IconUserPicture.vue"
import type { UporabnikDetails } from "@/types"

defineProps({
  uporabnik: {
    type: Object as () => UporabnikDetails,
    required: true,
  },
})
</script>
