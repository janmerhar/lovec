import { ref, UnwrapRef } from "vue"
import _ from "lodash"

export type FetchFunction<T> = (page?: number) => Promise<T[]>

export const usePagination = <T>(
  fetchFunction: FetchFunction<T>,
  isSinglePage = false
) => {
  const items = ref<T[]>([])

  const page = ref<number>(1)
  const isMore = ref<boolean>(true)

  const fetchMore = async (): Promise<T[] | null> => {
    if (!isMore.value) {
      return null
    }

    // Fetching non paginated data
    if (isSinglePage) {
      isMore.value = false

      const result = await fetchFunction()

      // TODO: fix this monstrosity of a type cast
      items.value = [...(items.value as T[]), ...result] as UnwrapRef<T[]>

      return result
    }

    // Fetching paginated data
    if (!isSinglePage) {
      const result = await fetchFunction(page.value)

      if (result.length === 0) {
        isMore.value = false
      } else {
        items.value = [...(items.value as T[]), ...result] as UnwrapRef<T[]>
        items.value = _.uniqWith(items.value, _.isEqual)

        page.value += 1
      }

      return result
    }

    return null
  }

  const refreshPagination = async (event?: CustomEvent) => {
    // Saving total pages fetched
    const page_count = page.value

    // Resetting page
    items.value = []
    page.value = 1
    isMore.value = true

    // Refetching only pages that were already fetched
    for (let i = 1; i <= page_count; i++) {
      await fetchMore()
    }

    // Checking if loading spinner is created by ion-infinite-scroll
    if (event) {
      event.detail.complete()
    }
  }

  const reset = async (): Promise<T[] | null> => {
    // Resetting page
    items.value = []
    page.value = 1
    isMore.value = true

    // Fetching first page
    const result = await fetchMore()

    return result
  }

  return {
    items,
    fetchMore,
    refreshPagination,
    reset,
  }
}
