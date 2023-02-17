/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDimensions
} from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { motion } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import { useEffect, useRef, useState } from "react"
import { BsFillCheckCircleFill } from "react-icons/bs"
import { QRCode } from "react-qrcode-logo"
import { SIZES, Variants } from "./ConnectWalletButton"

import { handleChangeColorModeValue } from "./DefaultComponent"
import {
  AnimateBox,
  AnimateGridItem,
  LoadingVariants,
  ModalContentVariants
} from "./Motion"
import {
  ConnectModalContentType,
  DisplayWalletListType,
  DownloadWalletButtonType
} from "./types"

export const SimpleInstallWalletButton = ({
  icon,
  text,
  onClick,
  disabled
}: DownloadWalletButtonType) => {
  const { colorMode } = useColorMode()
  return (
    <Button
      variant="unstyled"
      h="auto"
      as={motion.button}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      fontWeight="200"
      fontSize="md"
      color={handleChangeColorModeValue(colorMode, "gray.800", "white")}
      shadow="md"
      bg={handleChangeColorModeValue(
        colorMode,
        "rgba(2,226,150, 1)",
        "gray.800"
      )}
      rounded="0.9em"
      _hover={{
        filter: "brightness(110%)"
      }}
      _active={{ opacity: 0.9 }}
      _focus={{ outline: "none" }}
      _disabled={{
        opacity: 0.5,
        cursor: "not-allowed",
        _hover: { opacity: 0.5 },
        _active: { opacity: 0.5 }
      }}
      isDisabled={disabled}
      onClick={onClick}
    >
      <Stack
        w="full"
        isInline={true}
        justifyContent="center"
        alignItems="center"
        p={3}
      >
        {icon && <Icon as={icon} />}
        <Text whiteSpace="break-spaces">{text ? text : `Install Wallet`}</Text>
      </Stack>
    </Button>
  )
}

export const SimpleDisplayModalContent = ({
  status,
  logo,
  contentHeader,
  contentDesc,
  username,
  walletIcon,
  addressButton,
  bottomButton
}: ConnectModalContentType) => {
  const { colorMode } = useColorMode()
  const { closeView } = useChain("juno")
  const Style = {
    warning: {
      color: handleChangeColorModeValue(colorMode, "orange.300", "orange.400")
    },
    error: {
      color: handleChangeColorModeValue(colorMode, "red.400", "red.500")
    },
    loading: {
      color: handleChangeColorModeValue(colorMode, "inherit", "inherit")
    }
  }

  return (
    <AnimateBox
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={ModalContentVariants}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p={4}
        gap={3}
      >
        {logo && (
          <Center
            position="relative"
            mx="auto"
            w={20}
            h={20}
            minW={20}
            minH={20}
            maxW={20}
            maxH={20}
            mb={typeof logo === "string" ? 4 : 2}
          >
            {status === "loading" && (
              <AnimateBox
                position="absolute"
                top={-1.5}
                right={-1.5}
                bottom={-1.5}
                left={-1.5}
                border="5px solid"
                borderTopColor="transparent"
                borderBottomColor="transparent"
                borderLeftColor={useColorModeValue("orange.400", "green.600")}
                borderRightColor={useColorModeValue("orange.400", "green.600")}
                borderRadius="full"
                initial="hidden"
                animate="animate"
                variants={LoadingVariants}
              ></AnimateBox>
            )}
            {(status === "warning" || status === "error") && (
              <Box
                position="absolute"
                top={-2}
                right={-2}
                bottom={-2}
                left={-2}
                border="2px solid"
                borderColor={Style[status].color}
                borderRadius="full"
              ></Box>
            )}
            <Box borderRadius="full" p={typeof logo === "string" ? 3.5 : 0}>
              {typeof logo === "string" ? (
                <Image src={logo} w="full" h="full" />
              ) : (
                <Icon as={logo} w="full" h="full" />
              )}
            </Box>
          </Center>
        )}
        {contentHeader && (
          <Text
            fontSize="xl"
            fontWeight="200"
            fontFamily="heading"
            color={
              Style[status!]?.color ||
              handleChangeColorModeValue(colorMode, "gray.800", "white")
            }
            mb={1}
          >
            {contentHeader}
          </Text>
        )}
        {contentDesc && (
          <Box position="relative">
            <Box
              w="full"
              h={"6rem"}
              overflowY="scroll"
              css={{
                // For Firefox
                scrollbarWidth: "none",
                // For Chrome and other browsers except Firefox
                "&::-webkit-scrollbar": {
                  display: "none"
                }
              }}
            >
              <Text
                textAlign="left"
                fontSize="md"
                lineHeight={1.2}
                whiteSpace="pre-line"
                maxW="40rem"
                px={8}
              >
                {contentDesc}
              </Text>
            </Box>
          </Box>
        )}
        {username && (
          <HStack
            bg={useColorModeValue("rgba(2,226,150, 1)", "gray.800")}
            px={3}
            py={1}
            gap={3}
            shadow="md"
            rounded="1em"
          >
            <Stack isInline={true} justifyContent="center" alignItems="center">
              <Center w={6} h={6} minW={4} minH={4} maxW={6} maxH={6}>
                <Image src={walletIcon} />
              </Center>
              <Text
                fontSize="1.4em"
                fontWeight="600"
                fontFamily="heading"
                color={useColorModeValue("gray.800", "white")}
              >
                {username}
              </Text>
            </Stack>

            {addressButton && <Flex flex={1}>{addressButton}</Flex>}
          </HStack>
        )}

        {bottomButton && (
          <Flex w="full" gap={2} justify="center">
            {bottomButton}
            <IconButton
              shadow="md"
              as={motion.button}
              aria-label="Confirm Wallet Selection"
              rounded="0.9em"
              icon={<Icon as={BsFillCheckCircleFill}></Icon>}
              {...Variants(colorMode)[
                "primary" as keyof ReturnType<typeof Variants>
              ]}
              w={SIZES["lg" as keyof typeof SIZES].h}
              h={SIZES["lg" as keyof typeof SIZES].h}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              display="flex"
              alignItems="center"
              fontSize={SIZES["lg" as keyof typeof SIZES].fontSize}
              onClick={() => closeView()}
            />
          </Flex>
        )}
      </Flex>
    </AnimateBox>
  )
}

export const SimpleQRCode = ({
  link,
  description
}: {
  link: string
  description?: string
}) => {
  const elementRef = useRef(null)
  const { colorMode } = useColorMode()
  return (
    <AnimateBox
      ref={elementRef}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={ModalContentVariants}
    >
      <Stack justifyContent="center" alignItems="center" spacing={4} p={4}>
        {description && (
          <Text
            fontWeight="medium"
            textAlign="center"
            opacity={0.75}
            color={handleChangeColorModeValue(colorMode, "gray.800", "white")}
          >
            {description}
          </Text>
        )}
        <Center borderRadius="0.9em" overflow="hidden">
          <Flex
            maxW="sm"
            rounded="3xl"
            overflow="hidden"
            as={QRCode}
            value={link}
            logoImage={"/assets/logo_transparent.png"}
            eyeRadius={[
              [25, 25, 0, 25], // top/left eye
              [25, 25, 25, 0], // top/right eye
              [25, 0, 25, 25] // bottom/left
            ]}
            quietZone={20}
            qrStyle="dots"
            logoWidth={100}
            size={350}
            bgColor={"#ffffff"}
            fgColor={"rgba(2,226,150, 1)"}
            ecLevel={"L"}
          />
        </Center>
      </Stack>
    </AnimateBox>
  )
}

export const SimpleDisplayWalletList = ({
  initialFocus,
  walletsData
}: DisplayWalletListType) => {
  const { colorMode } = useColorMode()
  const listRef = useRef(null)

  return (
    <AnimateBox
      initial="hidden"
      animate="enter"
      variants={ModalContentVariants}
    >
      <Grid
        ref={listRef}
        position="relative"
        templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
        templateRows={{ base: "max-content", md: "auto" }}
        columnGap={2.5}
        rowGap={2}
        maxH={80}
        minH={36}
        overflowY="scroll"
        paddingInline={0}
        px={6}
        py={3}
        css={{
          // for firefox
          scrollbarWidth: "none",
          // for chrome
          "::-webkit-scrollbar": {
            display: "none"
          },
          maskImage: `linear-gradient(
            to bottom,
            transparent,
            black 1rem,
            black calc(100% - 1rem),
            transparent
          )`
        }}
      >
        {walletsData.map(({ name, prettyName, logo, onClick }, i) => {
          return (
            <GridItem
              key={i}
              colSpan={{ base: 2, md: i > 2 ? 3 : "auto" }}
              w="full"
            >
              <Button
                ref={i === 0 ? initialFocus : null}
                id={name}
                key={name}
                variant="unstyled"
                display="flex"
                w="full"
                h="fit-content"
                p={{ base: 2, md: i > 2 ? 2 : 3 }}
                py={{ md: i > 2 ? 2 : 7 }}
                mb={{ base: 0, md: i > 2 ? 0 : 1.5 }}
                justifyContent="start"
                borderRadius="0.9em"
                whiteSpace="break-spaces"
                transition="all .15s ease-in-out"
                bg={handleChangeColorModeValue(
                  colorMode,
                  "rgb(2,226,150)",
                  "rgb(0, 163, 109)"
                )}
                _hover={{
                  filter: "brightness(110%)"
                }}
                _focus={{
                  filter: "brightness(90%)"
                }}
                onClick={onClick}
              >
                <Flex
                  w="full"
                  flexDirection={{ base: "row", md: i > 2 ? "row" : "column" }}
                  justifyContent="start"
                  alignItems="center"
                >
                  <Box
                    borderRadius="0.8em"
                    overflow="hidden"
                    w={{ base: 8, md: i > 2 ? 8 : 14 }}
                    h={{ base: 8, md: i > 2 ? 8 : 14 }}
                    minW={{ base: 8, md: i > 2 ? 8 : 14 }}
                    minH={{ base: 8, md: i > 2 ? 8 : 14 }}
                    maxW={{ base: 8, md: i > 2 ? 8 : 14 }}
                    maxH={{ base: 8, md: i > 2 ? 8 : 14 }}
                    mr={{ base: 4, md: i > 2 ? 4 : 0 }}
                    mb={{ base: 0, md: i > 2 ? 0 : 3 }}
                  >
                    <Image src={typeof logo === "string" ? logo : void 0} />
                  </Box>
                  <Box textAlign="start" flex={1}>
                    <Text
                      color="gray.800"
                      _dark={{ color: "white" }}
                      fontSize={i >= 3 ? "md" : "xl"}
                      fontWeight="200"
                      fontFamily="heading"
                      lineHeight={1.2}
                    >
                      {prettyName}
                    </Text>
                  </Box>
                </Flex>
              </Button>
            </GridItem>
          )
        })}
      </Grid>
    </AnimateBox>
  )
}
