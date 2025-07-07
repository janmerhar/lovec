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
export const useOpazovalnicaStore = defineStore(
  "opazovalnica",
  () => {
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

    // EDIT ti manjka !!!!

    const deleteOpazovalnica = async (
      oldVal?: Opazovalnica,
      newVal?: Opazovalnica
    ): Promise<Opazovalnica | null> => {
      if (!oldVal || !newVal) {
        return null
      }
      const response = await request.delete<boolean>(
        `/opazovalnice/admin/${oldVal.id}`
      )

      if (response) {
        oldVal.isDeleted = true
      }

      return oldVal
    }

    const crud = useCRUD<Opazovalnica>(opazovalniceVariable)
    const { createItem, updateItem } = crud

    const toastDelete = async (opazovalnica: Opazovalnica) => {
      const call = async () =>
        await updateItem(deleteOpazovalnica)(opazovalnica, opazovalnica)

      const { successToastAction } = useAlert()

      await successToastAction(
        call,
        t("admin_opazovalnica.crud.delete.success", { name: opazovalnica.ime })
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
  },
  {
    persist: true,
  }
)
