import { defineStore, storeToRefs } from "pinia"
import { useRequest } from "@/composables/useRequest"
import { useUporabnikiStore } from "@/stores/admin/useUporabnikiStore"
import { usePagination } from "@/composables/usePagination"
import type { Dnevnik } from "@/types"
import { useSelect } from "@/composables/useSelect"
import { useDate } from "@/composables/useDate"

export const useMentorDnevnikiStore = defineStore("mentorDnevniki", () => {
  const { request } = useRequest()

  const uporabnikStore = useUporabnikiStore()
  const { selectedItem: uporabnik } = storeToRefs(uporabnikStore)

  // Select
  const { selectedItem, selectItem } = useSelect<string>(
    useDate(new Date()).isoDate()
  )

  const getMentorDnevniki = async (): Promise<Dnevnik[]> => {
    if (!uporabnik?.value || uporabnik?.value.role != "lovec") return []

    const response = await request.get<Dnevnik[]>(
      `/dnevniki/admin/mentor/${uporabnik?.value.id}/${selectedItem.value}`
    )

    return response.data
  }

  // Pagination
  const { items, fetchMore, refreshPagination } = usePagination<Dnevnik>(
    getMentorDnevniki,
    true
  )

  return {
    items,
    fetchMore,
    selectItem: selectItem(getMentorDnevniki),
    refreshPagination,
    // TODO: Jage
    // TODO: Obiski
    // TODO: Vpleni
  }
})
