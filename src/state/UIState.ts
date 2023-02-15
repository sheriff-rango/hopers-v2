import { atom } from "recoil"

export const showUIState = atom<boolean>({
  default: false,
  key: "showUI"
})

export const marketAdvancedModeState = atom<boolean>({
  default: false,
  key: "marketAdvancedMode"
})

export const activeRouteState = atom<Record<string, string> | undefined>({
  default: {},
  key: "activeRoute"
})
