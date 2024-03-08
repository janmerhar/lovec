import { ref, UnwrapRef } from "vue"

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
        // TODO: fix this monstrosity of a type cast
        items.value = [...(items.value as T[]), ...result] as UnwrapRef<T[]>
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

  return {
    items,
    fetchMore,
    refreshPagination,
  }
}
