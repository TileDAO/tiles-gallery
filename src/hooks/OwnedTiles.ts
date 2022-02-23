import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { useTilesContract } from './TilesContract'

export function useOwnedTiles(wallet: string | null | undefined) {
  const [ownedTokens, setOwnedTokens] = useState<BigNumber[]>()

  const contract = useTilesContract()

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
