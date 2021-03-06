import { BigNumber } from '@ethersproject/bignumber'
import axios from 'axios'
import { CSSProperties, useEffect, useLayoutEffect, useState } from 'react'

import { useTilesContract } from '../../hooks/TilesContract'

export default function TileForToken({
  tokenId,
  onClickTile,
  tileLink,
  style,
  renderDetails,
}: {
  tokenId: BigNumber | undefined
  onClickTile?: (address: string) => void
  tileLink?: string | ((address: string) => string)
  style?: CSSProperties
  renderDetails?: (address: string, id: BigNumber) => string | JSX.Element
}) {
  const [URI, setURI] = useState<string>()
  const [data, setData] = useState<{ name: string; image: string }>()

  const contract = useTilesContract()

  useEffect(() => {
    if (!tokenId || tokenId.eq(0)) return
    contract.functions
      .tokenURI(tokenId.toHexString())
      .then(res => setURI(res[0]))
      .catch(e => console.log('Error getting tokenURI', e))
  }, [tokenId])

  useLayoutEffect(() => {
    if (!URI) return
    axios.get(URI).then(res => setData(res.data))
  }, [URI])

  if (!data) return null

  const elem = (
    <div style={{ textAlign: 'center' }}>
      <img
        style={{
          width: 100,
          height: 100,
          cursor: onClickTile ? 'cursor' : 'unset',
          ...style,
        }}
        src={data.image}
        onClick={() => onClickTile?.(data.name)}
      />
      {tokenId ? renderDetails?.(data.name, tokenId) : null}
    </div>
  )

  return tileLink ? (
    <a
      href={typeof tileLink === 'string' ? tileLink : tileLink?.(data.name)}
      style={{ textDecoration: 'none' }}
    >
      {elem}
    </a>
  ) : (
    elem
  )
}
