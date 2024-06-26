import { defineStore } from "pinia"
import { computed, ComputedRef, ref } from "vue"

import type { Obisk, Opazovalnica, InsertObisk } from "@/types"
import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"
import { useDate } from "@/composables/useDate"

import { storeToRefs } from "pinia"
import { useOpazovalnicaStore } from "@/stores/useOpazovalnicaStore"

export const useObiskStore = defineStore("obisk", () => {
  const { request } = useRequest()

  const opazovalnicaStore = useOpazovalnicaStore()

  const { selectedItem: selectedOpazovalnica } = storeToRefs(opazovalnicaStore)

  const selectedDatum = ref<string>(useDate(new Date()).isoDate())

  // Tebe mogoce dam v svoj store
  // vbistvu ja, raje te imam v svojem store-u
  const activeObisk = ref<Obisk | null>(null)

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

  const fetchActiveObisk = async (): Promise<Obisk | null> => {
    const response = await request.get<Obisk | null>("/obiski/aktivni")

    activeObisk.value = response.data

    return response.data
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

  //
  // CRUD operations
  //

  const createObisk = async (obisk: InsertObisk): Promise<Obisk> => {
    const response = await request.post<Obisk>("/obiski", {
      url: "",
      data: obisk,
    })

    activeObisk.value = response.data

    return response.data
  }

  const endObisk = async (): Promise<Obisk> => {
    const response = await request.patch<Obisk>(`/obiski/aktivni`)

    if (response.data !== null) {
      activeObisk.value = null
    }

    return response.data
  }

  const crud = useCRUD<Obisk>(obiskiVariable)
  const { createItem, updateItem } = crud

  return {
    // Pagination
    obiski,
    fetchMore,
    refreshPagination,
    opazovalnica,
    setOpazovalnica,
    // Zgodovina mogoce samo za admina
    setDatum,
    // Naredi posebej store
    activeObisk,
    fetchActiveObisk,
    // CRUD
    createItem: createItem(createObisk),
    updateItem: updateItem(endObisk),
  }
})
