import { Text, Heading, Center, HStack, IconButton } from "@chakra-ui/react"
import { BiArrowFromLeft } from "react-icons/bi"
import { BsClockFill } from "react-icons/bs"
import { FaQuestionCircle } from "react-icons/fa"

export const GameTimer = () => {
  return (
    <HStack
      pos={{ base: "relative", md: "absolute" }}
      right={{ base: "0rem", md: "6rem" }}
    >
      <Center gap={3} px={4} bg="white" rounded="1em" shadow="md" h="2.5rem">
        <Heading fontSize="24">00:00</Heading>
        <Text>5m</Text>
        <BsClockFill />
      </Center>
      <IconButton
        rounded="1em"
        bg="white"
        shadow="md"
        icon={<FaQuestionCircle />}
        aria-label="Open Documentation / Help"
      />
    </HStack>
  )
}
