/*
 * Tukaj hranim obisk trenutnega uporabnika
 * - torej ali trenutno obiskuje opazovalnico ali ne
 * - ni pa hramba vseh uporabnikovih obiskov
 *
 * CRUD operacije
 * - zacetek obiska za tega uporabnika
 * - zakljucek obiska za tega uporabnika
 *
 * CILJ
 * - narediti neki top bar na zemljevidu / celi aplikaciji,
 *   ki oznanuje uporabniku, da se nahaja sredi obiska
 * - po moje je najboljse, da je samo na zemljevidu, saj bi sicer bilo prevec
 *   nadlezno implementirati in motece uporabniku
 */

import { defineStore } from "pinia"

import { useRequest } from "@/composables/useRequest"
import { useSelect } from "@/composables/useSelect"
import type { Obisk, Opazovalnica } from "@/types"

export const useActiveObiskStore = defineStore("activeObisk", () => {
  const { request } = useRequest()

  // Select
  const { selectedItem, selectItem, deselectItem } = useSelect<Obisk | null>(
    null
  )

  const fetchActiveObisk = async (): Promise<Obisk | null> => {
    const response = await request.get<Obisk | null>("/obiski/aktivni")

    await selectItem()(response.data)

    return response.data
  }

  const startObisk = async (opazovalnica: Opazovalnica): Promise<Obisk> => {
    const response = await request.post<Obisk>("/obiski", {
      url: "",
      data: {
        opazovalnica: opazovalnica.id,
      },
    })

    selectItem()(response.data)

    return response.data
  }

  const endObisk = async (): Promise<Obisk | null> => {
    const response = await request.patch<Obisk | null>("/obiski/aktivni")

    await deselectItem()()

    return response.data
  }

  return {
    // Select
    selectedItem,
    fetchItem: fetchActiveObisk,
    deselectItem: endObisk,
    startObisk,
  }
})
