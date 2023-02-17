import { Button, Center, Icon, Text, useColorMode } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FaWallet } from "react-icons/fa"
import { handleChangeColorModeValue } from "./DefaultComponent"
import { type ConnectWalletType } from "./types"

export const SIZES = {
  lg: { fontSize: "lg", h: 12 },
  md: { fontSize: "md", h: 10 },
  sm: { fontSize: "sm", h: 8 }
}

export const Variants = (colorMode: string) => ({
  primary: {
    _active: {
      filter: "brightness(90%)"
    },
    _disabled: {
      _active: {
        bg: handleChangeColorModeValue(colorMode, "gray.50", "gray.700"),
        boxShadow: "none",
        color: handleChangeColorModeValue(colorMode, "gray.400", "gray.500")
      },
      _focus: {
        bg: handleChangeColorModeValue(colorMode, "gray.50", "gray.700"),
        boxShadow: "none",
        color: handleChangeColorModeValue(colorMode, "gray.400", "gray.500")
      },
      _hover: {
        bg: handleChangeColorModeValue(colorMode, "gray.50", "gray.700"),
        boxShadow: "none",
        color: handleChangeColorModeValue(colorMode, "gray.400", "gray.500")
      },
      bg: handleChangeColorModeValue(colorMode, "gray.50", "gray.700"),
      color: handleChangeColorModeValue(colorMode, "gray.400", "gray.500"),
      cursor: "not-allowed",
      opacity: 0.8
    },
    _focus: {},
    _hover: {
      filter: "brightness(110%)"
    },
    _loading: {
      _active: {
        bg: handleChangeColorModeValue(colorMode, "orange.500", "orange.400"),
        boxShadow: "none",
        color: "white"
      },
      _focus: {
        bg: handleChangeColorModeValue(colorMode, "orange.500", "orange.400"),
        boxShadow: "none",
        color: "white"
      },
      _hover: {
        bg: handleChangeColorModeValue(colorMode, "orange.500", "orange.400"),
        boxShadow: "none",
        color: "white"
      },
      bg: handleChangeColorModeValue(colorMode, "orange.500", "orange.400"),
      color: "white",
      cursor: "progress",
      opacity: 0.8
    },
    bg: handleChangeColorModeValue(
      colorMode,
      "rgb(2,226,150)",
      "rgb(0, 163, 109)"
    ),
    color: handleChangeColorModeValue(colorMode, "gray.800", "white"),
    shadow: "md"
  },
  secondary: {
    _active: {
      bg: handleChangeColorModeValue(colorMode, "red.200", "gray.700"),
      color: handleChangeColorModeValue(colorMode, "gray.700", "gray.50")
    },
    _disabled: {
      _active: {
        bg: handleChangeColorModeValue(colorMode, "orange.50", "gray.700"),
        boxShadow: "none",
        color: handleChangeColorModeValue(colorMode, "gray.400", "gray.500")
      },
      _focus: {
        bg: handleChangeColorModeValue(colorMode, "orange.50", "gray.700"),
        boxShadow: "none",
        color: handleChangeColorModeValue(colorMode, "gray.400", "gray.500")
      },
      _hover: {
        bg: handleChangeColorModeValue(colorMode, "orange.50", "gray.700"),
        boxShadow: "none",
        color: handleChangeColorModeValue(colorMode, "gray.400", "gray.500")
      },
      bg: handleChangeColorModeValue(colorMode, "orange.50", "gray.700"),
      color: handleChangeColorModeValue(colorMode, "gray.400", "gray.500"),
      cursor: "not-allowed",
      opacity: 0.8
    },
    _focus: {},
    _hover: {
      bg: handleChangeColorModeValue(colorMode, "gray.200", "gray.700")
    },
    _loading: {
      _active: {
        bg: handleChangeColorModeValue(colorMode, "gray.50", "gray.700"),
        boxShadow: "none",
        color: handleChangeColorModeValue(colorMode, "gray.400", "gray.500")
      },
      _focus: {
        bg: handleChangeColorModeValue(colorMode, "gray.50", "gray.700"),
        boxShadow: "none",
        color: handleChangeColorModeValue(colorMode, "gray.400", "gray.500")
      },
      _hover: {
        bg: handleChangeColorModeValue(colorMode, "gray.50", "gray.700"),
        boxShadow: "none",
        color: handleChangeColorModeValue(colorMode, "gray.400", "gray.500")
      },
      bg: handleChangeColorModeValue(colorMode, "gray.50", "gray.700"),
      color: handleChangeColorModeValue(colorMode, "gray.400", "gray.500"),
      cursor: "progress",
      opacity: 0.8
    },
    bg: handleChangeColorModeValue(colorMode, "gray.100", "gray.600"),
    color: handleChangeColorModeValue(colorMode, "gray.500", "gray.200")
  }
})

export const ConnectWalletButton = ({
  size = "md",
  buttonText,
  isLoading,
  isDisabled,
  variant = "secondary",
  leftIcon,
  rightIcon,
  onClickConnectBtn
}: ConnectWalletType) => {
  const { colorMode } = useColorMode()
  return (
    <Button
      as={motion.button}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      rounded="0.9em"
      h={SIZES[size as keyof typeof SIZES].h}
      display="flex"
      alignItems="center"
      fontSize={SIZES[size as keyof typeof SIZES].fontSize}
      isLoading={isLoading}
      isDisabled={isDisabled}
      onClick={onClickConnectBtn}
      {...Variants(colorMode)[variant as keyof ReturnType<typeof Variants>]}
    >
      {leftIcon ? (
        <Center mr={1.5}>{leftIcon}</Center>
      ) : (
        <Center mr={1.5}>
          <Icon as={FaWallet} />
        </Center>
      )}
      {buttonText ? <Text>{buttonText}</Text> : <Text>Connect Wallet</Text>}
      {rightIcon && <Center ml={1.5}>{rightIcon}</Center>}
    </Button>
  )
}
