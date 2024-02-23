import { alertController } from "@ionic/vue"

export class IonicAlert {
  static async showAlert(message: string, header = "Alert") {
    const alert = await alertController.create({
      header: header,
      message: message,
      buttons: ["OK"],
    })

    alert.present()
    const result = await alert.onDidDismiss()

    return result
  }

  static async showConfirm(message: string, header = "Confirm") {
    const alert = await alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: "Prekliči",
          role: "cancel",
        },
        {
          text: "Potrdi",
          role: "confirm",
        },
      ],
    })

    alert.present()
    const result = await alert.onDidDismiss()

    return result
  }
}
