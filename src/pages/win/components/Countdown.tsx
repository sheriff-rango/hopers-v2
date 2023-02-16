import { HStack, Icon, Text } from "@chakra-ui/react"
import { useCountDown } from "ahooks"
import { type FC, useMemo, useRef } from "react"

export type CountdownTimerProps = {
  nextUnbonding: number
}

function toDateTime(secs: number) {
  const t = new Date(Date.UTC(1_970, 0, 1))
  t.setUTCSeconds(secs)
  return t
}

export const CountdownTimer: FC<CountdownTimerProps> = ({ nextUnbonding }) => {
  const timerRef = useRef<Date>()

  const timerMemo = useMemo(() => {
    timerRef.current = toDateTime(nextUnbonding)
    return timerRef.current
  }, [nextUnbonding])

  const [, formattedResponse] = useCountDown({
    targetDate: timerMemo
  })

  const { days, hours, minutes, seconds } = formattedResponse

  return (
    <Text fontSize={{ base: 12, md: 16 }}>
      {days.toLocaleString(undefined, {
        minimumSignificantDigits: 2
      })}{" "}
      days, {hours.toLocaleString(undefined, { minimumIntegerDigits: 2 })}:
      {minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}:
      {seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}
    </Text>
  )
}
