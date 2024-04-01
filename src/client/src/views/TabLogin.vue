<template>
  <div
    style="
      height: 100vh;
      box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.15);
      background-image: url('https://images.unsplash.com/photo-1503435980610-a51f3ddfee50');
      background-size: 200%;
      background-position: 60% 60%;
      z-index: -1;
    "
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
      <div style="position: fixed; top: 15px; right: 20px">ICON</div>
      <!--  -->
      <input-label-left>
        <template #icon
          ><font-awesome-icon
            style="padding-left: 0.5rem; padding-top: 1rem"
            :icon="['fas', 'people-group']"
            fixed-width
        /></template>
        <template #input>
          <Field
            name="email"
            type="email"
            v-model="inputData.email"
            style="
              background-color: var(--ion-color-step-300);
              border: none;
              padding: 0.5rem;
              margin: 0;
            "
          />
        </template>
        <template #error>
          <ErrorMessage name="email" />
        </template>
      </input-label-left>

      <Field name="password" type="password" v-model="inputData.password" />
      <ErrorMessage name="password" />

      <button
        type="submit"
        style="
          position: fixed;
          bottom: 50px;
          width: 80%;
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
import InputLabelLeft from "@/components/ui-components/input/InputLabelLeft.vue"

import { useLoginStore } from "@/stores/useLoginStore"
import { useTabNavigation } from "@/composables/useTabNavigation"
import { useAlert } from "@/composables/useAlert"
import i18n from "@/locales/i18n"

const t = i18n.global.t

import { Form, Field, ErrorMessage } from "vee-validate"
import { loginSchema } from "@/text-validation/loginSchemas"
import { storeToRefs } from "pinia"

// Initial values
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
</style>
