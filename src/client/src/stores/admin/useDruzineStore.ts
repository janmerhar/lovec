import { defineStore } from "pinia"
import { computed, ComputedRef } from "vue"
import type { DruzinaDetails, Druzina, InsertDruzina } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"
import { useAlert } from "@/composables/useAlert"
import { useSelect } from "@/composables/useSelect"

import i18n from "@/locales/i18n"
const { t } = i18n.global

export const useDruzineStore = defineStore("druzine", () => {
  const { request } = useRequest()

  const getDruzine = async (): Promise<DruzinaDetails[]> => {
    const response = await request.get<DruzinaDetails[]>("/druzine")

    return response.data
  }

  // Pagination
  const { items, fetchMore, refreshPagination } = usePagination<DruzinaDetails>(
    getDruzine,
    false
  )

  const druzineVariable = items
  const druzine: ComputedRef<DruzinaDetails[]> = computed(
    () => druzineVariable.value
  )

  // CRUD
  const createDruzina = async (
    druzina: InsertDruzina
  ): Promise<DruzinaDetails> => {
    const response = await request.post<Druzina>("/druzine", {
      url: "",
      data: druzina,
    })

    return {
      id: response.data.id,
      ime: response.data.ime,
      revirjiCount: 0,
      claniCount: 0,
    }
  }

  const deleteDruzina = async (druzina: DruzinaDetails): Promise<boolean> => {
    const response = await request.delete<boolean>(`/druzine/${druzina.id}`)

    return response.data
  }

  const crud = useCRUD<DruzinaDetails>(druzineVariable)
  const { createItem, deleteItem, updateItem } = crud

  const toastDelete = async (druzina: DruzinaDetails) => {
    const call = async () => await deleteItem(deleteDruzina)(druzina)

    const { successToastAction } = useAlert()

    successToastAction(
      call,
      t("admin_druzine.tab.crud.delete.success", { name: druzina.ime })
    )
  }

  // Select
  const fetchDruzina = async (
    druzina: DruzinaDetails | string
  ): Promise<Druzina | null> => {
    const id = typeof druzina === "string" ? druzina : druzina.id

    const response = await request.get<Druzina>(`/druzine/${id}`)

    return response.data
  }

  const { selectedItem, selectItem, fetchItem } =
    useSelect<DruzinaDetails | null>(null)

  return {
    druzine,
    fetchMore,
    refreshPagination,
    // CRUD
    createItem: createItem(createDruzina),
    deleteItem: toastDelete,
    // Select
    selectedItem,
    selectItem,
    // @ts-ignore
    fetchItem: fetchItem(fetchDruzina),
  }
})
