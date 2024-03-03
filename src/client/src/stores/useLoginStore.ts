import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { CapacitorHttp } from "@capacitor/core"

import type { HttpResponse } from "@capacitor/core"
import type { APIResponse, UporabnikLogin } from "@/types"

export const useLoginStore = defineStore(
  "login",
  () => {
    const uporabnik = ref<UporabnikLogin | null>(null)

    const isLogged = computed(() => uporabnik.value !== null)

    const login = async (email: string, geslo: string): Promise<boolean> => {
      if (isLogged.value) {
        return true
      }

      const response: HttpResponse = await CapacitorHttp.post({
        url: `${process.env.VUE_APP_API_URL}/uporabnik/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email,
          geslo,
        },
      })

      const data: APIResponse<UporabnikLogin> = response.data

      if (data.message !== "ERR_LOGIN_INVALID_CREDENTIALS") {
        uporabnik.value = data.data
        return true
      }

      return false
    }

    const logout = async (): Promise<boolean> => {
      if (!isLogged.value) {
        return true
      }

      const response: HttpResponse = await CapacitorHttp.post({
        url: `${process.env.VUE_APP_API_URL}/uporabnik/logout`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${uporabnik.value?.token}`,
        },
      })

      const data: APIResponse<boolean> = response.data

      if (data.data) {
        uporabnik.value = null
        return true
      }

      return false
    }

    const token = computed(() => uporabnik.value?.token)
    const refreshToken = computed(() => uporabnik.value?.refresh_token)

    const updateToken = (token: string) => {
      if (uporabnik.value) {
        uporabnik.value.token = token
      }
    }

    const updateRefreshToken = (refreshToken: string) => {
      if (uporabnik.value) {
        uporabnik.value.refresh_token = refreshToken
      }
    }

    return {
      uporabnik,
      login,
      logout,
      isLogged,
      token,
      refreshToken,
      updateToken,
      updateRefreshToken,
    }
  },
  {
    persist: true,
  }
)
