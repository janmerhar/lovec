import { defineStore, storeToRefs } from "pinia"
import { computed, ref } from "vue"
import { useRequest } from "@/composables/useRequest"
import type {
  InsertUporabnik,
  UporabnikDetails,
  UporabnikProfile,
} from "@/types"
import { usePagination } from "@/composables/usePagination"
import { useCRUD } from "@/composables/useCRUD"
import { useAlert } from "@/composables/useAlert"
import { useLoginStore } from "@/stores/useLoginStore"
import { useSelect } from "@/composables/useSelect"

import i18n from "@/locales/i18n"
const { t } = i18n.global

export const useUporabnikiStore = defineStore(
  "uporabniki",
  () => {
    const { request } = useRequest()

    const getUporabniki = async (
      page: number,
      query: string
    ): Promise<UporabnikDetails[]> => {
      const response = await request.post<UporabnikDetails[]>(
        `/uporabnik/vsi/${page}`,
        {
          url: "",
          data: {
            query: query,
          },
        }
      )

      return response.data
    }

    // Pagination
    const search = ref<string>("")

    const getSearchUporabniki = async (page: number) =>
      await getUporabniki(page, search.value)

    const { items, fetchMore, refreshPagination } =
      // @ts-ignore
      usePagination<UporabnikDetails>(getSearchUporabniki)

    const uporabnikVariable = items
    const uporabniki = computed(() => uporabnikVariable.value)

    const searchItem = async (query: string) => {
      search.value = query
      await refreshPagination()
    }

    // Select
    const fetchUporabnik = async (
      uporabnik: UporabnikDetails | string
    ): Promise<UporabnikProfile | null> => {
      const selectedId =
        typeof uporabnik === "string" ? uporabnik : uporabnik.id

      const response = await request.get<UporabnikProfile | null>(
        `/uporabnik/${selectedId}`
      )

      return response.data
    }

    const { selectedItem, selectItem, fetchItem } =
      useSelect<UporabnikProfile | null>()

    // CRUD
    const crud = useCRUD<UporabnikDetails>(uporabnikVariable)
    const { createItem, deleteItem } = crud

    // TODO: usposobi za multipart/form-data
    // na use request posebej klice za POST metodo
    // TODO: i think you are good now ...
    const createUporabnik = async (
      uporabnik: InsertUporabnik
    ): Promise<UporabnikDetails> => {
      const loginStore = useLoginStore()

      const { token } = storeToRefs(loginStore)
      // convert insertUporabnik to FormData
      const formData = new FormData()

      for (const key in uporabnik) {
        // @ts-ignore
        formData.append(key, uporabnik[key])
      }

      const result = await request.post<UporabnikDetails>(
        "/uporabnik/register",
        {
          url: "",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token.value}`,
          },
          data: formData,
        }
      )

      console.log("register return", result)
      return result.data
    }

    const deleteUporabnik = async (
      uporabnik: UporabnikDetails
    ): Promise<boolean> => {
      const response = await request.delete<boolean>(
        `/uporabnik/${uporabnik.id}`
      )

      return response.data
    }

    const toastDelete = async (uporabnik: UporabnikDetails) => {
      const call = async () => await deleteItem(deleteUporabnik)(uporabnik)

      // @ts-ignore
      const { successToastAction } = useAlert()

      await successToastAction(
        call,
        t("admin_uporabniki.tab.crud.delete.success", { name: uporabnik.ime })
      )
    }

    return {
      uporabniki,
      fetchMore,
      refreshPagination,
      searchItem,
      // CRUD
      createItem: createItem(createUporabnik),
      deleteItem: toastDelete,
      // Select
      selectedItem,
      selectItem,
      // @ts-ignore
      fetchItem: fetchItem(fetchUporabnik),
    }
  },
  {
    persist: true,
  }
)
