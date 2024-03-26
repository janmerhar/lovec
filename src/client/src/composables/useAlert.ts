import {
  AlertOptions,
  ToastOptions,
  alertController,
  toastController,
} from "@ionic/vue"

export const useAlert = () => {
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
    action: () => Promise<any>,
    success: string
  ) => {
    const result = await action()

    if (result) {
      await successToast(success)
    }
  }

  return {
    errorToast,
    warningToast,
    successToast,
    successToastAction,
  }
}
