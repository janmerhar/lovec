import { defineStore, storeToRefs } from "pinia"
import { useRequest } from "@/composables/useRequest"
import { useUporabnikiStore } from "@/stores/admin/useUporabnikiStore"
import { usePagination } from "@/composables/usePagination"
import { useSelect } from "@/composables/useSelect"
import type { Jaga } from "@/types"

export const useUporabnikJageStore = defineStore("uporabnikJage", () => {
  const { request } = useRequest()

  const uporabnikStore = useUporabnikiStore()
  const { selectedItem: uporabnik } = storeToRefs(uporabnikStore)

  // Select
  const { selectedItem, selectItem } = useSelect<number>(1)

  // Pagination
  const getJageAktivne = async (page?: number): Promise<Jaga[]> => {
    if (!uporabnik?.value || !page) return []

    const response = await request.get<Jaga[]>(
      `/jage/admin/uporabnik/${uporabnik?.value.id}/aktivne/${page}`
    )

    return response.data
  }

  const getJagePretekle = async (page?: number): Promise<Jaga[]> => {
    if (!uporabnik?.value || !page) return []

    const response = await request.get<Jaga[]>(
      `/jage/admin/uporabnik/${uporabnik?.value.id}/pretekle/${page}`
    )

    return response.data
  }

  const getJage = async (page?: number): Promise<Jaga[]> => {
    if (selectedItem.value == 1) {
      return await getJageAktivne(page)
    }

    return await getJagePretekle(page)
  }

  const { items, fetchMore, refreshPagination } = usePagination<Jaga>(getJage)

  return {
    // Select
    selectedItem,
    selectItem: selectItem(refreshPagination),
    // Pagination
    items,
    fetchMore,
    refreshPagination,
  }
})
