/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChainWalletBase, ModalVersion } from "@cosmos-kit/core"
import React, { RefObject } from "react"

import {
  DisplayWalletListType,
  SimpleDisplayWalletList,
  SimpleModalHead,
  SimpleModalHeadType,
  Wallet
} from "../components"
import { DisplayType } from "../types"

export const getWalletListView = (
  wallet: ChainWalletBase | undefined,
  wallets: ChainWalletBase[] = [],
  setOpen: (isOpen: boolean) => void,
  setDisplay: (display: DisplayType) => void,
  setQRCodeWallet: (wallet: ChainWalletBase | undefined) => void,
  initialFocus: RefObject<any>
) => {
  let ModalHead: (props: SimpleModalHeadType) => JSX.Element
  let DisplayWalletList: (props: DisplayWalletListType) => JSX.Element
  DisplayWalletList = SimpleDisplayWalletList
  ModalHead = SimpleModalHead

  const walletsData = wallets.map(
    (w) =>
      ({
        ...w.walletInfo,
        downloads: void 0,
        onClick: async () => {
          setDisplay("single")
          if (w.walletInfo.mode === "wallet-connect" && !w.appUrl) {
            setQRCodeWallet(w)
          } else {
            setQRCodeWallet(void 0)
          }
          window.localStorage.setItem("synchronize-mutex-wallet", "fire")
          await w.connect()
        }
      } as Wallet)
  )
  return [
    <ModalHead
      title="Select Your Wallet"
      backButton={false}
      handleClose={() => {
        if (wallet && wallet.walletStatus !== "Disconnected") {
          setDisplay("single")
        } else {
          setDisplay("list")
        }
        setQRCodeWallet(void 0)
        setOpen(false)
      }}
    />,
    <DisplayWalletList
      initialFocus={initialFocus}
      walletsData={walletsData.sort((a, b) => {
        if (a.mode === b.mode) {
          return 0
        } else if (a.mode !== "wallet-connect") {
          return -1
        } else {
          return 1
        }
      })}
    />
  ]
}
