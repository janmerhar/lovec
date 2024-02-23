<template>
  <ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button>
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
    <ion-fab-list side="top">
      <ion-fab-button>
        <!-- ime 1 -->
        <ion-icon :icon="document"></ion-icon>
      </ion-fab-button>
      <ion-fab-button>
        <!-- ime 2 -->
        <ion-icon :icon="colorPalette"></ion-icon>
      </ion-fab-button>
      <ion-fab-button>
        <!-- ime 3 -->
        <ion-icon :icon="globe"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
</template>

<script lang="ts">
import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/vue"
import { colorPalette, document, globe, add } from "ionicons/icons"
import { defineComponent } from "vue"

export default defineComponent({
  components: {
    IonFab,
    IonFabButton,
    IonFabList,
    IonIcon,
  },
  setup() {
    return {
      colorPalette,
      document,
      globe,
      add,
    }
  },
})
</script>
