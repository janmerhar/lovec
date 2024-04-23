import * as yup from "yup"
import YupPassword from "yup-password"

YupPassword(yup)

import { uporabnikRoles } from "@/types"
import i18n from "@/locales/i18n"

const { t } = i18n.global

export const uporabnikAddSchema = yup.object({
  ime: yup.string().required(),
  priimek: yup.string().required(),
  slika: yup.mixed(),
  email: yup.string().email().required(),
  geslo: yup
    .string()
    .min(8, t("custom_validation.min", { min: 8 }))
    .minLowercase(1, t("custom_validation.minLowercase", { min: 1 }))
    .minUppercase(1, t("custom_validation.minUppercase", { min: 1 }))
    .minNumbers(1, t("custom_validation.minNumbers", { min: 1 }))
    .minSymbols(1, t("custom_validation.minSymbols", { min: 1 })),
  gesloConfirm: yup
    .string()
    .oneOf([yup.ref("geslo"), ""], t("custom_validation.passwordMatch")),
  role: yup.string().oneOf(uporabnikRoles).required(),
  mentor: yup.string(),
  pripravniki: yup.array().of(yup.string()),
  druzina: yup.string(),
})
