import { CSSProperties } from 'react'
import { tileSvgUrl } from '../../utils/api'

export default function Tile({
  address,
  style,
  id,
}: {
  address: string | undefined
  style?: CSSProperties
  id?: string
}) {
  if (!address) return null
  return (
    <img
      id={id}
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
