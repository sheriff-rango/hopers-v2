import {
  type BoxProps,
  type ButtonProps,
  Box,
  Button,
  Text,
  Tag,
  useColorModeValue,
  Skeleton,
  HStack,
  SkeletonCircle,
  Flex,
  Icon,
  keyframes,
  Portal,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Divider,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  useDisclosure
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useEffect, useState, type ReactElement } from "react"
import { Link, useLocation } from "react-router-dom"

export type NavigationButtonProps = ButtonProps & {
  activeIndex?: number
  icon: ReactElement
  isDisabled?: boolean
  isLimited?: boolean
  label: string
  navId: number
  subLinks?: Record<string, string>
  onClick?: () => void
  url: string
}

const MotionBox = motion<BoxProps>(Box)

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(230,100,10,0.8);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 4px rgba(80,0,255,0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(80,0,255, 0);
  }
`

// eslint-disable-next-line complexity
const NavigationButton = ({
  label,
  url,
  activeIndex,
  navId,
  isDisabled,
  icon,
  onClick,
  subLinks
}: NavigationButtonProps) => {
  const [isActive, setisActive] = useState(false)
  const textColor = useColorModeValue(
    "gray.800",
    isActive ? "white" : "offwhite.4"
  )

  const { pathname } = useLocation()

  //   const showUI = useRecoilValue(showUIState)
  //   const [isCollapsed, setIsCollapsed] = useRecoilState(isNavCollapsedState)

  useEffect(() => {
    if (navId === activeIndex) {
      setisActive(true)
    } else {
      setisActive(false)
    }
  }, [activeIndex])

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Menu isOpen={isOpen} offset={[0, 5]}>
      <Link
        to={isDisabled ? "" : url}
        style={{
          pointerEvents: isDisabled ? "none" : "all",
          position: "relative"
        }}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        <MenuButton
          _disabled={{ opacity: 0.35 }}
          boxShadow="none"
          disabled={isDisabled}
          _hover={{
            background: url === pathname ? "transparent" : "rgba(2,226,150, 1)",
            cursor: url === pathname ? "default" : "pointer"
          }}
          _focus={{
            background:
              url === pathname ? "transparent" : "rgba(255,255,255,0.2)"
          }}
          pos="relative"
          px={3}
          minW="4rem"
          rounded="1em"
          onClick={onClick}
          gap={3}
          justifyContent="start"
          alignItems="center"
        >
          <HStack spacing={2}>
            <SkeletonCircle w="1.5rem" isLoaded={true} zIndex={2}>
              {icon}
            </SkeletonCircle>
            <Skeleton isLoaded={true} rounded="1em" zIndex={2}>
              <Text
                zIndex={2}
                transition="0.35s all"
                color={textColor}
                fontSize="1.2em"
                fontWeight="600"
                fontFamily="heading"
                textAlign="start"
              >
                {label}
              </Text>
            </Skeleton>
          </HStack>

          {isActive && (
            <MotionBox
              bg="rgba(2,226,150, 1)"
              inset={0}
              layoutId="navButton"
              pos="absolute"
              rounded="1.1rem"
              zIndex={0}
              // @ts-expect-error {"MotionValue(string) != string"
              transition={{
                bounce: 0.6,
                damping: 20,
                mass: 1,
                type: "spring"
              }}
            />
          )}
        </MenuButton>
      </Link>
      {subLinks && (
        <MenuList
          rounded="1em"
          overflow="hidden"
          py={0}
          shadow="md"
          border="none"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          {Object.entries(subLinks).map((subLink) => {
            return (
              <Link
                to={isDisabled ? "" : url}
                style={{
                  pointerEvents: isDisabled ? "none" : "all",
                  position: "relative"
                }}
              >
                <MenuItem
                  py={2}
                  fontSize="17"
                  fontWeight="500"
                  _hover={{ bg: "rgba(2, 226, 150, 0.4)" }}
                >
                  {subLink[0]}
                </MenuItem>
              </Link>
            )
          })}
        </MenuList>
      )}
    </Menu>
  )
}

export default NavigationButton
