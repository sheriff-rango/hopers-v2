import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const Page404 = () => {
  const navigate = useNavigate()

  const handleBackToHome = () => navigate("/")

  return (
    <Center flexDirection="column" textAlign="center">
      <Heading fontSize="5em">Page Not Found</Heading>
      <VStack gap={3} pt={2}>
        <Text fontSize="2xl">There's nothing here. Want to go back?</Text>
        <Button
          rounded="1em"
          shadow="md"
          bg="white"
          _hover={{ bg: "gray.100" }}
          fontSize="1.3em"
          onClick={handleBackToHome}
        >
          Let&apos;s Head Back!
        </Button>
      </VStack>
    </Center>
  )
}

export default Page404
