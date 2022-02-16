import { useEthers } from '@usedapp/core'
import { Contract, providers } from 'ethers'

import { networkConfig } from '..'
import { erc20Abi } from '../contracts/erc20.abi'

export function useErc20Contract(address: string | undefined) {
  const { library } = useEthers()

  const readNetworkUrl =
    networkConfig.readOnlyChainId &&
    networkConfig.readOnlyUrls &&
    networkConfig.readOnlyUrls[networkConfig.readOnlyChainId]

  if (!address) return

  return new Contract(
    address,
    erc20Abi,
    (library?.getSigner() ??
      new providers.JsonRpcProvider(readNetworkUrl)) as any,
  )
}
