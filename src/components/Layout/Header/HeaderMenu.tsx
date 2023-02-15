import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"

export const HeaderMenu = () => {
  return (
    <Menu>
      <MenuButton
        bg="transparent"
        rounded="1em"
        as={IconButton}
        icon={<BsThreeDots />}
      >
        Actions
      </MenuButton>
      <MenuList
        overflow="hidden"
        rounded="1em"
        py={0}
        border="none"
        shadow="xl"
      >
        <MenuItem>Documentation</MenuItem>
        <MenuItem>GitHub</MenuItem>
        <MenuItem>Blog</MenuItem>
        <MenuItem>Twitter</MenuItem>
        <MenuItem>Telegram</MenuItem>
        <MenuItem>CoinGecko</MenuItem>
      </MenuList>
    </Menu>
  )
}
