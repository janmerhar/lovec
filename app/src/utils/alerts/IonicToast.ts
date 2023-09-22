import { toastController } from "@ionic/vue"

export class IonicToast {
  private static createToast(
    message: string,
    duration: number,
    color: string,
    position: "top" | "bottom" | "middle"
  ): Promise<HTMLIonToastElement> {
    return toastController.create({
      message: message,
      duration: duration,
      color: color,
      position: position,
    })
  }

  static async success(message: string, duration = 3000) {
    const toast = await IonicToast.createToast(
      message,
      duration,
      "success",
      "bottom"
    )

    toast.present()
  }

  static async failure(message: string, duration = 5000) {
    const toast = await IonicToast.createToast(
      message,
      duration,
      "danger",
      "bottom"
    )

    toast.present()
  }

  static async warning(message: string, duration = 4000) {
    const toast = await IonicToast.createToast(
      message,
      duration,
      "warning",
      "bottom"
    )

    toast.present()
  }
}
