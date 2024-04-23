import { defineStore, storeToRefs } from "pinia"
import { useRequest } from "@/composables/useRequest"
import { useUporabnikiStore } from "@/stores/admin/useUporabnikiStore"
import { usePagination } from "@/composables/usePagination"
import type { VplenDetails } from "@/types"

export const useUporabnikVpleniStore = defineStore("uporabnikVpleni", () => {
  const { request } = useRequest()

  const uporabnikStore = useUporabnikiStore()
  const { selectedItem: uporabnik } = storeToRefs(uporabnikStore)

  //
  // Vsi vpleni po skupinah / concatenated
  //

  // Pagination
  const getVpleni = async (page?: number): Promise<VplenDetails[]> => {
    if (!page || !uporabnik?.value || uporabnik?.value.role == "admin")
      return []

    const response = await request.get<VplenDetails[]>(
      `/vpleni/${uporabnik?.value.id}/${page}`
    )

    return response.data
  }

  const { items, fetchMore, refreshPagination } =
    usePagination<VplenDetails>(getVpleni)

  //
  // Vpleni za dolocen datum
  //
  // TODO: razmisli ali bo implementiramo, saj tega podatka ni na backend-u

  return {
    // Vsi vpleni po skupinah / concatenated
    items,
    fetchMore,
    refreshPagination,
    // Vpleni za dolocen datum
  }
})
