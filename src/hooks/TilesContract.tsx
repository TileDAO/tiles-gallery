import { useEthers } from '@usedapp/core'
import { Contract, providers } from 'ethers'
import { networkConfig } from '..'

import { tilesAbi } from '../contract/abi'
import { tilesAddress } from '../contract/address'

export function useTilesContract() {
  const { library } = useEthers()

  const readNetworkUrl =
    networkConfig.readOnlyChainId &&
    networkConfig.readOnlyUrls &&
    networkConfig.readOnlyUrls[networkConfig.readOnlyChainId]

  return new Contract(
    tilesAddress,
    tilesAbi,
    (library?.getSigner() ??
      new providers.JsonRpcProvider(readNetworkUrl)) as any,
  )
}
