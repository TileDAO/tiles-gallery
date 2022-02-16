import axios from 'axios'
import { CSSProperties, useEffect, useState } from 'react'

import Tile from '../../components/shared/Tile'
import Dream from './Dream'

const apiUrl = process.env.REACT_APP_DREAMLAND_API_URL

export default function DreamTile({
  tile,
  style,
}: {
  tile: string | undefined
  style?: CSSProperties
}) {
  const [isDreamt, setIsDreamt] = useState<boolean>()
  const [showOriginal, setShowOriginal] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get<string>(apiUrl + '/' + tile?.toLowerCase())
      .then(res => setIsDreamt(true))
      .catch(() => setIsDreamt(false))
  }, [tile])

  if (isDreamt === undefined) return null

  return (
    <div style={{ textAlign: 'center' }}>
      {showOriginal || !isDreamt ? (
        <Tile style={style ?? { width: 400, height: 400 }} address={tile} />
      ) : (
        <Dream style={style ?? { width: 400, height: 400 }} tile={tile} />
      )}

      {isDreamt && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              padding: 5,
              ...(showOriginal ? { opacity: 0.5 } : { fontWeight: 'bold' }),
            }}
            onClick={() => setShowOriginal(false)}
          >
            Dream
          </div>
          <div
            style={{
              padding: 5,
              ...(showOriginal ? { fontWeight: 'bold' } : { opacity: 0.5 }),
            }}
            onClick={() => setShowOriginal(true)}
          >
            Tile
          </div>
        </div>
      )}
    </div>
  )
}
