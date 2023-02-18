import {
  useColorModeValue,
  Flex,
  Stack,
  Skeleton,
  Divider,
  Box,
  Text
} from "@chakra-ui/react"
import { TTokenListItem } from "utils/tokens/tokens"
import { DataType } from ".."

export const Rate = ({
  fromItem,
  toItem,
  tokenInputValue
}: {
  fromItem: TTokenListItem | undefined
  toItem: TTokenListItem | undefined
  tokenInputValue: string
}) => {
  return (
    <Box
      bg={useColorModeValue("offwhite.2", "gray.800")}
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
              {tokenInputValue}&ensp;{fromItem.name}
            </Text>
            <Text>=</Text>
            <Text>3.265358&ensp;{toItem.name}</Text>
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
            <Text>3.265358&ensp;{toItem.name}</Text>
            <Text>=</Text>
            <Text>
              {tokenInputValue}&ensp;{fromItem.name}
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
