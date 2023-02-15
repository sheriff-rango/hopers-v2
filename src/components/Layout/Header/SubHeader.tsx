import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { activeRouteState } from "state/UIState"

export const SubHeader = () => {
  const activeRoute = useRecoilValue(activeRouteState)
  return (
    <Tabs w="full">
      {activeRoute && (
        <TabList
          bg="white"
          h="2.5rem"
          w="full"
          justifyContent="center"
          alignItems="center"
          borderBottom="none"
          shadow="md"
        >
          {Object.entries(activeRoute).map((route) => {
            return (
              <Tab
                color="rgba(2,226,150, 1)"
                borderBottom="3px solid"
                fontWeight="600"
                py={"0.35rem"}
                fontSize="19"
              >
                <Link to={route[1]}>{route[0]}</Link>
              </Tab>
            )
          })}
        </TabList>
      )}
    </Tabs>
  )
}
