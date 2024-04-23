import { defineStore, storeToRefs } from "pinia"
import { computed, ref } from "vue"
import type { Dnevnik } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"
import type { FetchFunction } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"
import { useSelect } from "@/composables/useSelect"

export const useMentorDnevnikStore = defineStore("mentorDnevnik", () => {
  const { request } = useRequest()

  //
  // select
  //
  const select = useSelect<string>(new Date().toISOString().split("T")[0])
  const { selectedItem, selectItem } = select

  const getDnevnikiDatum = async (datum: string): Promise<Dnevnik[]> => {
    const response = await request.get<Dnevnik[]>(`/dnevniki/mentor/${datum}`)

    return response.data
  }

  const getDnevniki = async (): Promise<Dnevnik[]> => {
    if (!selectedItem.value) {
      return []
    }

    return getDnevnikiDatum(selectedItem.value)
  }

  //
  // pagination
  //

  const { items, fetchMore, refreshPagination } = usePagination<Dnevnik>(
    getDnevniki as FetchFunction<Dnevnik>,
    true
  )

  const dnevnikiVariable = items
  const dnevniki = computed(() => dnevnikiVariable.value)

  //
  // CRUD
  //

  const updateDnevnikPotrjen = async (
    oldVal: Dnevnik | undefined
  ): Promise<Dnevnik | null> => {
    if (!oldVal) {
      return null
    }

    const response = await request.patch<Dnevnik>(
      `/dnevniki/${oldVal.id}/status/potrjen`
    )

    return response.data
  }

  const updateDnevnikZavrnjen = async (
    oldVal: Dnevnik | undefined
  ): Promise<Dnevnik | null> => {
    if (!oldVal) {
      return null
    }

    const response = await request.patch<Dnevnik>(
      `/dnevniki/${oldVal.id}/status/zavrnjen`
    )

    return response.data
  }

  const crud = useCRUD<Dnevnik>(dnevnikiVariable)
  const { updateItem } = crud

  return {
    dnevniki,
    fetchMore,
    refreshPagination,
    selectedItem,
    selectItem: selectItem(refreshPagination),
    updateItemPotrjen: updateItem(updateDnevnikPotrjen),
    updateItemZavrnjen: updateItem(updateDnevnikZavrnjen),
  }
})
