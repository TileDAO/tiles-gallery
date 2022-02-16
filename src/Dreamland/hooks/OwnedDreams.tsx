import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'

import { useDreamsContract } from './DreamsContract'

export function useOwnedDreams(wallet: string) {
  const [ownedTokens, setOwnedTokens] = useState<BigNumber[]>()

  const contract = useDreamsContract()

  useEffect(() => {
    if (wallet) {
      contract.functions
        .tokensOfOwner(wallet)
        .then(res => setOwnedTokens(res[0]))
        .catch(e => console.log('Error getting tokensOfOwner', e))
    } else if (ownedTokens) {
      setOwnedTokens([])
    }
  }, [wallet])

  return ownedTokens
}
