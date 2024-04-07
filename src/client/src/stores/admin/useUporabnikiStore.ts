import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useRequest } from "@/composables/useRequest"
import type { UporabnikDetails } from "@/types"
import { usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"
import { useAlert } from "@/composables/useAlert"

import i18n from "@/locales/i18n"
const { t } = i18n.global

export const useUporabnikiStore = defineStore("uporabniki", () => {
  const { request } = useRequest()

  const getUporabniki = async (
    page: number,
    query: string
  ): Promise<UporabnikDetails[]> => {
    const response = await request.post<UporabnikDetails[]>(
      `/uporabnik/vsi/${page}`,
      {
        url: "",
        data: {
          query: query,
        },
      }
    )

    return response.data
  }

  // Pagination
  const search = ref<string>("")

  const getSearchUporabniki = async (page: number) =>
    await getUporabniki(page, search.value)

  const { items, fetchMore, refreshPagination } =
    // @ts-ignore
    usePagination<UporabnikDetails>(getSearchUporabniki)

  const uporabnikVariable = items
  const uporabniki = computed(() => uporabnikVariable.value)

  const searchItem = async (query: string) => {
    search.value = query
    await refreshPagination()
  }

  // CRUD
  const crud = useCRUD<UporabnikDetails>(uporabnikVariable)
  const { deleteItem } = crud

  const deleteUporabnik = async (
    uporabnik: UporabnikDetails
  ): Promise<boolean> => {
    const response = await request.delete<boolean>(`/uporabnik/${uporabnik.id}`)

    return response.data
  }

  const toastDelete = async (uporabnik: UporabnikDetails) => {
    const call = async () => await deleteItem(deleteUporabnik)(uporabnik)

    // @ts-ignore
    const { successToastAction } = useAlert()

    await successToastAction(
      call,
      t("admin_uporabniki.tab.crud.delete.success", { name: uporabnik.ime })
    )
  }

  return {
    uporabniki,
    fetchMore,
    refreshPagination,
    searchItem,
    // CRUD
    deleteItem: toastDelete,
  }
})
