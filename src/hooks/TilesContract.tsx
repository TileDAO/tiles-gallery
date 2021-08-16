import { useEthers } from '@usedapp/core'
import { Contract, providers } from 'ethers'

import { networkConfig } from '..'
import { tilesAbi } from '../contracts/tiles.abi'
import { tilesAddress } from '../contracts/tiles.address'

export function useTilesContract() {
  const { account, library } = useEthers()

  const readNetworkUrl =
    networkConfig.readOnlyChainId &&
    networkConfig.readOnlyUrls &&
    networkConfig.readOnlyUrls[networkConfig.readOnlyChainId]

  return new Contract(
    tilesAddress,
    tilesAbi,
    account
      ? library?.getSigner()
      : new providers.JsonRpcProvider(readNetworkUrl),
  )
}
