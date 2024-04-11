import { modalController } from "@ionic/vue"

export const useModal = () => {
  const openModal = async (component: any, componentProps: object = {}) => {
    const modal = await modalController.create({
      component: component,
      componentProps: componentProps,
    })

    await modal.present()

    return modal.onWillDismiss()
  }

  const cancelModal = async <T = null>(data: T | null = null) => {
    return modalController.dismiss(data, "cancel")
  }

  const confirmModal = async <T = null>(data: T | null = null) => {
    return modalController.dismiss(data, "confirm")
  }
  const openSheetModal = async (
    component: any,
    componentProps: object = {}
  ) => {
    const modal = await modalController.create({
      component: component,
      componentProps: componentProps,
      breakpoints: [0, 0.5, 0.75, 1],
      initialBreakpoint: 0.5,
      handle: true,
    })

    await modal.present()

    return modal.onWillDismiss()
  }

  return {
    openModal,
    cancelModal,
    confirmModal,
    openSheetModal,
  }
}
