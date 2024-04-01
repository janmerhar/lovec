import { defineStore } from "pinia"
import { computed } from "vue"
import type { InsertJaga, Jaga } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { FetchFunction, usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"
import { useSelect } from "@/composables/useSelect"

export const useJagaStore = defineStore("jaga", () => {
  const { request } = useRequest()

  const getJage = async (page: number): Promise<Jaga[]> => {
    const response = await request.get<Jaga[]>(`/jage/${page}`)

    return response.data
  }

  const getUporabnikAktivneJage = async (page: number): Promise<Jaga[]> => {
    const response = await request.get<Jaga[]>(`/jage/aktivne/${page}`)

    return response.data
  }

  const getUporabnikPretekleJage = async (page: number): Promise<Jaga[]> => {
    const response = await request.get<Jaga[]>(`/jage/pretekle/${page}`)

    return response.data
  }

  // select

  const { selectItem, selectedItem } = useSelect<number>(1)

  const fetchJage = () => {
    return async (page: number) => {
      if (selectedItem.value === 1) {
        return await getJage(page)
      }

      if (selectedItem.value === 2) {
        return await getUporabnikAktivneJage(page)
      }

      if (selectedItem.value === 3) {
        return await getUporabnikPretekleJage(page)
      }
    }
  }

  //
  // pagination
  //

  const { items, fetchMore, refreshPagination, reset } = usePagination<Jaga>(
    // TODO: fix this
    fetchJage() as FetchFunction<Jaga>,
    false
  )

  const jagaVariable = items
  const jage = computed(() => jagaVariable.value)

  //
  // CRUD
  //
  const createJaga = async (jaga: InsertJaga): Promise<Jaga> => {
    const response = await request.post<Jaga>("/jage", {
      url: "",
      data: jaga,
    })

    return response.data
  }

  const deleteJaga = async (jaga: Jaga): Promise<boolean> => {
    const response = await request.delete<boolean>(`/jage/${jaga.id}`)

    return response.data
  }

  const updateJaga = async (
    oldVal?: Jaga,
    newVal?: Jaga
  ): Promise<Jaga | null> => {
    if (!oldVal || !newVal) {
      return null
    }

    const response = await request.put<Jaga>(`/jage/${oldVal.id}`, {
      url: "",
      data: newVal,
    })

    return response.data
  }

  const crud = useCRUD<Jaga>(jagaVariable)
  const { createItem, updateItem, deleteItem } = crud

  return {
    selectedItem,
    selectItem: selectItem(reset),
    jage,
    fetchMore,
    refreshPagination,
    // CRUD
    createItem: createItem(createJaga),
    updateItem: updateItem(updateJaga),
    deleteItem: deleteItem(deleteJaga),
    // TODO: ti dne metodi
    // dodajClana
    // odstraniClana
  }
})
