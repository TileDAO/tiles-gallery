import { CSSProperties } from 'react'

import { svgUrl } from '../utils/api'

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
        width: 440,
        height: 440,
        maxWidth: '96vw',
        maxHeight: '96vw',
        ...style,
      }}
      src={svgUrl(address)}
    />
  )
}
