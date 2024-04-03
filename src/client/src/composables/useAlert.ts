import i18n from "@/locales/i18n"
/*
 * Potrebujem par stvari:
 * https://ionicframework.com/docs/api/alert
 * 1. Comfirm okno, ki se uporablja za izbris
 *   -> lahko dodam confirm() in cancel() funkcije
 * 1.1 Isto okno, le da samo prikaze obvestilo
 */

import {
  AlertOptions,
  ToastOptions,
  alertController,
  toastController,
} from "@ionic/vue"

const t = i18n.global.t

export const useAlert = () => {
  // TODO
  // TODO: mogoce naredi samo tako, da imam samo title, body in confirmCallback
  // zato, da bolj poenostavim te zadeve, ker drugace bo res prevec kode
  //   const presentAlert = async (options: AlertOptions) => {
  //     const alert = await alertController.create(options)

  //     await alert.present()
  //   }

  //   // can you find better names for these two alerts

  //   const infoAlert = async (message: string) => {
  //     await presentAlert({
  //       message,
  //       buttons: ["OK"],
  //     })
  //   }

  //   const confirmAlert = async (
  //     message: string,
  //     confirm: Function,
  //     cancel: Function
  //   ) => {}

  // tukaj naredim to, da se klice preden se neka akcija zgodi
  //   const useAlertAction
  const confirmDangerAlert = async (
    header: string,
    message: string,
    call: () => Promise<any>
  ) => {
    const alert = await alertController.create({
      header,
      message,
      buttons: [
        {
          text: t("framework.alert.cancelButton"),
        },
        {
          text: t("framework.alert.confirmButton"),
          handler: async () => {
            await call()
          },
        },
      ],
    })

    await alert.present()
  }

  const presentToast = async (options: ToastOptions) => {
    const toast = await toastController.create(options)

    await toast.present()
  }

  const errorToast = async (message: string) => {
    await presentToast({
      message,
      duration: 1500,
      color: "danger",
    })
  }

  const warningToast = async (message: string) => {
    await presentToast({
      message,
      duration: 1500,
      color: "warning",
    })
  }

  const successToast = async (message: string) => {
    await presentToast({
      message,
      duration: 1500,
      color: "success",
    })
  }

  const successToastAction = async (
    action: (...args: any[]) => Promise<any>,
    success: string
  ) => {
    const result = await action()

    if (result) {
      await successToast(success)
    }

    return result
  }

  return {
    // Toasts
    errorToast,
    warningToast,
    successToast,
    successToastAction,
    // Alerts
    confirmDangerAlert,
  }
}
