import { defineStore } from "pinia"
import { computed, ref } from "vue"
import type { InsertDnevnik, Dnevnik } from "@/types"

import { useRequest } from "@/composables/useRequest"
import { FetchFunction, usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"

export const usePripravnikDnevnikStore = defineStore(
  "pripravnikDnevnik",
  () => {
    const { request } = useRequest()

    const getDnevniki = async (page: number): Promise<Dnevnik[]> => {
      const response = await request.get<Dnevnik[]>(
        `/dnevniki/pripravnik/${page}`
      )

      return response.data
    }

    //
    // Pagination
    //

    const { items, fetchMore, refreshPagination } = usePagination<Dnevnik>(
      // TODO: check why I have to cast to FetchFunction<Dnevnik>
      getDnevniki as FetchFunction<Dnevnik>,
      false
    )

    const dnevnikiVariable = items

    const dnevniki = computed(() => dnevnikiVariable.value)

    //
    // CRUD
    //

    const createVplen = async (dnevnik: InsertDnevnik): Promise<Dnevnik> => {
      const response = await request.post<Dnevnik>("/dnevniki", {
        url: "",
        data: dnevnik,
      })

      return response.data
    }

    const crud = useCRUD<Dnevnik>(dnevnikiVariable)
    const { createItem } = crud

    return {
      dnevniki,
      fetchMore,
      refreshPagination,
      createItem: createItem(createVplen, true),
    }
  }
)
