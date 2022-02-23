import { useEthers } from '@usedapp/core'
import { Contract, providers } from 'ethers'

import { networkConfig } from '..'
import { ticketBoothAbi } from '../contracts/ticketBooth.abi'
import { ticketBoothAddress } from '../contracts/ticketBooth.address'

export function useTicketBoothContract() {
  const { library } = useEthers()

  const readNetworkUrl =
    networkConfig.readOnlyChainId &&
    networkConfig.readOnlyUrls &&
    networkConfig.readOnlyUrls[networkConfig.readOnlyChainId]

  return new Contract(
    ticketBoothAddress,
    ticketBoothAbi,
    (library?.getSigner() ??
      new providers.JsonRpcProvider(readNetworkUrl)) as any,
  )
}
