import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  Skeleton,
  useBreakpoint,
  useColorModeValue,
  VStack
} from "@chakra-ui/react"
import { AssetsIcon } from "components/Assets/AssetsIcon"
import { FarmIcon } from "components/Assets/FarmIcon"
import { IDOIcon } from "components/Assets/IDOIcon"
import { NFTIcon } from "components/Assets/NFTIcon"
import { SwapIcon } from "components/Assets/SwapIcon"
import { WinIcon } from "components/Assets/WinIcon"
import { motion } from "framer-motion"
import { useCallback, useRef, useState } from "react"
import { BsHouseFill } from "react-icons/bs"
import { FaUserFriends, FaParachuteBox, FaStore } from "react-icons/fa"
import { MdFullscreen, MdFullscreenExit } from "react-icons/md"
import { useLocation } from "react-router-dom"
import { useRecoilState } from "recoil"
import { activeRouteState } from "state/UIState"
import NavigationButton, { NavigationButtonProps } from "./NavigationButton"

export const RouterArea = () => {
  const location = useLocation()
  const [, setActiveRoute] = useRecoilState(activeRouteState)

  const data: NavigationButtonProps[] = [
    {
      icon: <Icon zIndex={1} as={SwapIcon} h="full" w="full" />,
      label: "Trade",
      navId: 0,
      url: "/swap",
      subLinks: {
        Swap: "/swap",
        Liquidity: "/swap/liquidity",
        IBC: "/swap/ibc"
      }
    },
    {
      icon: <Icon zIndex={1} as={FarmIcon} h="full" w="1.8rem" />,
      label: "Farm",
      navId: 1,
      url: "/farm"
    },
    {
      icon: <Icon zIndex={1} as={WinIcon} h="full" w="1.7rem" />,
      label: "Win",
      navId: 2,
      url: "/win",
      subLinks: {
        Prediction: "/win"
      }
    },
    {
      icon: <Icon zIndex={1} as={AssetsIcon} h="full" w="full" />,
      label: "Assets",
      navId: 3,
      url: "/assets",
      isDisabled: true
    },
    {
      icon: <Icon zIndex={1} as={NFTIcon} h="full" w="1.8rem" />,
      isDisabled: true,
      label: "NFTs",
      navId: 4,
      url: "/collections"
    },
    {
      icon: <Icon zIndex={1} as={IDOIcon} h="full" w="1.8rem" />,
      isDisabled: true,
      label: "IDO",
      navId: 5,
      url: "/ido"
    }
  ]

  const initialIndex = useCallback(() => {
    let initialIndexId = 0
    switch (location.pathname.split("/")[1]) {
      case "swap":
        initialIndexId = 0
        setActiveRoute(data[0].subLinks)
        break
      case "farm":
        initialIndexId = 1
        setActiveRoute(data[1].subLinks)
        break
      case "win":
        initialIndexId = 2
        setActiveRoute(data[2].subLinks)
        break
      case "assets":
        initialIndexId = 3
        setActiveRoute(data[3].subLinks)
        break
      case "collections":
        initialIndexId = 4
        setActiveRoute(data[4].subLinks)
        break
      case "ido":
        initialIndexId = 5
        setActiveRoute(data[5].subLinks)
        break
      default:
        break
    }

    return initialIndexId
  }, [])

  const textColor = useColorModeValue("gray.800", "white")

  const menuColor = useColorModeValue(
    "linear(to-br, white, offwhite.3)",
    "linear(to-br, blue.800, blue.900)"
  )

  const [activeIndex, setActiveIndex] = useState<number>(initialIndex)

  const ref = useRef<HTMLDivElement>(null)

  const breakpoint = useBreakpoint()
  const isMobile = Boolean(breakpoint === "base" || breakpoint === "sm")

  const handleClick = (
    navid: number,
    subLinks: Record<string, string> | undefined
  ) => {
    setActiveIndex(navid)
    setActiveRoute(subLinks)
  }

  return (
    <Flex
      ref={ref}
      justify="start"
      align="start"
      pos="relative"
      left={isMobile ? 8 : 0}
    >
      {isMobile ? (
        <Menu>
          {({ isOpen, onClose }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={IconButton}
                rounded="full"
                minWidth="2rem"
                h={{ base: "2rem", md: "4rem" }}
                w={{ base: "2rem", md: "4rem" }}
                icon={
                  <MenuButton
                    isOpen={isOpen}
                    strokeWidth="2"
                    color={textColor}
                    lineProps={{ strokeLinecap: "round" }}
                    // @ts-expect-error types
                    transition={{ damping: 15, stiffness: 180, type: "spring" }}
                    width="14"
                    height="11"
                  />
                }
              />
              <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent
                  roundedEnd="3xl"
                  overflow="hidden"
                  bgGradient={menuColor}
                >
                  <DrawerBody px={3}>
                    <Flex gap={1} direction="column">
                      {data.map((props: NavigationButtonProps) => {
                        return (
                          <motion.div
                            key={props.navId}
                            layout
                            onClick={() => {
                              handleClick(props.navId, props.subLinks)
                            }}
                          >
                            <NavigationButton
                              activeIndex={activeIndex}
                              {...props}
                              icon={props.icon}
                            />
                          </motion.div>
                        )
                      })}
                    </Flex>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Menu>
      ) : (
        <HStack spacing={3} align="center" px={3}>
          {data.map((props: NavigationButtonProps) => {
            return (
              <NavigationButton
                key={props.navId}
                isDisabled={props.isDisabled}
                onClick={() => {
                  handleClick(props.navId, props.subLinks)
                }}
                activeIndex={activeIndex}
                {...props}
              />
            )
          })}
        </HStack>
      )}
    </Flex>
  )
}
