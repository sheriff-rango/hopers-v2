import {
  useDisclosure,
  SystemStyleObject,
  useColorModeValue,
  Flex,
  Icon,
  Button,
  useOutsideClick,
  Menu,
  MenuButton,
  Skeleton,
  Editable,
  EditablePreview,
  EditableInput,
  Portal,
  MenuList,
  Box,
  Text,
  Image,
  HStack,
  Spacer,
  Input,
  VStack
} from "@chakra-ui/react"
import {
  OptionProps,
  GroupBase,
  chakraComponents,
  ControlProps,
  AsyncSelect
} from "chakra-react-select"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"
import { RiSearch2Fill } from "react-icons/ri"
import fadeIn from "theme/motion/variants/general/fadeIn"
import { ChainTypes, ConfigType } from "utils/tokens/chains"
import { TTokenListItem } from "utils/tokens/tokens"
import { SwapSkeleton } from ".."

export const CustomOption = ({
  children,
  ...props
}: OptionProps<
  TTokenListItem & { chainConfig: ConfigType | undefined },
  true,
  GroupBase<TTokenListItem & { chainConfig: ConfigType | undefined }>
>) => {
  return (
    <chakraComponents.Option {...props}>
      <Flex id={props.data.name} align="center" w="full" rounded="1em">
        <Flex align="center" flex={1} gap={2}>
          <Box w="2rem" h="2rem">
            <Image src={props.data.imageUrl} />
          </Box>
          <Box>
            <Text
              fontSize={{ base: "16", sm: "18" }}
              fontWeight="bold"
              textAlign="start"
              lineHeight="1"
            >
              {props.data.name}
            </Text>
            <Text fontSize={{ base: "16", sm: "14" }} textAlign="start">
              {props.data.chainConfig?.chainName}
            </Text>
          </Box>
        </Flex>
        <Text
          fontSize={{ base: "md", sm: "md" }}
          textAlign="end"
          wordBreak="break-word"
        >
          3.141595
        </Text>
      </Flex>
    </chakraComponents.Option>
  )
}

export const CustomControl = ({
  children,
  ...props
}: ControlProps<
  TTokenListItem & { chainConfig: ConfigType | undefined },
  true
>) => {
  return (
    <chakraComponents.Control {...props}>
      <Flex align="center" px={2}>
        <Icon as={RiSearch2Fill} />
      </Flex>
      {children}
    </chakraComponents.Control>
  )
}

export const customStyles: any = {
  control: (provided: SystemStyleObject) => ({
    ...provided,
    bg: useColorModeValue("blackAlpha.50", "gray.700"),
    border: "none",
    shadow: "md",
    borderRadius: "1em"
  }),
  menu: (provided: SystemStyleObject) => ({
    ...provided,
    maxH: { base: "sm", sm: "2xl" },
    mb: 0,
    zIndex: 10,
    position: "relative"
  }),
  menuList: (provided: SystemStyleObject) => ({
    ...provided,
    // For Chrome and other browsers except Firefox
    "&::-webkit-scrollbar": {
      background: useColorModeValue(
        "rgba(160,160,160,0.1)",
        "rgba(255,255,255,0.1)"
      ),
      borderRadius: "4px",
      width: "12px"
    },

    "&::-webkit-scrollbar-thumb": {
      background: useColorModeValue("rgba(0,0,0,0.1)", "rgba(255,255,255,0.1)"),
      borderRadius: "4px"
    },

    bg: "transparent",
    overflowX: "hidden",
    border: "none",
    shadow: "none",
    borderRadius: "0",
    py: 0,
    pe: 2,
    scrollbarColor: useColorModeValue(
      "rgba(0,0,0,0.3) rgba(0,0,0,0.2)",
      "rgba(255,255,255,0.2) rgba(255,255,255,0.1)"
    ),
    // For Firefox
    scrollbarWidth: "auto"
  }),
  option: (provided: SystemStyleObject, state: { isSelected: boolean }) => ({
    ...provided,
    _disabled: {
      _hover: { bg: "transparent" }
    },
    _hover: {
      bg: state.isSelected
        ? useColorModeValue("primary.100", "primary.500")
        : useColorModeValue("blackAlpha.200", "whiteAlpha.200")
    },
    bg: state.isSelected
      ? useColorModeValue("green.100", "gray.600")
      : "transparent",
    borderRadius: "1em",
    color: "inherit",
    mt: 2
  })
}

export const FromToken = ({
  data,
  fromItem,
  setFromItem,
  toItem,
  setToItem,
  tokenInputValue,
  setTokenInputValue
}: {
  data: Array<TTokenListItem & { chainConfig: ConfigType | undefined }>
  fromItem:
    | (TTokenListItem & { chainConfig: ConfigType | undefined })
    | undefined
  setFromItem: (
    value: TTokenListItem & { chainConfig: ConfigType | undefined }
  ) => void
  setToItem: (
    value: TTokenListItem & { chainConfig: ConfigType | undefined }
  ) => void
  setTokenInputValue: (value: string) => void
  toItem: (TTokenListItem & { chainConfig: ConfigType | undefined }) | undefined
  tokenInputValue: string
}) => {
  const fromMenuRef = useRef<HTMLDivElement | null>(null)
  const { isOpen, onToggle, onClose } = useDisclosure()

  const IndicatorSeparator = () => {
    return null
  }

  const DropdownIndicator = () => {
    return null
  }

  const bgColor = useColorModeValue("white", "gray.700")

  return (
    <Box
      ref={fromMenuRef}
      position="relative"
      bg={bgColor}
      shadow="md"
      as={motion.div}
      variants={fadeIn}
      borderRadius="1em"
      p={3}
      w="full"
    >
      <Flex
        position="relative"
        justify="space-between"
        flexDirection={{ base: "column", sm: "row" }}
        align={{ base: "start", sm: "center" }}
        mb={4}
        w="full"
      >
        <Flex
          maxW={{ sm: "2xs" }}
          w="full"
          justify="start"
          align="center"
          gap={2}
        >
          <Text fontSize={"md"} fontWeight="normal">
            Available
          </Text>
          <Text fontSize={"md"} fontWeight="900" color="rgba(2,226,150, 1)">
            0.2186
          </Text>
        </Flex>
        <Spacer />
        <HStack>
          <Button
            fontSize="sm"
            bg="offwhite.1"
            color="gray.800"
            _dark={{ color: "white", bg: "gray.600" }}
            _hover={{ filter: "brightness(110%)" }}
            _active={{ filter: "brightness(90%)" }}
            borderRadius="md"
            shadow="md"
            transition="0.2s all"
            h={7}
            py={0}
            px={0}
            w={12}
          >
            Half
          </Button>
          <Button
            fontSize="sm"
            bg="offwhite.1"
            color="gray.800"
            _dark={{ color: "white", bg: "gray.600" }}
            _hover={{ filter: "brightness(110%)" }}
            _active={{ filter: "brightness(90%)" }}
            borderRadius="md"
            shadow="md"
            transition="0.2s all"
            h={7}
            py={0}
            px={0}
            w={12}
          >
            Max
          </Button>
        </HStack>
      </Flex>
      <Menu>
        {({ isOpen }) => (
          <>
            <Flex direction="row">
              <MenuButton
                flex={1}
                as={Button}
                variant="unstyled"
                whiteSpace="normal"
                onClick={onToggle}
                maxW="full"
                h="3rem"
              >
                <Flex flexDirection="row" gap={3}>
                  <Skeleton rounded="full" isLoaded={Boolean(fromItem)}>
                    <Box
                      w={{ base: 12, md: "3rem" }}
                      h={{ base: 12, md: "3rem" }}
                      rounded="full"
                    >
                      <Image src={fromItem?.imageUrl} />
                    </Box>
                  </Skeleton>
                  <Skeleton
                    alignItems="center"
                    isLoaded={Boolean(fromItem)}
                    w={{ base: 24, md: "60%" }}
                    h={{ base: 6, md: "3rem" }}
                    display="flex"
                    rounded="1em"
                  >
                    <VStack spacing={0} align="start">
                      <Text
                        fontSize={{ base: "xl", sm: "xl" }}
                        fontWeight="bold"
                        textAlign="start"
                        fontFamily="heading"
                        lineHeight={1}
                      >
                        {fromItem?.name}
                      </Text>
                      <Text
                        fontSize={{ base: "xl", sm: "13" }}
                        textAlign="start"
                        fontFamily="heading"
                      >
                        {fromItem?.chainConfig?.chainName}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Icon
                      as={isOpen ? FiChevronUp : FiChevronDown}
                      fontSize={{ base: "xl", sm: "3xl" }}
                      color={useColorModeValue(
                        "blackAlpha.700",
                        "whiteAlpha.700"
                      )}
                    />
                  </Skeleton>
                </Flex>
              </MenuButton>
              {fromItem ? (
                <Box flex={1}>
                  <Editable
                    isPreviewFocusable={true}
                    selectAllOnFocus={true}
                    variant="unstyled"
                    fontSize={{ base: "lg", sm: "24" }}
                    fontWeight="bold"
                    textAlign="end"
                    shadow="md"
                    rounded="1em"
                    color={
                      tokenInputValue === "0"
                        ? useColorModeValue("gray.700", "whiteAlpha.500")
                        : useColorModeValue("gray.800", "white")
                    }
                    mb={{ base: 1, sm: 2 }}
                    placeholder="0"
                  >
                    <EditablePreview
                      _hover={{
                        background: useColorModeValue("offwhite.3", "gray.600")
                      }}
                      px={2}
                      bg="offwhite.2"
                      _dark={{ bg: "gray.800" }}
                      w="full"
                      rounded="0.6em"
                    />
                    <EditableInput
                      px={2}
                      bg="offwhite.2"
                      _dark={{ bg: "gray.800" }}
                      w="full"
                      rounded="0.6em"
                      type="number"
                      min="0"
                      defaultValue="0"
                      onChange={(event) => {
                        const value = event.target.value
                        // eslint-disable-next-line unicorn/no-unsafe-regex
                        const floatRegex =
                          /(0{0,1}\.d*)(d+(\.d*)?(e[+-]?d+)?|\.d+(e[+-]?d+)?)/gu
                        const floatCheck = value.match(floatRegex)
                        if (floatCheck !== null) {
                          setTokenInputValue(value)
                          return value
                        }

                        setTokenInputValue(Number.parseFloat(value).toString())
                        return (event.target.value =
                          Number.parseFloat(value).toString())
                      }}
                      _focus={{ boxShadow: "none" }}
                      minW="5rem"
                    />
                  </Editable>
                  <Text
                    fontSize={{ sm: "16" }}
                    textAlign="end"
                    fontWeight="bold"
                    color={
                      tokenInputValue === "0"
                        ? useColorModeValue("blackAlpha.600", "whiteAlpha.600")
                        : useColorModeValue("blackAlpha.700", "whiteAlpha.700")
                    }
                    mb={0}
                  >
                    $0
                  </Text>
                </Box>
              ) : (
                <Flex flexDirection="column" align="end">
                  <Skeleton w={{ base: 20, sm: 36 }} h={{ base: 8, sm: 10 }} />
                  <Skeleton w={{ base: 12, sm: 16 }} h={{ base: 6, sm: 8 }} />
                </Flex>
              )}
            </Flex>
            <Portal>
              <MenuList
                position="relative"
                bg="rgba(255,255,255,1)"
                _dark={{ bg: "gray.800" }}
                shadow="md"
                rounded="1em"
                border="none"
                right={3}
                px={6}
              >
                <Box py={2} w={{ base: "20rem", md: "25rem" }}>
                  {fromItem ? (
                    <AsyncSelect
                      placeholder="Search"
                      chakraStyles={customStyles}
                      isClearable={false}
                      // isOptionDisabled={(option) => option.label === 'Ion'} // test option disabled
                      blurInputOnSelect={true}
                      controlShouldRenderValue={false}
                      menuIsOpen={true}
                      loadingMessage={() => <SwapSkeleton />}
                      defaultOptions={data}
                      value={fromItem}
                      loadOptions={(inputValue, callback) => {
                        setTimeout(() => {
                          const values = data.filter((option) =>
                            option.name
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                          )
                          callback(values)
                        }, 1_000)
                      }}
                      onChange={(selectedOption) => {
                        let value = {}
                        value = { ...selectedOption }
                        setFromItem(
                          value as TTokenListItem & {
                            chainConfig: ConfigType | undefined
                          }
                        )
                        onClose()
                      }}
                      components={{
                        Control: CustomControl,
                        DropdownIndicator,
                        IndicatorSeparator,
                        Option: CustomOption
                      }}
                    />
                  ) : (
                    <SwapSkeleton />
                  )}
                </Box>
              </MenuList>
            </Portal>
          </>
        )}
      </Menu>
    </Box>
  )
}
