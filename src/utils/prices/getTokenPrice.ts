import { useChain } from "@cosmos-kit/react"

export const getTokenPriceFromPool = async ({
  contractAddress
}: {
  contractAddress: string
}) => {
  const { getCosmWasmClient } = useChain("juno")

  const client = await getCosmWasmClient()

  const info = await client.queryContractSmart(contractAddress, {
    pool: {}
  })

  const currentContractPrice =
    Number(info.assets[1].amount) / Number(info.assets[0].amount)

  return currentContractPrice
}

export const getTokenPriceCoinGecko = async ({
  tokenId,
  precision
}: {
  tokenId: string
  precision: number
}) => {
  const coinGeckoData = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd&precision=${precision}`
  ).then((price) => console.log(price))

  //   return coinGeckoData.data["juno-network"]["usd"]
}
