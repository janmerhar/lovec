import type { Opazovalnica } from "@/types"
import { Icon } from "leaflet"
import type { PointExpression } from "leaflet"

import { storeToRefs } from "pinia"

import { useActiveObiskStore } from "@/stores/useActiveObiskStore"
import { useLoginStore } from "@/stores/useLoginStore"

// Images
import opazovalnicaIzbrisana from "@/assets/map/opazovalnica/opazovalnica-izbrisana.svg"
import opazovalnicaPolna from "@/assets/map/opazovalnica/opazovalnica-polna.svg"
import opazovalnicaPrespanje from "@/assets/map/opazovalnica/opazovalnica-prespanje.svg"
import opazovalnicaRezervirana from "@/assets/map/opazovalnica/opazovalnica-rezervirana.svg"
import opazovalnicaOg from "@/assets/map/opazovalnica/opazovalnica.svg"

import vplen from "@/assets/map/vplen/vplen.svg"
import jaga from "@/assets/map/jaga/jaga.svg"

export const useMapElements = () => {
  const iconSize: PointExpression = [40, 55]

  const { selectedItem: activeObisk } = storeToRefs(useActiveObiskStore())
  const { isAdmin } = storeToRefs(useLoginStore())

  const iconOpazovalnica = (opazovalnica: Opazovalnica) => {
    // User
    // 1. Opazovalnica
    let icon = opazovalnicaOg

    // 2. Prespanje
    if (opazovalnica.prespanje) {
      icon = opazovalnicaPrespanje
    }

    // 3. Polna
    if (opazovalnica.kapaciteta === opazovalnica?.zasedenost) {
      icon = opazovalnicaPolna
    }

    // 4. Zasedena
    if (
      !isAdmin.value &&
      opazovalnica.id === activeObisk.value?.opazovalnica.id
    ) {
      icon = opazovalnicaRezervirana
    }

    // Admin
    // 1. Izbrisana
    if (isAdmin.value) {
      if (opazovalnica.isDeleted) {
        icon = opazovalnicaIzbrisana
      }
    }

    return new Icon({
      iconUrl: icon,
      iconSize,
    })
  }

  const iconVplen = (zival: string) => {
    return new Icon({
      iconUrl: vplen,
      iconSize,
    })
  }

  const iconJaga = () => {
    return new Icon({
      iconUrl: jaga,
      iconSize,
    })
  }

  return {
    iconOpazovalnica,
    iconVplen,
    iconJaga,
  }
}
