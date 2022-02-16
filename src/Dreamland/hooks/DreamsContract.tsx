import { useEthers } from '@usedapp/core'
import { Contract, providers } from 'ethers'

import { networkConfig } from '../..'
import { dreamsAbi } from '../../contracts/dreams.abi'
import { dreamsAddress } from '../../contracts/dreams.address'

export function useDreamsContract() {
  const { account, library } = useEthers()

  const readNetworkUrl =
    networkConfig.readOnlyChainId &&
    networkConfig.readOnlyUrls &&
    networkConfig.readOnlyUrls[networkConfig.readOnlyChainId]

  return new Contract(
    dreamsAddress,
    dreamsAbi,
    account
      ? library?.getSigner()
      : new providers.JsonRpcProvider(readNetworkUrl),
  )
}
