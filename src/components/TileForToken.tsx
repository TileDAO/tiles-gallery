import { BigNumber } from '@ethersproject/bignumber'
import axios from 'axios'
import { useEffect, useLayoutEffect, useState } from 'react'

import { useTilesContract } from '../hooks/TilesContract'

export default function TileForToken({
  tokenId,
  onClickTile,
}: {
  tokenId: BigNumber
  onClickTile?: (address: string) => void
}) {
  const [URI, setURI] = useState<string>()
  const [data, setData] = useState<{ name: string; image_url: string }>()

  const contract = useTilesContract()

  const _tokenId = tokenId.toHexString()

  useEffect(() => {
    contract.functions.tokenURI(_tokenId).then(res => setURI(res[0]))
  }, [_tokenId])

  useLayoutEffect(() => {
    if (!URI) return
    axios.get(URI).then(res => setData(res.data))
  }, [URI])

  if (!data) return null

  return (
    <div style={{ textAlign: 'center' }}>
      <img
        style={{
          width: 240,
          height: 240,
          cursor: onClickTile ? 'cursor' : 'unset',
        }}
        src={data.image_url}
        onClick={onClickTile ? () => onClickTile(data.name) : () => null}
      />
      <div style={{ fontSize: 11 }}>0x{data.name}</div>
    </div>
  )
}
