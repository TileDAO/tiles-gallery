import axios from 'axios'
import Wallet from 'ethereumjs-wallet'
import { useCallback, useEffect, useState } from 'react'

import { tilePngUrl } from '../utils/api'
import Tile from './shared/Tile'

const baseTileId = 'base-tile'
const apiUrl = process.env.REACT_APP_DREAMLAND_API_URL

export default function Dreamland() {
  const [loading, setLoading] = useState<boolean>()
  const [history, setHistory] = useState<string[]>([])
  const [tile, setTile] = useState<string>()
  const [dream, setDream] = useState<string>()
  const [output, setOutput] = useState<string>()

  useEffect(() => {
    const randomAddress = Wallet.generate().getAddress().toString('hex')
    setTile(randomAddress)
    setHistory(['0x' + randomAddress])
  }, [])

  const dreamIt = useCallback(async () => {
    if (!dream || !tile || !apiUrl) return

    setLoading(true)

    async function getDataUrl(_tile: string) {
      const blob = await fetch(tilePngUrl(_tile)).then(r => r.blob())

      return new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.readAsDataURL(blob)
      })
    }

    // Use previous output if it exists
    const imgData = (output ?? ((await getDataUrl(tile)) as string)).split(
      'data:image/png;base64,',
    )[1]

    const result = await axios.post(
      apiUrl,
      {
        text: dream,
        imgData,
      },
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    setHistory([...history, dream])
    setOutput(result.data)

    setLoading(false)
  }, [dream, tile, history])

  return (
    <div>
      <div
        style={{
          marginTop: 100,
          marginBottom: 60,
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '90vw',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          {output ? (
            <img style={{ width: 400, height: 400 }} src={output} id="output" />
          ) : (
            <Tile
              style={{ width: 400, height: 400 }}
              address={tile}
              id={baseTileId}
            />
          )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {history.map(h => (
              <div>{h}</div>
            ))}
            <input
              style={{
                marginTop: 20,
                textAlign: 'center',
                display: 'block',
                border: '1px solid #ddd',
                borderRadius: 4,
                padding: 5,
                boxSizing: 'border-box',
                width: 400,
              }}
              placeholder="What is your dream?"
              type="text"
              name="dream"
              id="dream"
              onChange={e => {
                setDream(e.target.value)
              }}
            />
            <div
              className="btn"
              style={{
                marginTop: 20,
                fontWeight: 'bold',
                ...(loading || !dream
                  ? {
                      opacity: 0.5,
                      pointerEvents: 'none',
                    }
                  : {}),
              }}
              onClick={() => dreamIt()}
            >
              {loading ? 'Loading...' : output ? 'Dream again' : 'Dream'}
            </div>
            {output && (
              <div
                className="btn"
                onClick={() => {
                  setOutput(undefined)
                  setHistory([])
                }}
                style={{ marginTop: 20 }}
              >
                Wake up
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
