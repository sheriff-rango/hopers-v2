import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { BsFillMoonStarsFill } from "react-icons/bs"
import { RiMoonFill, RiSunFill, RiSunLine } from "react-icons/ri"

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const bgColor = useColorModeValue("rgba(2,226,150, 0.7)", "#332D2D")
  const hoverBgColor = useColorModeValue("green.300", "#484040")
  const activeBgColor = useColorModeValue("green.400", "#2d2828")

  return (
    <IconButton
      aria-label="theme toggle"
      variant="ghost"
      rounded="1em"
      bg={bgColor}
      _hover={{ bg: hoverBgColor }}
      _active={{ bg: activeBgColor }}
      icon={colorMode === "light" ? <BsFillMoonStarsFill /> : <RiSunFill />}
      onClick={() => {
        toggleColorMode()
      }}
    />
  )
}

export default ThemeToggle
