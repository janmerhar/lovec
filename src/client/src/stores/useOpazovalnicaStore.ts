import { defineStore } from "pinia"
import { ComputedRef, computed } from "vue"
import type { InsertOpazovalnica, Opazovalnica } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"
import { useAlert } from "@/composables/useAlert"
import { useSelect } from "@/composables/useSelect"

import i18n from "@/locales/i18n"
const { t } = i18n.global
export const useOpazovalnicaStore = defineStore("opazovalnica", () => {
  const { request } = useRequest()

  // Pagination
  const getOpazovalnice = async (): Promise<Opazovalnica[]> => {
    const response = await request.get<Opazovalnica[]>("/opazovalnice")

    return response.data
  }

  const { items, fetchMore, refreshPagination } = usePagination<Opazovalnica>(
    getOpazovalnice,
    true
  )

  const opazovalniceVariable = items

  const opazovalnice: ComputedRef<Opazovalnica[]> = computed(
    () => opazovalniceVariable.value
  )

  //
  // Admin only routes
  //

  // CRUD
  const createOpazovalnica = async (
    opazovalnica: InsertOpazovalnica
  ): Promise<Opazovalnica> => {
    const response = await request.post<Opazovalnica>("/opazovalnice/", {
      url: "",
      data: opazovalnica,
    })

    return response.data
  }

  const deleteOpazovalnica = async (
    opazovalnica: Opazovalnica
  ): Promise<boolean> => {
    const response = await request.delete<boolean>(
      `/opazovalnice/admin/${opazovalnica.id}`
    )

    return response.data
  }

  const crud = useCRUD<Opazovalnica>(opazovalniceVariable)
  const { createItem, deleteItem } = crud

  const toastDelete = async (opazovalnica: Opazovalnica) => {
    const call = async () => await deleteItem(deleteOpazovalnica)(opazovalnica)

    const { successToastAction } = useAlert()

    await successToastAction(
      call,
      t("opazovalnice.crud.delete.success", { name: opazovalnica.ime })
    )
  }

  // Select
  const { selectedItem, selectItem } = useSelect<Opazovalnica>(null)

  return {
    // Pagination
    opazovalnice,
    fetchMore,
    refreshPagination,
    // CRUD
    createItem: createItem(createOpazovalnica),
    deleteItem: toastDelete,
    // Select
    selectedItem,
    selectItem: selectItem(),
  }
})
