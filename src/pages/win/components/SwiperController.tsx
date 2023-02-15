import { Box, Center, Flex, IconButton } from "@chakra-ui/react"
import { PredictionCardsIcon } from "components/Assets/PredictionCardsIcon"
import { MotionFlex } from "components/MenuToggle"
import { MutableRefObject } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import MotionIconButton from "theme/motion/components/MotionIconButton"

export const SwiperController = ({
  prevRef,
  nextRef
}: {
  prevRef: any
  nextRef: any
}) => {
  return (
    <Flex
      justifyContent="space-around"
      alignItems="center"
      px={0}
      bg="white"
      rounded="1em"
      shadow="md"
      minW="16rem"
      h="2.5rem"
      pos="relative"
    >
      <MotionIconButton
        rounded="1em"
        whileHover={{ scale: 1.25, cursor: "pointer" }}
        whileTap={{ scale: 1 }}
        transition={{ type: "tween", duration: 0.2, ease: "linear" }}
        // @ts-ignore
        ref={prevRef}
      >
        <FaArrowLeft size={"26"} />
      </MotionIconButton>

      <PredictionCardsIcon
        w="4rem"
        h="4rem"
        pos="absolute"
        shadow="md"
        bg="white"
        rounded="full"
      />
      <MotionIconButton
        rounded="1em"
        whileHover={{ scale: 1.25, cursor: "pointer" }}
        whileTap={{ scale: 1 }}
        transition={{ type: "tween", duration: 0.2, ease: "linear" }}
        // @ts-ignore
        ref={nextRef}
      >
        <FaArrowRight size={"26"} />
      </MotionIconButton>
    </Flex>
  )
}
