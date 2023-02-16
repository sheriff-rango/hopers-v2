import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { BsFillMoonStarsFill } from "react-icons/bs"
import { RiMoonFill, RiSunFill, RiSunLine } from "react-icons/ri"

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const bgColor = useColorModeValue("rgba(2,226,150, 1)", "gray.700")

  return (
    <IconButton
      aria-label="theme toggle"
      variant="ghost"
      rounded="1em"
      shadow="md"
      bg={bgColor}
      _hover={{ filter: "brightness(110%)" }}
      _active={{ filter: "brightness(90%)" }}
      icon={colorMode === "light" ? <BsFillMoonStarsFill /> : <RiSunFill />}
      onClick={() => {
        toggleColorMode()
      }}
    />
  )
}

export default ThemeToggle
