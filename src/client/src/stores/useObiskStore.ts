import { defineStore } from "pinia"
import { computed, ComputedRef, ref } from "vue"

import type { Obisk, Opazovalnica } from "@/types"
import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"

export const useObiskStore = defineStore("obisk", () => {
  const { request } = useRequest()

  const selectedOpazovalnica = ref<Opazovalnica | null>(null)
  const selectedDatum = ref<string>(new Date().toISOString().split("T")[0])

  const fetchObiski = async (
    chosenOpazovalnica: Opazovalnica,
    chosenDatum: string
  ): Promise<Obisk[]> => {
    const response = await request.get<Obisk[]>(
      `/obiski/opazovalnica/${chosenOpazovalnica.id}/${chosenDatum}`
    )

    return response.data
  }

  const fetchCurrentObiski = async (): Promise<Obisk[]> => {
    if (selectedOpazovalnica.value) {
      const result = await fetchObiski(
        selectedOpazovalnica.value,
        selectedDatum.value
      )

      return result
    }

    return []
  }

  const setDatum = async (newDatum?: string) => {
    if (!newDatum) {
      newDatum = new Date().toISOString().split("T")[0]
    } else {
      selectedDatum.value = newDatum
    }

    await refreshPagination()
  }

  const setOpazovalnica = async (newOpazovalnica: Opazovalnica) => {
    selectedOpazovalnica.value = newOpazovalnica

    await setDatum()
  }

  //
  // Pagination setup
  //
  const { items, fetchMore, refreshPagination } = usePagination<Obisk>(
    fetchCurrentObiski,
    true
  )

  const obiskiVariable = items
  const obiski: ComputedRef<Obisk[]> = computed(() => obiskiVariable.value)
  const opazovalnica = computed(() => selectedOpazovalnica.value)

  return {
    opazovalnica,
    obiski,
    setOpazovalnica,
    setDatum,
    fetchMore,
    refreshPagination,
  }
})
