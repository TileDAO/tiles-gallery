import { useEthers } from '@usedapp/core'
import axios from 'axios'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useParams } from 'react-router-dom'

import Tile from '../../components/shared/Tile'
import { DreamlandContext } from '../../contexts/DreamlandContext'
import { useTilesContract } from '../../hooks/TilesContract'
import { isMobile } from '../../utils/isMobile'
import { useDreamsContract } from '../hooks/DreamsContract'
import { DreamMetadata } from '../models/dreamMetadata'
import DreamTile from './DreamTile'

const MAX_WORDS = 100
const MAX_CHARS = 300
const MAX_PHRASES = 10

const apiUrl = process.env.REACT_APP_DREAMLAND_API_URL

export default function MintDream() {
  const [confirmLock, setConfirmLock] = useState<boolean>(false)
  const [confirmRestart, setConfirmRestart] = useState<boolean>(false)
  const [loadingAction, setLoadingAction] = useState<boolean>(false)
  const [loadingDream, setLoadingDream] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const [dreamImage, setDreamImage] = useState<string | null>()
  const [dreamMetadata, setDreamMetadata] = useState<DreamMetadata | null>()
  const [tileIsOwned, setTileIsOwned] = useState<boolean>()
  const [isMinted, setIsMinted] = useState<boolean>()

  const { tile } = useParams<{ tile: string }>()
  const tilesContract = useTilesContract()
  const dreamsContract = useDreamsContract()
  const { price } = useContext(DreamlandContext)
  const { account } = useEthers()

  const size = isMobile ? 320 : 400

  useEffect(() => {
    dreamsContract.functions
      .idOfAddress(tile)
      .then(res => setIsMinted(res[0] > 0))
      .catch(() => setIsMinted(false))
  }, [tile])

  // Check if connected wallet owns this Tile
  useEffect(() => {
    if (!tile || !account) return

    tilesContract.functions.idOfAddress(tile).then((id: [BigNumber]) => {
      if (id[0].isZero()) {
        setTileIsOwned(false)
        return
      }

      tilesContract.ownerOf(id[0]).then((owner: string) => {
        setTileIsOwned(owner === account)
      })
    })
  }, [tilesContract, tile, account])

  // Get existing database data
  useEffect(() => {
    const loadDreamImage = async () => {
      setLoadingAction(true)

      const image = await axios
        .get<string>(apiUrl + '/img/' + tile)
        .catch(e => console.log('No Dream image for Tile', tile))
      const metadata = await axios
        .get<DreamMetadata>(apiUrl + '/' + tile)
        .catch(e => console.log('No Dream metadata for Tile', tile))

      setDreamImage(image?.data ?? null)
      setDreamMetadata(metadata?.data ?? null)

      setLoadingAction(false)
    }

    loadDreamImage()
  }, [tile])

  const lock = useCallback(async () => {
    try {
      await axios.post(
        apiUrl + '/lock',
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
    } catch (e) {
      console.log('Error on lock', e)
    }

    window.location.reload()
  }, [tile])

  const restart = useCallback(async () => {
    setLoadingAction(true)

    try {
      await axios.delete(apiUrl + '/dream/' + tile)
    } catch (e) {
      console.log('Error resetting Dream', e)
    }

    setDreamMetadata(null)
    setDreamImage(null)
    setConfirmRestart(false)
    setLoadingAction(false)
    setText('')
    window.location.reload()
  }, [tile])

  const error = useMemo(() => {
    if (text.split(' ').length > MAX_WORDS) {
      return `Phrase cannot be longer than ${MAX_WORDS} words`
    } else if (text.length > MAX_CHARS) {
      return `Phrase cannot be longer than ${MAX_CHARS} characters`
    }
  }, [text])

  const dream = useCallback(async () => {
    if (!text || !tile || !apiUrl || error) return

    setLoadingDream(true)

    try {
      // Dream new dream
      await axios.post(
        apiUrl + '/dream',
        {
          tile,
          text,
        },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    } catch (e) {
      console.log('Error on dream', e)
    }

    window.location.reload()
  }, [text, tile])

  const mint = useCallback(() => {
    if (!price) return

    dreamsContract.functions
      .mint(tile, {
        value: price?.toHexString(),
      })
      .then(() => {
        console.log('Minted Dream')
        window.location.hash = '/dreamland/' + tile
      })
      .catch(e => console.log('Error minting Dream'))
  }, [tile, price])

  const isLoading = loadingAction || loadingDream
  const hasDreamData = dreamImage && dreamMetadata

  const errorElem = useMemo(() => {
    if (!error) return null

    return (
      <div
        style={{
          fontWeight: 'bold',
          color: '#FE4465',
        }}
      >
        {error}
      </div>
    )
  }, [error])

  const loadingElem = useMemo(() => {
    let text: string | null = null

    if (loadingDream) {
      text = 'Dreaming... this may take a minute'
    } else if (loadingAction) {
      text = 'Loading'
    } else {
      return null
    }

    return (
      <div
        style={{
          fontWeight: 'bold',
          fontStyle: 'italic',
          opacity: 0.5,
        }}
      >
        {text}
      </div>
    )
  }, [loadingDream, loadingAction])

  const restartElem = useMemo(() => {
    if (!hasDreamData) return null

    return confirmRestart ? (
      <div
        className="btn"
        style={{ fontWeight: 'bold' }}
        onClick={() => restart()}
      >
        Yes, erase my dream
      </div>
    ) : (
      <div className="bland btn" onClick={() => setConfirmRestart(true)}>
        Wake up
      </div>
    )
  }, [confirmRestart, hasDreamData])

  const dreamElem = useMemo(() => {
    const style: CSSProperties = {
      fontWeight: 'bold',
      fontSize: '1rem',
    }

    if (dreamMetadata && dreamMetadata.journal.length >= 10) {
      return (
        <div className="btn disabled" style={style}>
          Only {MAX_PHRASES} phrases allowed
        </div>
      )
    }

    return (
      <div
        className={error ? 'btn disabled' : 'btn'}
        style={style}
        onClick={() => dream()}
      >
        {dreamImage ? 'Dream again' : 'Dream'}
      </div>
    )
  }, [error, dreamImage, dream, dreamMetadata?.journal])

  const mintElem = useMemo(() => {
    if (!hasDreamData || !dreamMetadata) return null

    if (isMinted) return <div>Already minted</div>

    return (
      <div>
        <h3>Mint Dream ({price ? formatEther(price).toString() : '--'} ETH)</h3>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 10,
            marginTop: 10,
          }}
        >
          <span>1.</span>

          {confirmLock ? (
            <div>
              Are you sure?
              <div
                className="btn"
                style={{ fontWeight: 'bold' }}
                onClick={() => lock()}
              >
                Yes, lock this Dream journal forever
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
              <div
                className={dreamMetadata.unlocked ? 'btn' : 'btn disabled'}
                style={{ display: 'inline-block', fontWeight: 'bold' }}
                onClick={() => setConfirmLock(true)}
              >
                Lock journal
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  opacity: dreamMetadata.unlocked ? 1 : 0.5,
                }}
              >
                (
                {dreamMetadata.unlocked
                  ? 'No more changes will be allowed'
                  : 'completed'}
                )
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 10,
            marginTop: 10,
          }}
        >
          <span>2.</span>

          <div
            className={dreamMetadata?.unlocked ? 'btn disabled' : 'btn'}
            style={{ fontWeight: 'bold' }}
            onClick={() => mint()}
          >
            Mint
          </div>
        </div>
      </div>
    )
  }, [
    hasDreamData,
    isLoading,
    confirmLock,
    dreamMetadata,
    price,
    isMinted,
    lock,
    mint,
  ])

  if (!tileIsOwned) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Tile address={tile} />

        {tileIsOwned === false && <div>You don't own this Tile</div>}
      </div>
    )
  }

  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '90vw',
      }}
    >
      <div
        style={
          isMobile
            ? {
                display: 'flex',
                flexDirection: 'column',
              }
            : {
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }
        }
      >
        <DreamTile tile={tile} style={{ width: size, height: size }} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            maxWidth: isMobile ? '100%' : size,
          }}
        >
          {dreamMetadata?.journal.length && (
            <div>
              <h3>Dream journal:</h3>
              {dreamMetadata.journal.map(j => (
                <div style={{ marginBottom: 5 }} key={j}>
                  - {j}
                </div>
              ))}
            </div>
          )}

          {dreamMetadata !== undefined &&
            (dreamMetadata?.unlocked || !dreamMetadata) && (
              <textarea
                style={{
                  marginTop: 20,
                  textAlign: 'center',
                  display: 'block',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  padding: 5,
                  boxSizing: 'border-box',
                  width: isMobile ? '100%' : size,
                }}
                value={text}
                disabled={loadingAction || loadingDream}
                placeholder="What is your dream?"
                rows={1}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => {
                  if (e.code === 'Enter') dream()
                }}
              />
            )}

          {errorElem && <div style={{ marginTop: 15 }}>{errorElem}</div>}

          {loadingElem && <div style={{ marginTop: 15 }}>{loadingElem}</div>}

          {!isLoading && (
            <>
              {(!dreamMetadata || dreamMetadata?.unlocked) && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    width: '100%',
                    marginTop: 15,
                  }}
                >
                  {dreamElem}

                  {restartElem}
                </div>
              )}

              <p style={{ opacity: 0.5 }}>
                Click "Dream" to evolve the image based on the phrase you've
                entered. Each phrase will be added to your dream journal, which
                is stored in the Dream NFT metadata. "Wake up" to clear your
                dream journal and start over with your Tile image. Once your
                dream journal has been locked, no more changes can be made.
              </p>

              {mintElem && <div style={{ marginTop: 30 }}>{mintElem}</div>}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
