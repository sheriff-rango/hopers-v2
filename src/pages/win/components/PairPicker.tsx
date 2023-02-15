import {
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  HStack,
  Spacer
} from "@chakra-ui/react"
import { FaArrowDown } from "react-icons/fa"

export const PairPicker = () => {
  return (
    <Menu>
      <Flex
        as={MenuButton}
        px={4}
        bg="white"
        rounded="1em"
        shadow="md"
        pos="absolute"
        left="6rem"
        h="2.5rem"
        w="10rem"
        justify="center"
        fontWeight="600"
        variant="unstyled"
        display="flex"
        flexDir="row"
        _active={{ bg: "offwhite.1" }}
      >
        <HStack w="full">
          <Text>Juno / USDC</Text>
          <Spacer />
          <FaArrowDown size="13" />
        </HStack>
      </Flex>
      <Portal>
        <MenuList
          py={0}
          overflow="hidden"
          border="none"
          shadow="md"
          rounded="1em"
        >
          <MenuItem
            _disabled={{ color: "gray.800", cursor: "auto" }}
            isDisabled
            cursor="auto"
          >
            More pairs coming soon.
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}
