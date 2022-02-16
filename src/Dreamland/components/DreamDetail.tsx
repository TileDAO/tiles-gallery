import { BigNumber } from 'ethers'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useDreamMetadata from '../hooks/DreamMetadata'
import { useDreamsContract } from '../hooks/DreamsContract'
import DreamTile from './DreamTile'

export default function DreamDetail() {
  const { tile: tileFromParams, id: idFromParams } =
    useParams<{ tile: string; id: string }>()
  const [tileAddress, setTileAddress] = useState<string>()
  const [tokenId, setTokenId] = useState<BigNumber>()

  const contract = useDreamsContract()

  useEffect(() => {
    if (tileFromParams) setTileAddress(tileFromParams)
    if (idFromParams) setTokenId(BigNumber.from(idFromParams))
  }, [])

  useEffect(() => {
    if (tokenId || !tileAddress) return

    contract.functions.idOfAddress(tileAddress).then(
      res => setTokenId(res[0] as BigNumber),
      err => console.log('Error getting idOfAddress', err),
    )
  }, [tileAddress, tokenId])

  useLayoutEffect(() => {
    if (tileAddress || !tokenId) return

    contract.functions.tileAddressOf(tokenId.toHexString()).then(
      res => setTileAddress(res[0]),
      err => console.log('Error getting tileAddressOf', err),
    )
  }, [tokenId, tileAddress])

  const dreamMetadata = useDreamMetadata(tileAddress)

  if (!tileAddress && !tokenId) return null

  return (
    <div>
      {tileAddress && (
        <div>
          <DreamTile tile={tileAddress} style={{ width: 400, height: 400 }} />
          <div style={{ marginBottom: 20, marginTop: 10, textAlign: 'center' }}>
            {tileAddress?.startsWith('0x') ? '' : '0x'}
            {tileAddress}
          </div>
        </div>
      )}

      {dreamMetadata && (
        <div style={{ maxWidth: 400, margin: '40px auto' }}>
          <h3>Dream journal:</h3>
          {dreamMetadata.journal.map(j => (
            <div style={{ marginBottom: 5 }} key={j}>
              - {j}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
