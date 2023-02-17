import {
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Tag,
  useBreakpoint,
  useColorModeValue
} from "@chakra-ui/react"
import ConnectButton from "components/ConnectButton"
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
      px={{ base: 2, md: 3 }}
      shadow="md"
      zIndex={5}
      bg={useColorModeValue("white", "gray.800")}
    >
      <HStack pos="relative" spacing={1}>
        <Image
          w={{ base: "2rem", md: "3rem" }}
          src="/assets/logo_transparent.png"
        />
        <Heading fontSize={{ base: "17", md: "25" }} as="h1">
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
          top={{ base: "-0.5rem", md: "0" }}
          bg="rgba(2,226,150, 0.5)"
        >
          BETA
        </Tag>
      </HStack>
      {!isMobile && <Spacer />}
      {!isMobile && <RouterArea />}
      <Spacer />
      <HStack pe={1}></HStack>
      <ConnectButton />
      {isMobile && <RouterArea />}
      {!isMobile && <ThemeToggle />}
      {!isMobile && <HeaderMenu />}
    </Flex>
  )
}

export default Header
