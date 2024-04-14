import { Icon } from "leaflet"

// Ikone za opazovalnice
// - zasedena -> ti mogoce ne gres skozi, ker ne dobivam podtkov o zasedenosti
// - trenutno rezervirana
// - omogoca prespanje
// - izbrisana ...
// Mogoce se kaj za same revirje

export const useMapElements = () => {
  const iconOpazovalnica = new Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  const iconVplen = (zival: string) => {
    return new Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
  }

  return {
    iconOpazovalnica,
    iconVplen,
  }
}
