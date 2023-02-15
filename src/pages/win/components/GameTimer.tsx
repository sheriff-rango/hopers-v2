import { Text, Heading, Center } from "@chakra-ui/react"
import { BiArrowFromLeft } from "react-icons/bi"
import { BsClockFill } from "react-icons/bs"

export const GameTimer = () => {
  return (
    <Center
      gap={3}
      px={4}
      pos="absolute"
      right="6rem"
      bg="white"
      rounded="1em"
      shadow="md"
      h="2.5rem"
    >
      <Heading fontSize="24">00:00</Heading>
      <Text>5m</Text>
      <BsClockFill />
    </Center>
  )
}
