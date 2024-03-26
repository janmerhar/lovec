import { defineStore } from "pinia"
import { computed, ComputedRef } from "vue"
import type { InsertOprema, Oprema } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"
import { useAlert } from "@/composables/useAlert"

import i18n from "@/locales/i18n"
const { t } = i18n.global

export const useOpremaStore = defineStore(
  "oprema",
  () => {
    const { request } = useRequest()

    const getOprema = async (): Promise<Oprema[]> => {
      const response = await request.get<Oprema[]>("/oprema")

      return response.data
    }

    const { items, fetchMore, refreshPagination } = usePagination<Oprema>(
      getOprema,
      true
    )

    const opremaVariable = items
    const oprema: ComputedRef<Oprema[]> = computed(() => opremaVariable.value)

    const createOprema = async (oprema: InsertOprema): Promise<Oprema> => {
      const response = await request.post<Oprema>("/oprema", {
        url: "",
        data: oprema,
      })

      return response.data
    }

    const deleteOprema = async (oprema: Oprema): Promise<boolean> => {
      const response = await request.delete<boolean>(`/oprema/${oprema.id}`)

      return response.data
    }

    const crud = useCRUD<Oprema>(opremaVariable)
    const { createItem, deleteItem } = crud

    const toastDelete = async (oprema: Oprema) => {
      const call = async () => await deleteItem(deleteOprema)(oprema)

      const { successToastAction } = useAlert()

      await successToastAction(
        call,
        t("oprema.crud.delete.success", { name: oprema.naziv })
      )
    }

    return {
      oprema,
      fetchMore,
      refreshPagination,
      getOprema,
      deleteItem: toastDelete,
      createItem: createItem(createOprema),
    }
  },
  {
    persist: true,
  }
)
