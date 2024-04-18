import { defineStore, storeToRefs } from "pinia"
import { computed, ref } from "vue"
import { useRequest } from "@/composables/useRequest"
import type {
  InsertUporabnik,
  UporabnikDetails,
  UporabnikProfile,
} from "@/types"
import { usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"
import { useAlert } from "@/composables/useAlert"
import { useLoginStore } from "@/stores/useLoginStore"
import { useSelect } from "@/composables/useSelect"

import i18n from "@/locales/i18n"
const { t } = i18n.global

export const useSearchUporabnikiStore = defineStore("searchUporabniki", () => {
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

  // Select
  const fetchUporabnik = async (
    uporabnik: UporabnikDetails | string
  ): Promise<UporabnikProfile | null> => {
    const selectedId = typeof uporabnik === "string" ? uporabnik : uporabnik.id

    const response = await request.get<UporabnikProfile | null>(
      `/uporabnik/${selectedId}`
    )

    return response.data
  }

  const { selectedItem, selectItem, fetchItem } =
    useSelect<UporabnikProfile | null>()

  return {
    uporabniki,
    fetchMore,
    refreshPagination,
    searchItem,
    // Select
    selectedItem,
    selectItem,
    // @ts-ignore
    fetchItem: fetchItem(fetchUporabnik),
  }
})
