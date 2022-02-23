import { useEffect, useState } from 'react'
import { useDreamsContract } from './DreamsContract'

export function useDreamIsMintedForTile(tile: string | undefined) {
  const [isMinted, setIsMinted] = useState<boolean>()

  const dreamlandContract = useDreamsContract()

  useEffect(() => {
    if (!tile) return

    // Check if Dreamland token exists for Tile address
    dreamlandContract.functions
      .idOfAddress(tile)
      .then((res: number[]) => setIsMinted(res[0] > 0))
      .catch((e: any) => console.log('Error checking if Dream is minted', e))
  }, [tile, dreamlandContract.functions])

  return isMinted
}
