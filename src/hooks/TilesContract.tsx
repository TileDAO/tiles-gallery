import { useEthers } from '@usedapp/core';
import { Contract, providers } from 'ethers';

import { tilesAbi } from '../contract/abi';
import { tilesAddress } from '../contract/address';

export function useTilesContract() {
  const { library } = useEthers()

  return new Contract(
    tilesAddress,
    tilesAbi,
    (library?.getSigner() ??
      new providers.JsonRpcProvider('http://localhost:8545')) as any,
  )
}
