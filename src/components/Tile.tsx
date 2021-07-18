import { CSSProperties } from 'react'

import { tilesUrl } from '../utils/api'

export default function Tile({
  address,
  style,
}: {
  address: string
  style?: CSSProperties
}) {
  return (
    <img
      style={{
        background: '#faf3e8',
        ...style,
      }}
      src={tilesUrl(address)}
    />
  )
}
