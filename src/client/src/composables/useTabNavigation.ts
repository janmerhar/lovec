import { computed } from "vue"
import { useIonRouter } from "@ionic/vue"
import { useRoute } from "vue-router"

export const useTabNavigation = () => {
  const router = useIonRouter()
  const route = useRoute()

  const selectedTab = computed(() => {
    return route.name
  })

  const selectedTabStyle = (selectedValue: string) => {
    return {
      "active-tab":
        typeof selectedTab.value == "string" &&
        selectedTab.value === selectedValue,
    }
  }

  const redirectTo = (tabName: string, routeParams?: object) => {
    router.push({ name: tabName, params: routeParams })
  }

  return {
    selectedTabStyle,
    redirectTo,
  }
}
