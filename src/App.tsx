/* eslint-disable sonarjs/no-small-switch */
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router } from "react-router-dom"
import { wallets as vectisWallets } from "@cosmos-kit/vectis"
import { wallets as wcv2Wallets } from "@cosmos-kit/walletconnect-v2"
import { Decimal } from "@cosmjs/math"
import { GasPrice } from "@cosmjs/stargate"
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation"
import { wallets as keplrWallets } from "@cosmos-kit/keplr"
import { wallets as leapWallets } from "@cosmos-kit/leap"
import { wallets as trustWallets } from "@cosmos-kit/trust"
import type { Chain } from "@chain-registry/types"
import { assets, chains } from "chain-registry"
import { MotionConfig } from "framer-motion"

import Layout from "components/Layout"
import RouterSetup from "components/Router/RouterSetup"
import { theme } from "theme"
import { ChainProvider } from "@cosmos-kit/react"
import { getModal } from "components/WalletModal"
import { RecoilRoot } from "recoil"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "services/queryClient"

import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ChainProvider
            chains={chains}
            assetLists={assets}
            modalTheme={theme}
            key="chainProvider"
            sessionOptions={{ killOnTabClose: false }}
            walletModal={getModal()}
            // @ts-ignore
            wallets={[
              ...wcv2Wallets,
              ...keplrWallets,
              ...cosmostationWallets,
              ...leapWallets,
              ...vectisWallets
              // ...trustWallets
            ]}
            defaultNameService="stargaze"
            wcSignClientOptions={{
              projectId: import.meta.env.VITE_WCCLIENT,
              relayUrl: "wss://relay.walletconnect.org",
              name: "Hopers.io | DeFi & NFTs",
              metadata: {
                description: "Hopers.io | DeFi & NFTs",
                icons: ["/assets/logo_transparent.png"],
                url: "https://hopers.io",
                name: "Hopers.io | DeFi & NFTs"
              }
            }}
            signerOptions={{
              signingStargate: (chain: Chain) => {
                switch (chain.chain_name) {
                  case "juno":
                    return {
                      gasPrice: new GasPrice(
                        Decimal.fromUserInput("25000", 2),
                        "ujuno"
                      )
                    }
                  default:
                    return undefined
                }
              }
            }}
          >
            <Router>
              <MotionConfig
                transition={{ type: "spring", bounce: 0.4, damping: 7 }}
              >
                <Layout>
                  <RouterSetup />
                </Layout>
              </MotionConfig>
            </Router>
          </ChainProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </ChakraProvider>
  )
}

export default App
