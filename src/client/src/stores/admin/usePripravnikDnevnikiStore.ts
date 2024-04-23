import { defineStore, storeToRefs } from "pinia"
import { useRequest } from "@/composables/useRequest"
import { useUporabnikiStore } from "@/stores/admin/useUporabnikiStore"
import { usePagination } from "@/composables/usePagination"
import type { Dnevnik } from "@/types"

export const usePripravnikDnevnikiStore = defineStore(
  "pripravnikDnevnik",
  () => {
    const { request } = useRequest()

    const uporabnikStore = useUporabnikiStore()
    const { selectedItem: uporabnik } = storeToRefs(uporabnikStore)

    const getPripravnikDnevniki = async (page?: number): Promise<Dnevnik[]> => {
      if (!uporabnik?.value || uporabnik?.value.role != "pripravnik") return []

      const response = await request.get<Dnevnik[]>(
        `/dnevniki/admin/pripravnik/${uporabnik?.value.id}/${page}`
      )

      return response.data
    }

    const { items, fetchMore, refreshPagination } = usePagination<Dnevnik>(
      getPripravnikDnevniki,
      false
    )

    return {
      // Select
      items,
      fetchMore,
      refreshPagination,
    }
  }
)
