import {
  useDisclosure,
  SystemStyleObject,
  useColorModeValue,
  Flex,
  Icon,
  useOutsideClick,
  Menu,
  MenuButton,
  Button,
  Skeleton,
  Portal,
  MenuList,
  Collapse,
  Box,
  Image,
  Text,
  VStack,
  Spacer
} from "@chakra-ui/react"
import {
  OptionProps,
  GroupBase,
  chakraComponents,
  ControlProps,
  AsyncSelect
} from "chakra-react-select"
import { motion } from "framer-motion"
import { useRef } from "react"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"
import { RiSearch2Fill } from "react-icons/ri"
import fadeIn from "theme/motion/variants/general/fadeIn"
import { ChainTypes, ConfigType } from "utils/tokens/chains"
import { TTokenListItem } from "utils/tokens/tokens"
import { DataType, SwapSkeleton } from ".."
import { CustomControl, CustomOption, customStyles } from "./FromToken"

export const ToToken = ({
  data,
  toItem,
  setToItem
}: {
  data: Array<TTokenListItem & { chainConfig: ConfigType | undefined }>
  setToItem: (
    value: TTokenListItem & { chainConfig: ConfigType | undefined }
  ) => void
  toItem: (TTokenListItem & { chainConfig: ConfigType | undefined }) | undefined
}) => {
  const toMenuRef = useRef<HTMLDivElement | null>(null)
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
      ref={toMenuRef}
      position="relative"
      bg={bgColor}
      shadow="md"
      as={motion.div}
      variants={fadeIn}
      borderRadius="1em"
      px={3}
      py={2}
      w="full"
    >
      <Flex
        position="relative"
        justify="space-between"
        flexDirection={{ base: "column", sm: "row" }}
        align={{ base: "start", sm: "center" }}
        w="full"
      >
        <Menu>
          {({ isOpen }) => (
            <>
              <Flex direction="row" w="full" justify="space-between">
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
                    <Skeleton rounded="full" isLoaded={Boolean(toItem)}>
                      <Box
                        rounded="full"
                        w={{ base: 12, md: "3rem" }}
                        h={{ base: 12, md: "3rem" }}
                      >
                        <Image src={toItem?.imageUrl} />
                      </Box>
                    </Skeleton>
                    <Skeleton
                      alignItems="center"
                      isLoaded={Boolean(toItem)}
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
                          {toItem?.name}
                        </Text>
                        <Text
                          fontSize={{ base: "xl", sm: "md" }}
                          textAlign="start"
                          fontFamily="heading"
                        >
                          {toItem?.chainConfig?.chainName}
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
                {toItem ? (
                  <Box flex={1}>
                    <Text
                      variant="unstyled"
                      fontSize={{ base: "lg", sm: "24" }}
                      fontWeight="bold"
                      textAlign="end"
                      color="gray.800"
                      _dark={{ color: "white" }}
                      mb={{ base: 1, md: 0 }}
                      placeholder="0"
                    >
                      0
                    </Text>
                    <Text
                      fontSize={{ sm: "16" }}
                      textAlign="end"
                      fontWeight="bold"
                      color="gray.800"
                      _dark={{ color: "white" }}
                      mb={0}
                    >
                      $0
                    </Text>
                  </Box>
                ) : (
                  <Flex flexDirection="column" align="end">
                    <Skeleton
                      w={{ base: 20, sm: 36 }}
                      h={{ base: 8, sm: 10 }}
                    />
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
                    {toItem ? (
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
                        value={toItem}
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
                          setToItem(
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
      </Flex>
    </Box>
  )
}
