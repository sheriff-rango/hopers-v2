import {
  Button,
  chakra,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack
} from "@chakra-ui/react"
import { FaQuestionCircle } from "react-icons/fa"
import { GameTimer } from "./components/GameTimer"
import { PairPicker } from "./components/PairPicker"
import { PredictionGameCard } from "./components/PredictionGameCard"
import { SwiperController } from "./components/SwiperController"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import { EffectCoverflow, Navigation, Pagination, Virtual } from "swiper"
import { type Swiper as SwiperRef } from "swiper"
import { useRef, useCallback, useState, useEffect } from "react"

const Win = () => {
  // const sliderRef = useRef<SwiperRef>(null)

  // const handlePrev = useCallback(() => {
  //   if (!sliderRef.current) return
  //   sliderRef.current.slidePrev()
  // }, [])

  // const handleNext = useCallback(() => {
  //   if (!sliderRef.current) return
  //   sliderRef.current.slideNext()
  // }, [])

  const [swiper, setSwiper] = useState<SwiperRef>()
  const prevRef = useRef()
  const nextRef = useRef()

  useEffect(() => {
    if (swiper) {
      console.log("Swiper instance:", swiper)
      // @ts-expect-error
      swiper.params.navigation.prevEl = prevRef.current
      // @ts-expect-error
      swiper.params.navigation.nextEl = nextRef.current
      swiper.navigation.init()
      swiper.navigation.update()
    }
  }, [swiper])

  return (
    <Flex
      gap={12}
      align="center"
      w="full"
      justify="center"
      direction="column"
      px={32}
    >
      <Flex w="full" justify="center">
        <PairPicker />
        <SwiperController nextRef={nextRef} prevRef={prevRef} />
        <GameTimer />
      </Flex>
      <Swiper
        style={{
          width: "100%",
          overflow: "visible",
          minHeight: "23rem",
          justifyContent: "center"
        }}
        effect={"coverflow"}
        grabCursor={false}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 0,
          modifier: 0.5,
          slideShadows: false
        }}
        // onInit={() => {
        //   setInit(true)
        // }}
        pagination={true}
        spaceBetween={0}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1
          },
          "@0.50": {
            slidesPerView: 3
          },
          "@1.50": {
            slidesPerView: 5,
            spaceBetween: 30
          }
        }}
        // onBeforeInit={(swiper) => {
        //   swiper.navigation.nextEl = navigationNextRef.current!
        //   swiper.navigation.prevEl = navigationPrevRef.current!
        // }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => setSwiper(swiper)}
        modules={[EffectCoverflow, Pagination, Virtual, Navigation]}
        navigation={{
          prevEl: prevRef?.current,
          nextEl: nextRef?.current
        }}
        initialSlide={3}
        // ref={sliderRef}
      >
        <SwiperSlide
          style={{
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PredictionGameCard gameStatus={"expired"} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PredictionGameCard gameStatus={"expired"} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PredictionGameCard gameStatus={"expired"} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PredictionGameCard gameStatus={"live"} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PredictionGameCard gameStatus={"next"} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PredictionGameCard gameStatus={"later"} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            justifyContent: "center",
            display: "flex"
          }}
        >
          <PredictionGameCard gameStatus={"later"} />
        </SwiperSlide>
      </Swiper>
      <Flex
        pos="absolute"
        bottom="1rem"
        right="1rem"
        minW="8rem"
        h="3rem"
        bg="white"
        rounded="1em"
        shadow="md"
        px={2}
      >
        <HStack w="full" justify="start">
          <Image w="1.5rem" src="assets/cg.svg" />
          <VStack align="start" spacing={0}>
            <Text fontSize="14" lineHeight="1">
              Price Data by
            </Text>
            <Text lineHeight="1" fontWeight="600" fontSize="17">
              CoinGecko
            </Text>
          </VStack>
        </HStack>
      </Flex>
    </Flex>
  )
}

export default Win
