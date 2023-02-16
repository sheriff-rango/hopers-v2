import type { PathRouteProps } from "react-router-dom"

import Home from "pages/home"
import Swap from "pages/swap"
import Farm from "pages/farm"
import Assets from "pages/assets"
import NFT from "pages/nft"
import IDO from "pages/ido"
import Win from "pages/play"
import Play from "pages/play"

export const routes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/swap",
    element: <Swap />
  },
  {
    path: "/farm",
    element: <Farm />
  },
  {
    path: "/play",
    element: <Play />
  },
  {
    path: "/assets",
    element: <Assets />
  },
  {
    path: "/collections",
    element: <NFT />
  },
  {
    path: "/ido",
    element: <IDO />
  }
]

export const privateRoutes: Array<PathRouteProps> = []
