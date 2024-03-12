import { defineStore } from "pinia"
import { computed, ref } from "vue"
import type { Dnevnik } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"
import type { FetchFunction } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"

export const useMentorDnevnikStore = defineStore("mentorDnevnik", () => {
  const { request } = useRequest()

  const datum = ref<string>(new Date().toISOString().split("T")[0])

  const setDatum = async (newDatum: string) => {
    datum.value = newDatum
    await refreshPagination()
  }

  const getDnevnikiDatum = async (datum: string): Promise<Dnevnik[]> => {
    const response = await request.get<Dnevnik[]>(`/dnevniki/mentor/${datum}`)

    return response.data
  }

  const getDnevniki = async (): Promise<Dnevnik[]> => {
    return getDnevnikiDatum(datum.value)
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
      `/dnevniki/${oldVal.id}/potrjen`
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
      `/dnevniki/${oldVal.id}/zavrnjen`
    )

    return response.data
  }

  const crud = useCRUD<Dnevnik>(dnevnikiVariable)
  const { updateItem } = crud

  return {
    dnevniki,
    fetchMore,
    refreshPagination,
    datum,
    updateItemPotrjen: updateItem(updateDnevnikPotrjen),
    updateItemZavrnjen: updateItem(updateDnevnikZavrnjen),
  }
})
