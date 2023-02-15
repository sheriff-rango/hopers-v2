/* eslint-disable unicorn/consistent-function-scoping */
import {
  type SystemStyleObject,
  Box,
  Button,
  Collapse,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Grid,
  Icon,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useOutsideClick,
  useRadio,
  useRadioGroup,
  MenuButton,
  Menu,
  MenuList,
  Heading,
  HStack,
  Avatar,
  AvatarGroup,
  IconButton,
  Tag,
  Link,
  Portal,
  Center
} from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { chains } from "chain-registry"

// import fadeIn from "@theme/motion/variants/general/fadeIn"
import {
  type ControlProps,
  type GroupBase,
  type OptionBase,
  type OptionProps,
  AsyncSelect,
  chakraComponents
} from "chakra-react-select"
import { SwapIcon } from "components/Assets/SwapIcon"
import { MotionFlex } from "components/MenuToggle"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { BsExclamationCircleFill } from "react-icons/bs"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"
import { RiSettings4Fill, RiSearch2Fill } from "react-icons/ri"
import { useRecoilState, useRecoilValue } from "recoil"
import { marketAdvancedModeState, showUIState } from "state/UIState"
import fadeIn from "theme/motion/variants/general/fadeIn"
import { SwapChart } from "./components/Chart"
import { CustomSwitch } from "./components/CustomSwitch"
// import { useRecoilState, useRecoilValue } from "recoil"

type DataType = OptionBase & {
  ibc?: {
    dst_channel?: string
    source_channel?: string
    source_denom?: string
  }
  imgSrc?: string
  label: string
  value: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RadioTag = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        bg={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
        borderRadius="full"
        _checked={{
          bg: "primary.500",
          color: "white"
        }}
        _focus={{
          boxShadow: "outline"
        }}
        _disabled={{
          cursor: "not-allowed",
          opacity: 0.5
        }}
        px={5}
        py={1}
      >
        <Text textAlign="center">{props.children}</Text>
      </Box>
    </Box>
  )
}

const Setting = () => {
  const { onToggle, onClose, isOpen } = useDisclosure()
  const initialFocusRef = useRef(null)
  const options = ["1%", "3%", "5%", "2.5%"]
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: "1%",
    name: "setting",
    // eslint-disable-next-line no-console
    onChange: console.log
  })
  const group = getRootProps()

  const [advancedMode, setAdvanvedMode] = useRecoilState(
    marketAdvancedModeState
  )

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialFocusRef}
    >
      <PopoverTrigger>
        <IconButton
          as={motion.button}
          position="relative"
          bg={useColorModeValue("white", "whiteAlpha.400")}
          aria-label="Open Swap Settings"
          size="sm"
          rounded="0.7rem"
          icon={<Icon as={RiSettings4Fill} />}
          color={
            isOpen ? "#02e296" : useColorModeValue("black", "whiteAlpha.800")
          }
          transition="all .5s"
          _hover={{
            color: isOpen
              ? "#02e296"
              : useColorModeValue("blackAlpha.600", "whiteAlpha.700")
          }}
          _focus={{ boxShadow: "none" }}
          onClick={onToggle}
        />
      </PopoverTrigger>
      <PopoverContent
        as={motion.div}
        bg="rgba(255,255,255,1)"
        border="none"
        shadow="md"
        rounded="1em"
        w="fit-content"
        right={4}
      >
        <PopoverBody p={{ base: 6, sm: 8 }}>
          <HStack>
            <Text>Enable Advanced Mode</Text>
            <CustomSwitch defaultValue={advancedMode} onToggle={onToggle} />
          </HStack>

          <Text fontWeight="semibold" mb={1.5}>
            Transaction Setting
          </Text>
          <Text
            fontWeight="semibold"
            color={useColorModeValue("blackAlpha.500", "whiteAlpha.600")}
            verticalAlign="middle"
            mb={4}
          >
            Slippage tolerance&ensp;
            <Icon as={BsExclamationCircleFill} color="orange.200" />
          </Text>
          <Grid
            templateColumns={{ base: "1fr 1fr", sm: "repeat(4, 1fr)" }}
            gap={4}
            {...group}
          >
            {options.map((value) => {
              const radio = getRadioProps({ value })
              return (
                <RadioTag
                  key={value}
                  value={value}
                  isDisabled={value === "2.5%"}
                  {...radio}
                >
                  {value}
                </RadioTag>
              )
            })}
          </Grid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

const SkeletonOptions = () => {
  return (
    <>
      <Flex justify="space-between" align="center" mb={{ base: 2, sm: 4 }}>
        <Flex align="center">
          <Skeleton
            w={{ base: 10, sm: 16 }}
            h={{ base: 10, sm: 16 }}
            mr={{ base: 2, sm: 4 }}
          />
          <Skeleton w={{ base: 24, sm: 48 }} h={{ base: 6, sm: 8 }} />
        </Flex>
        <Skeleton w={{ base: 24, sm: 48 }} h={{ base: 6, sm: 8 }} />
      </Flex>
      <Flex justify="space-between" align="center" mb={{ base: 2, sm: 4 }}>
        <Flex align="center">
          <Skeleton
            w={{ base: 10, sm: 16 }}
            h={{ base: 10, sm: 16 }}
            mr={{ base: 2, sm: 4 }}
          />
          <Skeleton w={{ base: 24, sm: 48 }} h={{ base: 6, sm: 8 }} />
        </Flex>
        <Skeleton w={{ base: 24, sm: 48 }} h={{ base: 6, sm: 8 }} />
      </Flex>
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Skeleton
            w={{ base: 10, sm: 16 }}
            h={{ base: 10, sm: 16 }}
            mr={{ base: 2, sm: 4 }}
          />
          <Skeleton w={{ base: 24, sm: 48 }} h={{ base: 6, sm: 8 }} />
        </Flex>
        <Skeleton w={{ base: 24, sm: 48 }} h={{ base: 6, sm: 8 }} />
      </Flex>
    </>
  )
}

const FromToken = ({
  data,
  fromItem,
  setFromItem,
  toItem,
  setToItem,
  tokenInputValue,
  setTokenInputValue
}: {
  data: DataType[]
  fromItem: DataType | undefined
  setFromItem: (value: DataType) => void
  setToItem: (value: DataType) => void
  setTokenInputValue: (value: string) => void
  toItem: DataType | undefined
  tokenInputValue: string
}) => {
  const [checked, setChecked] = useState([false, false])
  const [checkedItems, setCheckedItems] = useState([
    {
      darkBg: "whiteAlpha.300",
      id: "max",
      label: "MAX",
      lightBg: "blackAlpha.300"
    },
    {
      darkBg: "whiteAlpha.300",
      id: "half",
      label: "HALF",
      lightBg: "blackAlpha.300"
    }
  ])
  const fromMenuRef = useRef<HTMLDivElement | null>(null)
  const { isOpen, onToggle, onClose } = useDisclosure()
  const customStyles = {
    control: (provided: SystemStyleObject) => ({
      ...provided,
      bg: useColorModeValue("blackAlpha.50", "whiteAlpha.50")
    }),
    menu: (provided: SystemStyleObject) => ({
      ...provided,
      maxH: { base: "sm", sm: "2xl" },
      mb: 0,
      mt: 3,
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
        width: "18px"
      },

      "&::-webkit-scrollbar-thumb": {
        background: useColorModeValue(
          "rgba(0,0,0,0.1)",
          "rgba(255,255,255,0.1)"
        ),
        borderRadius: "4px"
      },

      bg: "transparent",

      border: "none",

      borderRadius: "none",

      pr: { base: 2, sm: 4 },

      py: 0,

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
        ? useColorModeValue("primary.100", "primary.500")
        : "transparent",
      borderRadius: "2xl",
      color: "inherit"
    })
  }
  const IndicatorSeparator = () => {
    return null
  }

  const DropdownIndicator = () => {
    return null
  }

  const CustomOption = ({
    children,
    ...props
  }: OptionProps<DataType, true, GroupBase<DataType>>) => {
    return (
      <chakraComponents.Option {...props}>
        <Flex id={props.data.value} align="center" w="full">
          <Flex align="center" flex={1} mr={2}>
            <Box
              minW={{ base: 12, sm: 16 }}
              minH={{ base: 12, sm: 16 }}
              maxW={{ base: 12, sm: 16 }}
              maxH={{ base: 12, sm: 16 }}
              w="full"
              h="full"
              mr={{ base: 3, sm: 4 }}
            >
              <Image src={props.data.imgSrc} />
            </Box>
            <Box>
              <Text
                fontSize={{ base: "lg", sm: "2xl" }}
                fontWeight="bold"
                textAlign="start"
              >
                {children}
              </Text>
              <Text
                fontSize={{ base: "md", sm: "lg" }}
                fontWeight="bold"
                textAlign="start"
                color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
              >
                {props.data.ibc?.source_channel}
              </Text>
            </Box>
          </Flex>
          <Text
            fontSize={{ base: "md", sm: "xl" }}
            fontWeight="semibold"
            textAlign="end"
            wordBreak="break-word"
          >
            3.141595
          </Text>
        </Flex>
      </chakraComponents.Option>
    )
  }

  const CustomControl = ({
    children,
    ...props
  }: ControlProps<DataType, true>) => {
    return (
      <chakraComponents.Control {...props}>
        <Flex align="center" pl={4}>
          <Icon as={RiSearch2Fill} />
        </Flex>
        {children}
      </chakraComponents.Control>
    )
  }

  const AvailableCheckbox = ({
    label,
    id,
    lightBg,
    darkBg,
    index
  }: {
    darkBg: string
    id: string
    index: number
    label: string
    lightBg: string
  }) => {
    return (
      <Button
        id={id}
        variant="unstyled"
        fontSize="xs"
        bg={useColorModeValue(lightBg, darkBg)}
        color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
        borderRadius="md"
        fontWeight="semibold"
        _focus={{
          boxShadow: "none"
        }}
        onClick={(event) => {
          if (event.currentTarget.id === id) {
            setChecked((pre) => {
              const newArray = pre.map((v, index_) => {
                if (index_ === index) return !v
                return false
              })
              return newArray
            })
          }
        }}
        h={7}
        w={12}
      >
        {label}
      </Button>
    )
  }

  useEffect(() => {
    setCheckedItems((pre) => {
      const newItems = pre.map(({ lightBg, darkBg, ...rest }, index) => ({
        ...rest,
        darkBg: checked[index] ? "primary.800" : "whiteAlpha.300",
        lightBg: checked[index] ? "primary.100" : "blackAlpha.300"
      }))
      return newItems
    })
  }, [checked])

  useOutsideClick({
    handler: () => onClose(),
    ref: fromMenuRef
  })

  const bgColor = useColorModeValue("white", "gray.700")

  return (
    <Box
      ref={fromMenuRef}
      position="relative"
      bg={bgColor}
      shadow="md"
      as={motion.div}
      variants={fadeIn}
      borderRadius="3xl"
      zIndex={2}
      p={3}
      w="full"
    >
      <Flex
        position="relative"
        justify="space-between"
        flexDirection={{ base: "column", sm: "row" }}
        align={{ base: "start", sm: "center" }}
        mb={4}
      >
        <Text fontSize={"md"} fontWeight="bold" fontFamily="heading">
          From
        </Text>
        <Flex
          maxW={{ sm: "2xs" }}
          w="full"
          justify="space-between"
          align="center"
        >
          <Text fontSize={"md"} fontWeight="bold">
            Available
          </Text>
          <Text fontSize={"md"} fontWeight="bold" color="primary.300">
            0.2186
          </Text>
          {checkedItems.map(({ label, id, lightBg, darkBg }, index) => (
            <AvailableCheckbox
              label={label}
              id={id}
              lightBg={lightBg}
              darkBg={darkBg}
              index={index}
            />
          ))}
        </Flex>
      </Flex>
      <Menu>
        <Flex direction="row">
          <MenuButton
            flex={1}
            as={Button}
            variant="unstyled"
            whiteSpace="normal"
            _focus={{ boxShadow: "none" }}
            onClick={onToggle}
            maxW="full"
          >
            <Flex flexDirection="row" gap={3}>
              <Skeleton isLoaded={Boolean(fromItem)}>
                <Box
                  p={0.5}
                  w={{ base: 12, sm: "3.5rem" }}
                  h={{ base: 12, sm: "3.5rem" }}
                  borderRadius="full"
                >
                  <Image src={fromItem?.imgSrc} />
                </Box>
              </Skeleton>
              <Skeleton
                alignItems="center"
                isLoaded={Boolean(fromItem)}
                w={{ base: 24, sm: "60%" }}
                h={{ base: 6, sm: "3rem" }}
                display="flex"
              >
                <Text
                  fontSize={{ base: "xl", sm: "xl" }}
                  fontWeight="bold"
                  textAlign="start"
                  fontFamily="heading"
                >
                  {fromItem?.label}
                </Text>
                <Icon
                  as={isOpen ? FiChevronUp : FiChevronDown}
                  fontSize={{ base: "xl", sm: "3xl" }}
                  color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
                />
              </Skeleton>
            </Flex>
          </MenuButton>
          {fromItem ? (
            <Box flex={1}>
              <Editable
                variant="unstyled"
                fontSize={{ base: "lg", sm: "2xl" }}
                fontWeight="bold"
                textAlign="end"
                color={
                  tokenInputValue === "0"
                    ? useColorModeValue("blackAlpha.700", "whiteAlpha.700")
                    : useColorModeValue("blackAlpha.800", "whiteAlpha.800")
                }
                mb={{ base: 1, sm: 2 }}
                placeholder="0"
              >
                <EditablePreview />
                <EditableInput
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
                />
              </Editable>
              <Text
                fontSize={{ sm: "xl" }}
                textAlign="end"
                fontWeight="bold"
                color={
                  tokenInputValue === "0"
                    ? useColorModeValue("blackAlpha.600", "whiteAlpha.600")
                    : useColorModeValue("blackAlpha.700", "whiteAlpha.700")
                }
                mb={0}
              >
                ≈$0
              </Text>
            </Box>
          ) : (
            <Flex flexDirection="column" align="end">
              <Skeleton
                w={{ base: 20, sm: 36 }}
                h={{ base: 8, sm: 10 }}
                mb={2}
              />
              <Skeleton w={{ base: 12, sm: 16 }} h={{ base: 6, sm: 8 }} />
            </Flex>
          )}
        </Flex>

        <MenuList
          as={Box}
          position="relative"
          zIndex={2_000}
          backgroundBlendMode={"soft-light"}
          backdropFilter="blur(20px) saturate(140%)"
          bg="rgba(255,255,255,0.05)"
          boxShadow={
            isOpen ? "0 12px 20px -8px rgba(105, 88, 164, 0.5)" : "none"
          }
          borderRadius="2xl"
          left={0}
          right={0}
          px={6}
        >
          <Box py={6}>
            {fromItem ? (
              <AsyncSelect
                placeholder="Search"
                chakraStyles={customStyles}
                isClearable={false}
                // isOptionDisabled={(option) => option.label === 'Ion'} // test option disabled
                blurInputOnSelect={true}
                controlShouldRenderValue={false}
                menuIsOpen={true}
                loadingMessage={() => <SkeletonOptions />}
                defaultOptions={data}
                value={fromItem}
                loadOptions={(inputValue, callback) => {
                  setTimeout(() => {
                    const values = data.filter((option) =>
                      option.label
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    )
                    callback(values)
                  }, 1_000)
                }}
                onChange={(selectedOption) => {
                  let value = {}
                  value = { ...selectedOption }
                  setFromItem(value as DataType)
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
              <SkeletonOptions />
            )}
          </Box>
        </MenuList>
      </Menu>
    </Box>
  )
}

const ToToken = ({
  data,
  toItem,
  setToItem
}: {
  data: DataType[]
  setToItem: (value: DataType) => void
  toItem: DataType | undefined
}) => {
  const toMenuRef = useRef<HTMLDivElement | null>(null)
  const { isOpen, onToggle, onClose } = useDisclosure()
  const customStyles = {
    control: (provided: SystemStyleObject) => ({
      ...provided,
      bg: useColorModeValue("blackAlpha.50", "whiteAlpha.50")
    }),
    menu: (provided: SystemStyleObject) => ({
      ...provided,
      maxH: { base: "sm", sm: "2xl" },
      mb: 0,
      mt: 6,
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
        width: "18px"
      },

      "&::-webkit-scrollbar-thumb": {
        background: useColorModeValue(
          "rgba(0,0,0,0.1)",
          "rgba(255,255,255,0.1)"
        ),
        borderRadius: "4px"
      },

      bg: "transparent",

      border: "none",

      borderRadius: "none",

      pr: { base: 2, sm: 4 },

      py: 0,

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
        ? useColorModeValue("primary.100", "primary.500")
        : "transparent",
      borderRadius: "lg",
      color: "inherit"
    })
  }
  const IndicatorSeparator = () => {
    return null
  }

  const DropdownIndicator = () => {
    return null
  }

  const CustomOption = ({
    children,
    ...props
  }: OptionProps<DataType, true, GroupBase<DataType>>) => {
    return (
      <chakraComponents.Option {...props}>
        <Flex id={props.data.value} align="center" w="full">
          <Flex align="center" flex={1} mr={2}>
            <Box
              minW={{ base: 12, sm: 16 }}
              minH={{ base: 12, sm: 16 }}
              maxW={{ base: 12, sm: 16 }}
              maxH={{ base: 12, sm: 16 }}
              w="full"
              h="full"
              mr={{ base: 3, sm: 4 }}
            >
              <Image src={props.data.imgSrc} />
            </Box>
            <Box>
              <Text
                fontSize={{ base: "lg", sm: "2xl" }}
                fontWeight="bold"
                textAlign="start"
              >
                {children}
              </Text>
              <Text
                fontSize={{ base: "md", sm: "lg" }}
                fontWeight="bold"
                textAlign="start"
                color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
              >
                {props.data.ibc?.source_channel}
              </Text>
            </Box>
          </Flex>
          <Text
            fontSize={{ base: "md", sm: "xl" }}
            fontWeight="semibold"
            textAlign="end"
            wordBreak="break-word"
          >
            3.141595
          </Text>
        </Flex>
      </chakraComponents.Option>
    )
  }

  const CustomControl = ({
    children,
    ...props
  }: ControlProps<DataType, true>) => {
    return (
      <chakraComponents.Control {...props}>
        <Flex align="center" pl={4}>
          <Icon as={RiSearch2Fill} />
        </Flex>
        {children}
      </chakraComponents.Control>
    )
  }

  useOutsideClick({
    handler: () => onClose(),
    ref: toMenuRef
  })

  const bgColor = useColorModeValue("white", "gray.700")

  return (
    <Box
      ref={toMenuRef}
      position="relative"
      shadow="md"
      bg={bgColor}
      as={motion.div}
      variants={fadeIn}
      borderRadius="3xl"
      zIndex={2}
      p={3}
      w="full"
    >
      <Text fontSize={"md"} fontWeight="bold" fontFamily="heading">
        To
      </Text>
      <Flex align="center" maxW="full" h="fit-content">
        <Menu>
          <Flex direction="row">
            <MenuButton
              flex={1}
              as={Button}
              variant="unstyled"
              whiteSpace="normal"
              _focus={{ boxShadow: "none" }}
              onClick={onToggle}
              maxW="full"
            >
              <Flex flexDirection="row" gap={3}>
                <Skeleton isLoaded={Boolean(toItem)}>
                  <Box
                    p={0.5}
                    w={{ base: 12, sm: "3.5rem" }}
                    h={{ base: 12, sm: "3.5rem" }}
                  >
                    <Image src={toItem?.imgSrc} />
                  </Box>
                </Skeleton>
                <Skeleton
                  alignItems="center"
                  isLoaded={Boolean(toItem)}
                  w={{ base: 24, sm: "60%" }}
                  h={{ base: 6, sm: "3rem" }}
                  display="flex"
                >
                  <Text
                    fontSize={{ base: "xl", sm: "xl" }}
                    fontWeight="bold"
                    textAlign="start"
                    fontFamily="heading"
                  >
                    {toItem?.label}
                  </Text>
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
          </Flex>
          <Portal>
            <MenuList
              as={Box}
              position="relative"
              zIndex={2_000}
              borderRadius="2xl"
              left={0}
              right={0}
              px={6}
            >
              <Box py={6}>
                {toItem ? (
                  <AsyncSelect
                    placeholder="Search"
                    chakraStyles={customStyles}
                    isClearable={false}
                    // isOptionDisabled={(option) => option.label === 'Ion'} // test option disabled
                    blurInputOnSelect={true}
                    controlShouldRenderValue={false}
                    menuIsOpen={true}
                    loadingMessage={() => <SkeletonOptions />}
                    defaultOptions={data}
                    value={toItem}
                    loadOptions={(inputValue, callback) => {
                      setTimeout(() => {
                        const values = data.filter((option) =>
                          option.label
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                        )
                        callback(values)
                      }, 1_000)
                    }}
                    onChange={(selectedOption) => {
                      let value = {}
                      value = { ...selectedOption }
                      setToItem(value as DataType)
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
                  <SkeletonOptions />
                )}
              </Box>
            </MenuList>
          </Portal>
        </Menu>
      </Flex>
      <Box
        bg={useColorModeValue("gray.100", "gray.700")}
        boxShadow={isOpen ? "0 12px 20px -8px rgba(105, 88, 164, 0.5)" : "none"}
        borderRadius="xl"
        left={0}
        right={0}
        px={6}
      >
        <Collapse in={isOpen} animateOpacity>
          <Box py={6}>
            {toItem ? (
              <AsyncSelect
                placeholder="Search"
                chakraStyles={customStyles}
                isClearable={false}
                blurInputOnSelect={true}
                controlShouldRenderValue={false}
                menuIsOpen={true}
                loadingMessage={() => <SkeletonOptions />}
                defaultOptions={data}
                value={toItem}
                onChange={(selectedOption) => {
                  let value = {}
                  value = { ...selectedOption }
                  setToItem(value as DataType)
                  onClose()
                }}
                loadOptions={(inputValue, callback) => {
                  setTimeout(() => {
                    const values = data.filter((option) =>
                      option.label
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    )
                    callback(values)
                  }, 1_000)
                }}
                components={{
                  Control: CustomControl,
                  DropdownIndicator,
                  IndicatorSeparator,
                  Option: CustomOption
                }}
              />
            ) : (
              <SkeletonOptions />
            )}
          </Box>
        </Collapse>
      </Box>
    </Box>
  )
}

const Rate = ({
  fromItem,
  toItem,
  tokenInputValue
}: {
  fromItem: DataType | undefined
  toItem: DataType | undefined
  tokenInputValue: string
}) => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "whiteAlpha.200")}
      rounded="1em"
      shadow="lg"
      p={6}
    >
      <Flex
        justify="space-between"
        align="start"
        fontWeight="bold"
        fontSize={{ md: "lg" }}
        color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
        mb={1}
      >
        <Text flex={1} mr={2}>
          Rate
        </Text>
        {fromItem && toItem ? (
          <Stack
            as="span"
            isInline
            wrap="wrap"
            maxW={{ base: 56, sm: "initial" }}
            justify="end"
          >
            <Text>
              {tokenInputValue}&ensp;{fromItem.label}
            </Text>
            <Text>=</Text>
            <Text>3.265358&ensp;{toItem.label}</Text>
          </Stack>
        ) : (
          <Skeleton w={{ base: 32, sm: 48 }} h={{ base: 6, sm: 8 }} />
        )}
      </Flex>
      <Flex justify="end" mb={4}>
        {fromItem && toItem ? (
          <Stack
            as="span"
            isInline
            wrap="wrap"
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="bold"
            color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
            maxW={{ base: 56, sm: "initial" }}
            justify="end"
          >
            <Text>3.265358&ensp;{toItem.label}</Text>
            <Text>=</Text>
            <Text>
              {tokenInputValue}&ensp;{fromItem.label}
            </Text>
          </Stack>
        ) : (
          <Skeleton w={{ base: 28, sm: 40 }} h={{ base: 4, sm: 6 }} />
        )}
      </Flex>
      <Flex
        justify="space-between"
        fontWeight="bold"
        fontSize={{ md: "lg" }}
        color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
      >
        <Text>Swap Fee</Text>
        <Text>0.3%</Text>
      </Flex>
      <Divider
        borderColor={useColorModeValue("blackAlpha.400", "whiteAlpha.600")}
        my={{ base: 4, md: 6 }}
      />
      <Flex
        justify="space-between"
        fontWeight="bold"
        fontSize={{ md: "lg" }}
        color={useColorModeValue("blackAlpha.800", "whiteAlpha.900")}
      >
        <Text>Estimated Slippage</Text>
        <Text>&lt;&nbsp;0.001%</Text>
      </Flex>
    </Box>
  )
}

const Swap = () => {
  const [data, setData] = useState<DataType[]>([])
  const [fromItem, setFromItem] = useState<DataType>()
  const [toItem, setToItem] = useState<DataType>()
  const [loading, setLoading] = useState(true)
  const [tokenInputValue, setTokenInputValue] = useState("")

  const { assets } = useChain("juno")

  const priceDataMock = [
    {
      color: "hsl(339, 100%, 46%)",
      data: [
        {
          x: "12:00 AM",
          y: 22
        },
        {
          x: "03:00 AM",
          y: 30
        },
        {
          x: "06:00 AM",
          y: 45
        },
        {
          x: "09:00 AM",
          y: 50
        },
        {
          x: "12:00 PM",
          y: 42
        },
        {
          x: "03:00 PM",
          y: 40
        },
        {
          x: "18:00 PM",
          y: 56
        },
        {
          x: "21:00 PM",
          y: 66
        }
      ],
      id: "CCAT/ATOM"
    }
  ]

  setTimeout(() => {
    setLoading(false)
  }, 500)

  useEffect(() => {
    const assetList = [assets!]
      .map(({ assets: currentAssets }) => {
        return currentAssets.values()
      })
      // eslint-disable-next-line array-callback-return, consistent-return
      .map((iterator) => {
        // eslint-disable-next-line no-unreachable-loop
        for (const value of iterator) {
          return {
            ibc: value.ibc,
            imgSrc:
              value.logo_URIs?.svg ??
              value.logo_URIs?.png ??
              value.logo_URIs?.jpeg,
            label: value.name,
            value: value.name
          }
        }
      })
      .filter((a) => a?.imgSrc) // only images
      .sort(() => (Math.random() > 0.5 ? 1 : -1)) // random

    if (!loading) {
      // @ts-expect-error types
      setData(assetList)
      setFromItem(assetList[0])
      setToItem(assetList[0])
      setTokenInputValue("0")
    }
  }, [loading])

  const showUI = useRecoilValue(showUIState)
  const textColor = useColorModeValue("gray.800", "white")
  const bgColor = useColorModeValue("white", "gray.700")

  const [advancedMode, setAdvancedMode] = useRecoilState(
    marketAdvancedModeState
  )

  return (
    <Flex
      w="full"
      justify="center"
      align="center"
      direction="column"
      py={3}
      gap={3}
    >
      <MotionFlex
        pos="absolute"
        bottom="0.25rem"
        right="1rem"
        whileHover={{ scale: 1.1 }}
        _hover={{ cursor: "pointer", textDecoration: "none" }}
        as={Link}
        href="https://docs.hopers.io"
        target="_blank"
      >
        <Tag
          zIndex="2"
          fontSize="md"
          rounded="1em"
          bg="offwhite.1"
          h="2rem"
          pos="relative"
        >
          Need Help?
          <Box
            borderTop="5vh solid #f5f5f5"
            w="0"
            h="0"
            border="auto"
            borderLeft="1vh solid transparent"
            borderRight="1vh solid transparent"
            pos="absolute"
            top="25%"
            right="-20%"
            transform="rotate(-60deg)"
          ></Box>
        </Tag>
        <Image
          pos="relative"
          w="12rem"
          transform="scaleX(-1)"
          src="assets/character_004.png"
        />
      </MotionFlex>

      <AnimatePresence mode="wait">
        <MotionFlex
          as={motion.div}
          layout
          align="start"
          justifyContent="center"
          w="full"
          px={64}
          transition={{ type: "spring", bounce: 0 }}
        >
          {advancedMode && (
            <MotionFlex
              layout
              exit={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", bounce: 0 }}
              overflow="hidden"
              w="70%"
              h="full"
              bg={bgColor}
              shadow="xl"
              rounded="3xl"
              direction="column"
            >
              <HStack px={3} pt={2}>
                <AvatarGroup spacing={-3} size="md" max={2}>
                  <Avatar
                    border="0"
                    name={fromItem?.label}
                    src={fromItem?.imgSrc}
                  />
                  <Avatar
                    border="0"
                    backgroundBlendMode={"soft-light"}
                    backdropFilter="blur(20px) saturate(140%)"
                    bg="rgba(255,255,255,0.05)"
                    name={fromItem?.label}
                    src={toItem?.imgSrc}
                  />
                </AvatarGroup>
                <Heading fontSize="xl">
                  {fromItem?.label} / {toItem?.label}
                </Heading>
              </HStack>
              <HStack px={3} pb={2} pt={1} align="center">
                <Text fontWeight="900" fontSize="3xl">
                  0.008
                </Text>
                <Text fontSize="xl">
                  {fromItem?.label} / {toItem?.label}
                </Text>
                <Text color="green.300">+0.0004 (+8.56%)</Text>
              </HStack>
              <SwapChart data={priceDataMock} />
            </MotionFlex>
          )}

          <MotionFlex
            as={motion.div}
            flexDirection="column"
            layout
            gap={3}
            w="50%"
            px={{ base: 4, sm: 4 }}
            transition={{ type: "spring", bounce: 0 }}
          >
            <Flex as={motion.div} alignSelf="end">
              <Setting />
            </Flex>
            <Flex pos="relative" direction="column" gap={3} align="center">
              <FromToken
                data={data}
                fromItem={fromItem}
                toItem={toItem}
                tokenInputValue={tokenInputValue}
                setFromItem={setFromItem}
                setToItem={setToItem}
                setTokenInputValue={setTokenInputValue}
              />
              <Button
                as={motion.button}
                style={{
                  background: "#f5f5f5",
                  borderRadius: "50%",
                  height: "3rem",
                  position: "absolute",
                  top: "52%",
                  width: "3rem",
                  zIndex: 5
                }}
                shadow="md"
                overflow="hidden"
                whileHover={{ scale: 1.15 }}
                // @ts-expect-error types
                transition={{ bounce: 0.6, type: "spring" }}
                whileTap={{ scale: 0.9 }}
                aria-label="Switch Input and Output token"
                onClick={() => {
                  setFromItem(toItem as DataType)
                  setToItem(fromItem as DataType)
                }}
              >
                <Icon w="2rem" h="2rem" as={SwapIcon} />
              </Button>
              <ToToken data={data} toItem={toItem} setToItem={setToItem} />
            </Flex>
            {advancedMode && (
              <Rate
                fromItem={fromItem}
                toItem={toItem}
                tokenInputValue={tokenInputValue}
              />
            )}

            <Button
              h={{ base: 12, md: 16 }}
              w="full"
              rounded="3xl"
              colorScheme="catred"
            >
              Swap
            </Button>
          </MotionFlex>
        </MotionFlex>
      </AnimatePresence>
    </Flex>
  )
}

export default function () {
  return <Swap />
}
