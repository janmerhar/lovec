import { defineStore } from "pinia"
import { ref } from "vue"

import { useRequest } from "@/composables/useRequest"
import { useSelect } from "@/composables/useSelect"
import { UporabnikProfile } from "@/types"

export const useProfileStore = defineStore("izkaznica", () => {
  const { request } = useRequest()

  const select = useSelect<string>("")
  const { selectedItem, selectItem } = select

  const selectedUporabnik = ref<UporabnikProfile | null>(null)

  const getProfile = async (
    uporabnikId: string
  ): Promise<UporabnikProfile | null> => {
    if (!uporabnikId) {
      return null
    }

    const response = await request.get<UporabnikProfile>(
      `/uporabnik/${uporabnikId}`
    )

    return response.data
  }

  const getSelectedProfile = async (): Promise<UporabnikProfile | null> => {
    if (!selectedItem.value) {
      return null
    }

    const result = await getProfile(selectedItem.value)

    selectedUporabnik.value = result

    return result
  }

  return {
    selectedItem,
    selectItem: selectItem(getSelectedProfile),
    selectedUporabnik,
  }

  // TODO: naredi se pagination, kjer vse uporabnike izbiramo
  // to naj tudi podpira nek search by name
  // mogoce moram predelati usePagination v useFilterPagination
  // k to je ze mal vec dela
})
