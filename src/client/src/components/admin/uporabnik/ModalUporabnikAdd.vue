<template>
  <modal-template>
    <template #header>
      <modal-header
        :confirm-button="true"
        @cancel="useModal().cancelModal"
        @confirm="
          submitForm(
            createItem,
            insertUporabnik,
            $t('admin_uporabniki.tab.crud.create.success', {
              name: `${insertUporabnik.ime} ${insertUporabnik.priimek}`,
            })
          )
        "
      >
        {{ $t("admin_uporabniki.tab.crud.create.header") }}
      </modal-header>
    </template>
    <!--  -->
    <template #body>
      <Form ref="form" :validation-schema="uporabnikAddSchema">
        <div>
          <!-- update this field so that it only accepts images -->

          <Field
            as="input"
            type="file"
            name="slika"
            v-model="insertUporabnik.slika"
            ref="file"
          />
          <ErrorMessage name="slika" />
        </div>
        <!-- IME -->
        <input-label-top>
          <template #label>{{
            $t("admin_uporabniki.tab.crud.categories.ime")
          }}</template>
          <template #input>
            <Field name="ime" type="text" v-model="insertUporabnik.ime" />
          </template>
          <template #error>
            <ErrorMessage name="ime" />
          </template>
        </input-label-top>
        <!-- PRIIMEK -->
        <input-label-top>
          <template #label>{{
            $t("admin_uporabniki.tab.crud.categories.priimek")
          }}</template>
          <template #input>
            <Field
              name="priimek"
              type="text"
              v-model="insertUporabnik.priimek"
            />
          </template>
          <template #error>
            <ErrorMessage name="priimek" />
          </template>
        </input-label-top>
        <!-- EMAIL -->
        <input-label-top>
          <template #label>{{
            $t("admin_uporabniki.tab.crud.categories.email")
          }}</template>
          <template #input>
            <Field name="email" type="email" v-model="insertUporabnik.email" />
          </template>
          <template #error>
            <ErrorMessage name="email" />
          </template>
        </input-label-top>
        <!-- GESLO -->
        <input-label-top>
          <template #label>{{
            $t("admin_uporabniki.tab.crud.categories.geslo")
          }}</template>
          <template #input>
            <Field
              name="geslo"
              type="password"
              v-model="insertUporabnik.geslo"
            />
          </template>
          <template #error>
            <ErrorMessage name="geslo" />
          </template>
        </input-label-top>
        <!-- GESLO REPEAT -->
        <input-label-top>
          <template #label>{{
            $t("admin_uporabniki.tab.crud.categories.gesloRepeat")
          }}</template>
          <template #input>
            <!-- no need to save repeated password -->
            <Field name="geslo_repeat" type="password" />
          </template>
          <template #error>
            <ErrorMessage name="geslo_repeat" />
          </template>
        </input-label-top>
        <!-- ROLE -->
        <input-label-top>
          <template #label>{{
            $t("admin_uporabniki.tab.crud.categories.role")
          }}</template>
          <template #input>
            <Field as="select" name="role" v-model="insertUporabnik.role">
              <option v-for="role in uporabnikRoles" :key="role" :value="role">
                {{ role }}
              </option>
            </Field>
          </template>
          <template #error>
            <ErrorMessage name="role" />
          </template>
        </input-label-top>
      </Form>
    </template>
  </modal-template>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { Form, Field, ErrorMessage } from "vee-validate"
import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"
import ModalHeader from "@/components/ui-components/modal/ModalHeader.vue"
import InputLabelTop from "@/components/ui-components/input/InputLabelTop.vue"
import { useModal } from "@/composables/useModal"
import type { InsertUporabnik } from "@/types"
import { uporabnikRoles } from "@/types"

import { uporabnikAddSchema } from "@/text-validation/uporabnikSchemas"
import { useUporabnikiStore } from "@/stores/admin/useUporabnikiStore"
const uporabniStore = useUporabnikiStore()
const { createItem } = uporabniStore

const insertUporabnik = ref<InsertUporabnik>({
  ime: "",
  priimek: "",
  slika: null,
  email: "",
  geslo: "",
  role: "",
  mentor: "",
  druzina: "",
})

const form = ref<HTMLFormElement | null>(null)

import { useFormControl } from "@/composables/useFormControl"
const { submitForm } = useFormControl(form)
</script>
