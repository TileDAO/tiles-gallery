import { CSSProperties } from 'react'
import { dreamPngUrl } from '../../utils/api'

export default function Dream({
  tile,
  style,
  id,
}: {
  tile: string | undefined
  style?: CSSProperties
  id?: string
}) {
  if (!tile) return null
  return (
    <img
      id={id}
      style={{
        background: '#faf3e8',
        width: 300,
        height: 300,
        ...style,
      }}
      src={dreamPngUrl(tile)}
    />
  )
}
