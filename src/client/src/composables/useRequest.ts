import { reactive, ref } from "vue"
import { CapacitorHttp } from "@capacitor/core"
import type { HttpResponse, HttpOptions } from "@capacitor/core"

import { useLoginStore } from "@/stores/useLoginStore"
import type { APIResponse, JWTTokenPair } from "@/types"
import { storeToRefs } from "pinia"

export const useRequest = () => {
  const baseURL = ref<string>(`${import.meta.env.VITE_API_URL}`)

  const loginStore = useLoginStore()

  const requestLong = async (
    method: string,
    url: string,
    options: HttpOptions
  ) => {
    const { token } = storeToRefs(loginStore)
    const requestOptions = Object.assign(
      {},
      {
        url: baseURL.value,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      },
      options,
      {
        url: `${baseURL.value}${url}`,
        method: method, // POST, GET, PUT, DELETE, PATCH
      }
    )

    return await CapacitorHttp.request(requestOptions)
  }

  const refreshTokenCall =
    async (): Promise<APIResponse<JWTTokenPair> | null> => {
      if (!loginStore.refreshToken) {
        return null
      }

      const options: HttpOptions = {
        url: `${import.meta.env.VITE_API_URL}/uporabnik/refresh`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          refresh_token: loginStore.refreshToken,
        },
      }

      const response: HttpResponse = await CapacitorHttp.post(options)

      if (response.data.data != null) {
        return response.data as APIResponse<JWTTokenPair>
      }

      return null
    }

  const createAuthenticatedRequest = (method: string) => {
    // TODO: mogoce ne bi rad vracal null, ker mi to pokvari veliko stvari
    // https://www.dhiwise.com/post/typescript-error-handling-pitfalls-and-how-to-avoid-them
    // raje vrzem error...
    return async <T>(
      url: string,
      options: HttpOptions = { url: "" }
    ): Promise<APIResponse<T>> => {
      // Making request for the first time
      const result = await requestLong(method, url, options)

      if (result.data.status >= 200 && result.data.status < 400) {
        return result.data as APIResponse<T>
      }

      // Refreshing token
      if (result.data.status != 401) {
        throw new Error("TOKEN_NON_EXISTENT")
      }

      const refresh = await refreshTokenCall()

      // In case refresh is not successful
      // we are logging out the user
      if (refresh == null) {
        const { logout } = loginStore
        logout()
        throw new Error("TOKEN_REFRESH_FAILED")
      }

      const { updateToken, updateRefreshToken } = loginStore
      updateToken(refresh.data?.accessToken)
      updateRefreshToken(refresh.data?.refreshToken)

      // Retrying request with refreshed token
      const result2 = await requestLong(method, url, options)
      return result2.data as APIResponse<T>
    }
  }

  const request = reactive({
    get: createAuthenticatedRequest("GET"),
    post: createAuthenticatedRequest("POST"),
    put: createAuthenticatedRequest("PUT"),
    delete: createAuthenticatedRequest("DELETE"),
    patch: createAuthenticatedRequest("PATCH"),
  })

  return {
    request,
  }
}
