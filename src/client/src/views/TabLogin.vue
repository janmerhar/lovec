<template>
  <div
    style="
      height: 100vh;
      box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.15);
      background-size: 200%;
      background-position: 60% 60%;
      z-index: -1;
    "
    :style="{
      backgroundImage: `url(${require('../../public/assets/login-page-background.jpeg')})`,
    }"
  >
    <Form
      :validation-schema="loginSchema"
      @submit="loginRedirect"
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        gap: 5px;
      "
    >
      <!-- Language icon -->
      <div
        style="
          position: fixed;
          top: 20px;
          right: 20px;
          color: var(--ion-color-primary);
          cursor: pointer;
        "
        @click="
          useModal().openSheetModal(SheetModalSelect, languageSelectModalProps)
        "
      >
        <font-awesome-icon :icon="['fas', 'language']" size="2xl" fixed-width />
      </div>

      <input-label-horizontal style="width: 85%">
        <template #left
          ><font-awesome-icon :icon="['fas', 'user']" fixed-width
        /></template>
        <template #input>
          <Field name="email" type="email" v-model="inputData.email" />
        </template>
        <template #error>
          <ErrorMessage name="email" />
        </template>
      </input-label-horizontal>
      <!--  -->
      <input-label-horizontal
        class="input-label-horizontal"
        style="margin-top: -10px; width: 85%"
      >
        <template #left
          ><font-awesome-icon :icon="['fas', 'key']" fixed-width
        /></template>
        <template #input>
          <Field name="password" type="password" v-model="inputData.password" />
        </template>
        <template #error>
          <ErrorMessage name="password" />
        </template>
      </input-label-horizontal>

      <button
        type="submit"
        style="
          position: fixed;
          bottom: 50px;
          width: 85%;
          height: 2.5rem;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 1px;
          border-radius: 10px;
        "
      >
        {{ $t("login.tab.input.submit") }}
      </button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import InputLabelHorizontal from "@/components/ui-components/input/InputLabelHorizontal.vue"

import { useLoginStore } from "@/stores/useLoginStore"
import { useTabNavigation } from "@/composables/useTabNavigation"
import { useAlert } from "@/composables/useAlert"
import i18n from "@/locales/i18n"

const t = i18n.global.t

import { Form, Field, ErrorMessage } from "vee-validate"
import { loginSchema } from "@/text-validation/loginSchemas"
import { storeToRefs } from "pinia"

const inputData = {
  email: "",
  password: "",
}

const { login } = useLoginStore()
const { redirectTo } = useTabNavigation()

const { isAdmin } = storeToRefs(useLoginStore())

const loginRedirect = async () => {
  const result = await login(inputData.email, inputData.password)

  if (result) {
    if (isAdmin.value) {
      redirectTo("admin_druzine")
    } else {
      redirectTo("oprema")
    }
  } else {
    useAlert().errorToast(t("login.tab.alert.loginError"))
  }
}

// Language select
import { useModal } from "@/composables/useModal"
import { codeToLanguage } from "@/locales/i18n"
import type { Locale } from "@/locales/i18n"
import { usePreferencesStore } from "@/stores/usePreferencesStore"

import SheetModalSelect from "@/components/ui-components/modal/SheetModalSelect.vue"
import { computed } from "vue"

const preferencesStore = usePreferencesStore()
const { selectLanguage } = preferencesStore

const languageSelectModalProps = {
  header: computed(() => t("izkaznica.tab.sections.language")),
  items: codeToLanguage,
  displayItem: (item: string) => item,
  selectItem: async (item: string) => {
    selectLanguage(
      Object.keys(codeToLanguage).find(
        // @ts-ignore
        (key: string) => codeToLanguage[key] === item
      ) as Locale // Explicitly assert the type here
    )
  },
}
</script>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
  display: block;
}

img {
  height: 100vh;
  background-size: cover;
}

.button {
  margin-top: 2rem;
  margin-bottom: 1rem;
  height: 2.8rem !important;
}

p {
  text-decoration: underline;
  cursor: pointer;
}

.centered-content {
  padding-top: 5vh;
}

.input-label-horizontal {
  border-radius: 10px;
}
</style>
