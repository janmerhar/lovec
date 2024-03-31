<template>
  <modal-template>
    <template #header>
      <modal-header
        :confirm-button="true"
        @cancel="useModal().cancelModal"
        @confirm="
          submitForm(
            useVplenStore().createItem,
            insertVplen,
            $t('vplenDatum.crud.create.success', { name: insertVplen.zival })
          )
        "
      >
        {{ $t("vplenDatum.crud.create.header") }}
      </modal-header>
    </template>
    <!--  -->
    <template #body>
      <datepicker-horizontal
        @change="(novDatum) => (insertVplen.datum = novDatum)"
      ></datepicker-horizontal>

      <Form ref="form" :validation-schema="vplenAddSchema">
        <input-label-top>
          <template #label>
            {{ $t("vplenDatum.crud.categories.zival") }}
          </template>
          <template #input>
            <Field as="select" name="zival" v-model="insertVplen.zival">
              <option v-for="zival in zivalDomain" :key="zival" :value="zival">
                {{ zival }}
              </option>
            </Field>
          </template>
          <template #error>
            <ErrorMessage name="zival" />
          </template>
        </input-label-top>

        <input-label-top>
          <template #label>{{
            $t("vplenDatum.crud.categories.teza")
          }}</template>
          <template #input>
            <Field name="teza" type="number" v-model="insertVplen.teza" />
          </template>
          <template #error>
            <ErrorMessage name="teza" />
          </template>
        </input-label-top>

        <input-label-top>
          <template #label>
            {{ $t("vplenDatum.crud.categories.bolezni") }}
          </template>
        </input-label-top>

        <!-- TODO: dodaj delete button, razmisli, input-right ?? -->
        <FieldArray name="bolezni">
          <input-label-top
            v-for="(bolezen, index) in insertVplen.bolezni"
            :key="index"
          >
            <template #input>
              <Field
                as="select"
                :name="`bolezni[${index}]`"
                v-model="insertVplen.bolezni[index]"
              >
                <option
                  v-for="bolezen in bolezenDomain"
                  :key="bolezen"
                  :value="bolezen"
                >
                  {{ bolezen }}
                </option>
              </Field>
            </template>
            <template #error>
              <ErrorMessage :name="`bolezni[${index}]`" />
            </template>
          </input-label-top>
        </FieldArray>

        <!--  -->
      </Form>

      <button-wide @click="insertVplen.bolezni.push('')">Dodaj</button-wide>
    </template>
  </modal-template>
</template>

<script setup lang="ts">
import { ref } from "vue"

import ModalHeader from "@/components/ui-components/modal/ModalHeader.vue"
import DatepickerHorizontal from "@/components/ui-components/DatepickerHorizontal.vue"
import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"
import InputLabelTop from "@/components/ui-components/input/InputLabelTop.vue"
import ButtonWide from "@/components/ui-components/button/ButtonWide.vue"
import { useModal } from "@/composables/useModal"

import { Form, Field, ErrorMessage, FieldArray } from "vee-validate"
import type { InsertVplen } from "@/types"
import { vplenAddSchema } from "@/text-validation/vplenSchemas"
import { useVplenStore } from "@/stores/useVplenStore"
import { useDate } from "@/composables/useDate"

const insertVplen = ref<InsertVplen>({
  koordinate: ["123", "123"],
  zival: "",
  teza: 0,
  datum: useDate(new Date()).isoDate(),
  bolezni: ["", ""],
})

const form = ref<HTMLFormElement | null>(null)

import { useFormControl } from "@/composables/useFormControl"
import { zivalDomain, bolezenDomain } from "@/types"
const { submitForm } = useFormControl(form)
</script>
