import type { Ref } from "vue"
import _ from "lodash"

export type DeleteFunction<T> = (data: T) => Promise<boolean>
export const useCRUD = <T>(items: Ref<T[]>) => {

  const createItem = <I>(call: CreateFunction<I, T>, addToStart = false) => {
    return async <T>(data: I): Promise<T | null> => {
      // in case it fails, add to queue
      const result = await call(data)

      if (!result) {
        return null
      }

      // in case it fails, add to queue
      if (addToStart) {
      items.value.unshift(result)
      } else {
        items.value.push(result)
      }

      return result as T
    }
  }

  const deleteItem = (call: DeleteFunction<T>) => {
    return async (original: T): Promise<boolean> => {
      // in case it fails, add to queue
      const result = await call(original)

      if (!result) {
        return false
      }

      // removing deleted item
      items.value = items.value.filter((item) => !_.isEqual(item, original))

      return true
    }
  }

  const updateItem = <U = T>(call: UpdateFunction<T, U>) => {
    return async (original: T, data?: U): Promise<T | null> => {
      // in case it fails, add to queue
      const result = await call(original, data)

      if (!result) {
        return null
      }

      // updating the item
      items.value = items.value.map((item) =>
        _.isEqual(item, original) ? result : item
      )

      return result as T
    }
  }

  return {
    createItem,
    deleteItem,
    updateItem,
    }
  }
