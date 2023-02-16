import {
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Spacer,
  Tag,
  useBreakpoint,
  useColorModeValue
} from "@chakra-ui/react"
import ConnectButton from "components/ConnectButton"
import SocialMediaButton from "components/SocialMediaButton"
import { FaTelegramPlane, FaTwitter } from "react-icons/fa"

import MenuToggle from "../../MenuToggle"
import ThemeToggle from "../../ThemeToggle"
import { HeaderMenu } from "./HeaderMenu"
import { RouterArea } from "./RouterArea"

const Header = () => {
  const breakpoint = useBreakpoint()

  const isMobile = Boolean(breakpoint === "base" || breakpoint === "sm")

  return (
    <Flex
      as="header"
      w="full"
      align="center"
      justifyContent="flex-end"
      gap={2}
      py={2}
      px={3}
      shadow="md"
      zIndex={5}
      bg={useColorModeValue("white", "gray.800")}
    >
      <HStack pos="relative" spacing={1}>
        <Image w="3rem" src="/assets/logo_transparent.png" />
        <Heading fontSize="25" as="h1">
          Hopers.io
        </Heading>
        <Tag
          px={"3px"}
          py={0}
          lineHeight={0}
          pos="absolute"
          fontSize="10"
          letterSpacing={1}
          fontWeight="600"
          right={-6}
          top="0"
          bg="rgba(2,226,150, 0.5)"
        >
          BETA
        </Tag>
      </HStack>
      {!isMobile && <Spacer />}
      <RouterArea />
      <Spacer />

      <HStack pe={1}></HStack>
      <ConnectButton />
      <ThemeToggle />
      <HeaderMenu />
    </Flex>
  )
}

export default Header
