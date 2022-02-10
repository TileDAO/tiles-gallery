import { useEthers } from '@usedapp/core'
import { Contract, providers } from 'ethers'

import { networkConfig } from '..'

export function useDreamlandContract() {
  const { account, library } = useEthers()

  const readNetworkUrl =
    networkConfig.readOnlyChainId &&
    networkConfig.readOnlyUrls &&
    networkConfig.readOnlyUrls[networkConfig.readOnlyChainId]

  return undefined
  // return new Contract(
  //   '',
  //   '',
  //   account
  //     ? library?.getSigner()
  //     : new providers.JsonRpcProvider(readNetworkUrl),
  // )
}
