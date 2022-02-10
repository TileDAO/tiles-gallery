import { useEthers } from '@usedapp/core'
import axios from 'axios'
import { BigNumber } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useTilesContract } from '../hooks/TilesContract'
import { tilePngUrl } from '../utils/api'
import Tile from './shared/Tile'

const baseTileId = 'base-tile'
const apiUrl = process.env.REACT_APP_DREAMLAND_API_URL

type DreamMetadata = {
  tile: string
  image: string
  description: string
  journal: string[]
}

export default function Dreamland() {
  const [confirmRestart, setConfirmRestart] = useState<boolean>(false)
  const [isMintedForTile, setIsMintedForTile] = useState<boolean>()
  const [ownsTile, setOwnsTile] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>(false)
  const [showOriginal, setShowOriginal] = useState<boolean>(false)
  const [text, setText] = useState<string>()
  const [image, setImage] = useState<string>()
  const [metadata, setMetadata] = useState<DreamMetadata>()

  const { tile } = useParams<{ tile: string }>()
  const { account } = useEthers()

  // const dreamlandContract = useDreamlandContract()
  const tilesContract = useTilesContract()

  // Check if connected wallet owns this Tile
  useEffect(() => {
    tilesContract.functions.idOfAddress(tile).then((id: [BigNumber]) => {
      if (id[0].isZero()) {
        setOwnsTile(false)
        return
      }

      tilesContract.ownerOf(id[0]).then((owner: string) => {
        setOwnsTile(owner === account)
      })
    })
  }, [tilesContract, tile, account])

  // Get existing database data
  useEffect(() => {
    // Check if Dreamland token exists for Tile address
    // dreamlandContract.functions
    //   .idOfAddress(tile)
    //   .then((res: number[]) => setIsMintedForTile(res[0] > 0))
    //   .catch((e: any) => console.log('Error getting owner', e))
    setIsMintedForTile(false)

    const loadDreamImage = async () => {
      const { data: newImage } = await axios.get<string>(
        apiUrl + '/img/' + tile,
      )
      const { data: metadata } = await axios.get<DreamMetadata>(
        apiUrl + '/metadata/' + tile,
      )

      if (newImage) setImage(newImage)
      if (metadata.journal) setMetadata(metadata)
    }

    loadDreamImage()
  }, [tile])

  const dreamIt = useCallback(async () => {
    if (!text || !tile || !apiUrl || !ownsTile) return

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
    const imgData = (image ?? ((await getDataUrl(tile)) as string)).split(
      'data:image/png;base64,',
    )[1]

    // Dream new dream
    await axios.post(
      apiUrl + '/dream',
      {
        tile,
        text,
        imgData,
      },
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    // Update metadata & image
    const { data: metadata } = await axios.get<DreamMetadata>(
      apiUrl + '/metadata/' + tile,
    )
    setMetadata(metadata)
    setImage((await axios.get<string>(metadata.image)).data)
    setLoading(false)
  }, [text, tile, ownsTile])

  const restart = useCallback(async () => {
    if (!ownsTile) return

    axios
      .post(
        apiUrl + '/restart',
        {
          tile,
        },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => {
        setImage(undefined)
        setConfirmRestart(false)
      })
  }, [ownsTile, tile])

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
          <div style={{ textAlign: 'center' }}>
            {image && !showOriginal ? (
              <img
                style={{ width: 400, height: 400 }}
                src={image}
                id="output"
              />
            ) : (
              <Tile
                style={{ width: 400, height: 400 }}
                address={tile}
                id={baseTileId}
              />
            )}
            {image && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    padding: 5,
                    ...(showOriginal
                      ? { opacity: 0.5 }
                      : { fontWeight: 'bold' }),
                  }}
                  onClick={() => setShowOriginal(false)}
                >
                  Dream
                </div>
                <div
                  style={{
                    padding: 5,
                    ...(showOriginal
                      ? { fontWeight: 'bold' }
                      : { opacity: 0.5 }),
                  }}
                  onClick={() => setShowOriginal(true)}
                >
                  Tile
                </div>
              </div>
            )}
          </div>

          {isMintedForTile === false && ownsTile && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {metadata &&
                metadata.journal.map(j => (
                  <div style={{ marginBottom: 5 }} key={j}>
                    {j}
                  </div>
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
                value={text}
                disabled={loading}
                placeholder="What is your dream?"
                type="text"
                id="dream-input"
                onChange={e => {
                  setText(e.target.value)
                }}
                onKeyDown={e => {
                  console.log('e', e)
                  if (e.code === 'Enter') {
                    dreamIt()
                  }
                }}
              />
              <div
                className="btn"
                style={{
                  marginTop: 20,
                  fontWeight: 'bold',
                  ...(loading || !text
                    ? {
                        opacity: 0.5,
                        pointerEvents: 'none',
                      }
                    : {}),
                }}
                onClick={() => dreamIt()}
              >
                {loading ? 'Dreaming...' : image ? 'Dream again' : 'Dream'}
              </div>
              {image &&
                !loading &&
                (confirmRestart ? (
                  <div
                    className="btn"
                    style={{
                      marginTop: 20,
                      fontWeight: 'bold',
                    }}
                    onClick={() => restart()}
                  >
                    Yes, erase my dream
                  </div>
                ) : (
                  <div
                    className="btn"
                    style={{
                      marginTop: 20,
                      fontWeight: 'bold',
                    }}
                    onClick={() => setConfirmRestart(true)}
                  >
                    Restart
                  </div>
                ))}
            </div>
          )}

          {!ownsTile && <div>You can only Dream of Tiles you own.</div>}
        </div>
      </div>
    </div>
  )
}
