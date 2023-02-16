import { Flex, useColorMode, useColorModeValue } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { ToastContainer } from "react-toastify"

import Header from "./Header"
import Meta from "../Meta"
import { SubHeader } from "./Header/SubHeader"
import { Footer } from "./Footer"

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const layoutBgColor = useColorModeValue(
    `radial-gradient(farthest-corner at 0px 0px, rgba(227, 255, 246, 0.5) 40%, rgba(2,226,150, 0.7))`,
    `radial-gradient(farthest-corner at 0px 0px, #102221 60%, rgba(2,226,150, 0.5))`
  )
  const { colorMode } = useColorMode()

  return (
    <Flex
      minH="100vh"
      w="full"
      transition="0.5s ease-out"
      overflow="hidden"
      bgGradient={layoutBgColor}
    >
      <Meta />
      <Flex direction="column" w="full" align="start" justify="start">
        <Header />
        <SubHeader />
        <Flex w="full" justify="center" as="main" minH="calc(100vh - 7rem)">
          {children}
        </Flex>
        <Footer />
      </Flex>

      <ToastContainer
        key={"toastContainer"}
        closeButton={false}
        autoClose={3000}
        draggableDirection={"x"}
        newestOnTop={false}
        pauseOnHover
        toastStyle={{
          borderRadius: "1em",
          background: useColorModeValue("white", "#332D2D")
        }}
        progressStyle={{
          background: useColorModeValue(
            "rgba(2,226,150, 1)",
            "var(--chakra-colors-green-400)"
          ),
          boxShadow: "var(--chakra-shadows-md)",
          height: "0.6rem"
        }}
        bodyStyle={{
          fontFamily: "var(--chakra-fonts-heading)",
          fontSize: "1.25em",
          color: useColorModeValue("var(--chakra-colors-gray-800)", "white")
        }}
        position="bottom-right"
        closeOnClick
        draggablePercent={20}
      />
    </Flex>
  )
}

export default Layout
