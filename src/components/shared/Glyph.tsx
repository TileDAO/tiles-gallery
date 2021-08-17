import { CSSProperties } from 'react'

import { glyphSvgUrl } from '../../utils/api'

export default function Glyph({
  address,
  size,
  style,
  color,
}: {
  address: string
  size?: CSSProperties['width']
  style?: CSSProperties
  color?: boolean
}) {
  return (
    <img
      style={{
        background: '#faf3e8',
        width: size ?? 300,
        height: size ?? 300,
        ...style,
      }}
      src={glyphSvgUrl(address, color)}
    />
  )
}
