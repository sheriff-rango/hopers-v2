/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Flex, Icon } from "@chakra-ui/react"
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion"
import { useEffect } from "react"
import { FaCheck, FaTimes } from "react-icons/fa"
import { useRecoilState } from "recoil"
import { marketAdvancedModeState } from "state/UIState"

export const CustomSwitch = ({
  defaultValue,
  onToggle
}: {
  defaultValue: boolean | undefined
  onToggle: () => void
}) => {
  const [advancedMode, setAdvancedMode] = useRecoilState(
    marketAdvancedModeState
  )

  const colorModeBgColor = useMotionValue(
    "linear-gradient(109.8deg, rgba(253,203,50,1) 0%,  rgba(244,56,98,1) 100.2%), rgba(244,56,98,1) 100.2%)"
  )

  useEffect(() => {
    if (advancedMode) {
      animate(
        colorModeBgColor,
        "linear-gradient(109.8deg, rgba(53,153,100,1) 0%, rgba(53,193,100,1) 80%, rgba(153,183,100,1) 100.2%)",
        {
          duration: 0.5,
          type: "tween"
        }
      )
    } else {
      animate(
        colorModeBgColor,
        "linear-gradient(109.8deg,rgba(25,55,95,1) -5.2%, rgba(25,55,105,1) -5.2%, rgba(25,55,125,1) 103.3%)",
        {
          duration: 0.5,
          type: "tween"
        }
      )
    }
  }, [advancedMode])

  return (
    <Flex
      as={motion.div}
      align="center"
      px={1}
      cursor="pointer"
      transition="all .3s"
      overflow="hidden"
      w="3rem"
      h="1.7rem"
      rounded="2xl"
      onClick={() => {
        setAdvancedMode(!advancedMode)
        onToggle()
      }}
      style={{
        // @ts-expect-error Chakra Types WIP
        backgroundImage: colorModeBgColor,
        justifyContent: advancedMode ? "flex-end" : "flex-start"
      }}
    >
      <Flex
        align="center"
        justify="center"
        overflow="hidden"
        as={motion.div}
        layout
        bg="white"
        boxSize="1.3rem"
        rounded="50%"
      >
        <AnimatePresence mode="wait" initial={false}>
          {advancedMode ? (
            <Flex
              align="center"
              justify="center"
              as={motion.div}
              key="lightModeButton"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
            >
              <Icon color="green.500" as={FaCheck} />
            </Flex>
          ) : (
            <Flex
              align="center"
              justify="center"
              as={motion.div}
              key="darkModeButton"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              style={{ width: "1rem" }}
            >
              <Icon as={FaTimes} color="rgba(25,55,125,1)" />
            </Flex>
          )}
        </AnimatePresence>
      </Flex>
    </Flex>
  )
}
