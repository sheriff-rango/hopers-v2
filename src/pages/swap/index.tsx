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
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { BsExclamationCircleFill } from "react-icons/bs"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"
import { RiSettings4Fill, RiSearch2Fill } from "react-icons/ri"
import { useSearchParams } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { marketAdvancedModeState, showUIState } from "state/UIState"
import MotionFlex from "theme/motion/components/MotionFlex"
import fadeIn from "theme/motion/variants/general/fadeIn"
import { ChainConfigs, ChainTypes, ConfigType } from "utils/tokens/chains"
import { TokenStatus, TokenType, TTokenListItem } from "utils/tokens/tokens"
import { SwapChart } from "./components/Chart"
import { CustomSwitch } from "./components/CustomSwitch"
import { FromToken } from "./components/FromToken"
import { Rate } from "./components/Rate"
import { SettingsButton } from "./components/SettingsButton"
import { ToToken } from "./components/ToToken"
// import { useRecoilState, useRecoilValue } from "recoil"

export type DataType = OptionBase & {
  ibc?: {
    dst_channel?: string
    source_channel?: string
    source_denom?: string
  }
  imgSrc?: string
  label: string
  value: string
}

export const SwapSkeleton = () => {
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

const Swap = () => {
  const [data, setData] = useState<
    Array<TTokenListItem & { chainConfig: ConfigType | undefined }>
  >([])
  const [fromItem, setFromItem] = useState<
    TTokenListItem & { chainConfig: ConfigType | undefined }
  >()
  const [toItem, setToItem] = useState<
    TTokenListItem & { chainConfig: ConfigType | undefined }
  >()
  const [loading, setLoading] = useState(false)
  const [tokenInputValue, setTokenInputValue] = useState("")

  const { assets } = useChain("juno")

  const tokenList: Array<
    TTokenListItem & { chainConfig: ConfigType | undefined }
  > = useMemo(() => {
    const result = (
      Object.keys(TokenType) as Array<keyof typeof TokenType>
    ).map((key) => {
      const tokenType = TokenType[key]
      const tokenStatus = TokenStatus[TokenType[key]]
      return {
        name: key as string,
        token: TokenType[key],
        imageUrl: `/assets/listedTokens/${tokenType.replace(/\//g, "")}.png`,
        contract: TokenStatus[tokenType].contractAddress || "",
        chainConfig: ChainConfigs[tokenStatus.chain]
      }
    })
    // .filter((item) => !hideZeroAssets || item.balance > 0)
    return result
  }, [])

  const priceDataMock = [
    {
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

  let [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const assetList = tokenList.map((asset) => {
      return asset
    })
    // eslint-disable-next-line array-callback-return, consistent-return
    // .map((asset) => {
    //   // eslint-disable-next-line no-unreachable-loop
    //   for (const value of iterator) {
    //     return {
    //       ibc: value.ibc,
    //       imgSrc:
    //         value.logo_URIs?.svg ??
    //         value.logo_URIs?.png ??
    //         value.logo_URIs?.jpeg,
    //       label: value.name,
    //       value: value.name
    //     }
    //   }
    // })
    // .filter((a) => a?.imgSrc) // only images

    if (!loading) {
      setData(assetList)
      setFromItem(assetList[0])
      setToItem(assetList[1])
      setTokenInputValue("0")
    }
  }, [loading])

  useEffect(() => {
    for (const entry of searchParams.entries()) {
      const [param, value] = entry
      console.log(param, value)
    }
    setSearchParams({ from: "HOPERS", to: "JUNO" })
  }, [searchParams])

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
      pos="relative"
    >
      <Helmet>
        <title>Swap | Hopers.io</title>
      </Helmet>
      <MotionFlex
        pos="absolute"
        bottom="1.5rem"
        right="1.5rem"
        whileHover={{ scale: 1.1 }}
        _hover={{ cursor: "pointer", textDecoration: "none" }}
        as={Link}
        // @ts-ignore
        href="https://hopers-io.gitbook.io/documents/"
        target="_blank"
      >
        <Tag
          zIndex={2}
          fontSize="md"
          rounded="1em"
          bg="offwhite.1"
          _dark={{ bg: "gray.700", color: "white" }}
          h="2rem"
          pos="relative"
        >
          Need Help?
          <Box
            borderTop="5vh solid #f5f5f5"
            _dark={{ borderTop: "5vh solid", borderTopColor: "gray.700" }}
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
          w={advancedMode ? "8rem" : "12rem"}
          transform="scaleX(-1)"
          src="assets/character_004.png"
        />
      </MotionFlex>

      <AnimatePresence mode="wait">
        <MotionFlex
          as={motion.div}
          layout
          alignItems="start"
          justifyContent="center"
          w="full"
          gap={4}
          px={4}
          flexDirection={{ base: "column", md: "row" }}
          maxW={{ base: "md", md: advancedMode ? "6xl" : "2xl" }}
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
              flexDirection="column"
            >
              <HStack px={3} pt={2}>
                <AvatarGroup spacing={-3} size="md" max={2}>
                  <Avatar
                    border="0"
                    name={fromItem?.name}
                    src={fromItem?.imageUrl}
                  />
                  <Avatar
                    border="0"
                    backgroundBlendMode={"soft-light"}
                    backdropFilter="blur(20px) saturate(140%)"
                    bg="rgba(255,255,255,0.05)"
                    name={toItem?.name}
                    src={toItem?.imageUrl}
                  />
                </AvatarGroup>
                <Heading fontSize="xl">
                  {fromItem?.name} / {toItem?.name}
                </Heading>
              </HStack>
              <HStack px={3} pb={2} pt={1} align="center">
                <Text fontWeight="900" fontSize="3xl">
                  0.008
                </Text>
                <Text fontSize="xl">
                  {fromItem?.name} / {toItem?.name}
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
            gap={2}
            w="md"
            px={0}
            transition={{ type: "spring", bounce: 0 }}
          >
            <Flex as={motion.div} alignSelf="end">
              <SettingsButton />
            </Flex>
            <Flex
              pos="relative"
              direction="column"
              gap={3}
              align="center"
              zIndex={1}
            >
              <Button
                as={motion.button}
                rounded="full"
                bg="offwhite.1"
                _dark={{ bg: "gray.800" }}
                h="3rem"
                w="3rem"
                pos="absolute"
                top="52%"
                shadow="md"
                whileHover={{ scale: 1.15 }}
                // @ts-expect-error types
                transition={{ bounce: 0.2, type: "tween" }}
                whileTap={{ scale: 0.9 }}
                aria-label="Switch Input and Output token"
                onClick={() => {
                  setFromItem(toItem)
                  setToItem(fromItem)
                }}
                zIndex={2}
              >
                <Icon w="2rem" h="2rem" as={SwapIcon} />
              </Button>
              <FromToken
                data={data}
                fromItem={fromItem}
                toItem={toItem}
                tokenInputValue={tokenInputValue}
                setFromItem={setFromItem}
                setToItem={setToItem}
                setTokenInputValue={setTokenInputValue}
              />
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
              h={{ base: 12, md: "3rem" }}
              shadow="md"
              w="full"
              rounded="3xl"
              colorScheme="green"
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
