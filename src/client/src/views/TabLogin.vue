<template>
  <tab-template>
    <template #header>
      <img src="" class="center" />
    </template>
    <template #body>
      <Form :validation-schema="loginSchema" @submit="loginRedirect">
        <Field name="email" type="email" v-model="inputData.email" />
        <ErrorMessage name="email" />
        <br />
        <Field name="password" type="password" v-model="inputData.password" />
        <ErrorMessage name="password" />

        <button type="submit">{{ $t("login.tab.input.submit") }}</button>
      </Form>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"

import { useLoginStore } from "@/stores/useLoginStore"
import { useTabNavigation } from "@/composables/useTabNavigation"
import { useAlert } from "@/composables/useAlert"
import i18n from "@/locales/i18n"

const t = i18n.global.t

import { Form, Field, ErrorMessage } from "vee-validate"
import { loginSchema } from "@/text-validation/loginSchemas"

// Initial values
const inputData = {
  email: "",
  password: "",
}

const { login } = useLoginStore()
const { redirectTo } = useTabNavigation()

const loginRedirect = async () => {
  const result = await login(inputData.email, inputData.password)

  if (result) {
    redirectTo("oprema")
  } else {
    useAlert().errorToast(t("login.tab.alert.loginError"))
  }
}
</script>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
  display: block;
}

img {
  height: 50vh;
  width: 100%;
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
</style>
