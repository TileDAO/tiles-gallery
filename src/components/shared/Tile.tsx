import { CSSProperties } from 'react'
import { tileSvgUrl } from '../../utils/api'

export default function Tile({
  address,
  style,
}: {
  address: string | undefined
  style?: CSSProperties
}) {
  if (!address) return null
  return (
    <img
      style={{
        background: '#faf3e8',
        width: 300,
        height: 300,
        ...style,
      }}
      src={tileSvgUrl(address)}
    />
  )
}