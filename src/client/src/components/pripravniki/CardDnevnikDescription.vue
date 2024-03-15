<template>
  <card-horizontal>
    <template #left-side>
      <img
        class="carousel"
        src="https://t3.ftcdn.net/jpg/02/75/74/58/360_F_275745846_slBI2EsTudIShef6hMliS6Oa123tC9Zv.jpg"
      />
    </template>

    <template #right-side>
      <!-- manjka uporabnik in user icon -->
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
        <img
          src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2018%2F08%2Fsimp_homersingle08_f_hires2-2000.jpg&q=60"
          style="
            width: 30px;
            height: 30px;
            object-fit: cover;
            border-radius: 50%;
            border: 1px solid var(--ion-color-step-600);
          "
        />
        {{ dnevnik.pripravnikId.ime }} {{ dnevnik.pripravnikId.priimek }}
      </p>

      <text-card-title> {{ dnevnik.delo }} </text-card-title>
      <text-card-subtitle>
        {{ dnevnik.datum }} · {{ dnevnik.ure }} ur
      </text-card-subtitle>

      <text-card-body>
        {{ dnevnik.opis }} Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Reiciendis doloribus est, ipsa eveniet blanditiis quidem explicabo
        vero repellat perspiciatis distinctio?</text-card-body
      >
      <button-row>
        <button-round
          v-if="showButtons"
          color="success"
          @click="emit('accept')"
        >
          <font-awesome-icon :icon="['fas', 'check']" size="xl" fixed-width />
        </button-round>
        <button-round v-if="showButtons" color="danger" @click="emit('reject')">
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

import type { Dnevnik } from "@/types"

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
</script>

<style scoped>
/* #afafaf */
/* #e74c3c  */

ion-list {
  padding: 0;
}

.neobdelan {
  background-color: #afafaf !important;
  --background: #afafaf;
}
.zavrnjen {
  background-color: #e74c3c !important;
  --background: #e74c3c;
}

.carousel {
  min-height: 10rem;
  object-fit: cover;
  object-position: 50% 20%;
}
</style>
