import { useEthers } from '@usedapp/core'
import Wallet from 'ethereumjs-wallet'
import { BigNumber, constants, utils } from 'ethers'
import { useLayoutEffect, useState } from 'react'

import { tilesAddress } from '../contracts/tiles.address'
import { useErc20Contract } from '../hooks/Erc20Contract'
import Glyph from './shared/Glyph'

export default function Glyphs({ gated }: { gated?: boolean }) {
  const [gallery, setGallery] = useState<string[]>()
  const [useColor, setUseColor] = useState<boolean>(true)
  const [previewGlyph, setPreviewGlyph] = useState<string>()
  const [balance, setBalance] = useState<BigNumber>()

  const { account } = useEthers()

  const contract = useErc20Contract(tilesAddress)

  useLayoutEffect(() => {
    if (!account || !contract || !gated) return

    // Get tokenIDs of Tiles owned by `account`
    contract.functions
      .balanceOf(account)
      .then(res => setBalance(res[0]))
      .catch(e => console.log('Error getting tokensOfOwner', e))
  }, [account])

  const isMobile = document.documentElement.clientWidth < 600

  const load = (count: number) => {
    const newGallery = [...(gallery ?? [])]

    for (let i = 0; i < count; i++) {
      newGallery.push('0x' + randomAddress())
    }

    setGallery(newGallery)
  }

  const newPreviewGlyph = () =>
    setPreviewGlyph(Wallet.generate().getAddress().toString('hex'))

  useLayoutEffect(() => {
    if (!gallery?.length) {
      load(8)
    }
    newPreviewGlyph()
  }, [])

  const randomAddress = () => Wallet.generate().getAddress().toString('hex')

  const threeColContainerWidth = Math.min(
    document.documentElement.clientWidth - 40,
    760,
  )
  const threeColWidth = threeColContainerWidth / 3 - 10

  const redGlyphAddress = '0x271ebbd0a1ea752a6976ff938cb0262eceac0300'
  const blueGlyphAddress = '0x5eedf6747d5d2eee581d7b6731c3809401ec8cd7'
  const yellowGlyphAddress = '0x476a627c89d9d9e98a4d7763406c55670eccd0cf'

  if (!balance?.gt(0) && gated)
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh',
          userSelect: 'none',
        }}
      >
        ?
      </div>
    )

  return (
    <div
      style={
        isMobile
          ? {
              paddingTop: 80,
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 80,
            }
          : { paddingTop: 40, paddingBottom: 40 }
      }
    >
      <div
        style={
          isMobile
            ? {}
            : { display: 'flex', margin: '40px auto 20vh', maxWidth: 1000 }
        }
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'column',
            marginBottom: isMobile ? 40 : 0,
          }}
        >
          <h3>Glyphs</h3>
          <p>Encoded from ETH wallet addresses.</p>
          <p>Designed to be decoded.</p>
        </div>
        <div>
          <Glyph
            address="9203659b66766c84f86ed9ebb075ebc5eae055a9"
            color
            size={isMobile ? '92vw' : '80vh'}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 40,
        }}
      >
        <div
          style={{
            display: 'inline-grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            rowGap: 40,
            columnGap: 40,
          }}
        >
          {gallery?.map(g => (
            <Glyph
              key={g}
              address={g}
              color
              size={isMobile ? '40vw' : '20vw'}
            />
          ))}
        </div>
        <div style={{ margin: '140px 0px', maxWidth: 480 }}>
          <h3>Glyphs are geometric puzzles</h3>
          <p>
            Fragmented shapes combine to create a visual map of any possible ETH
            address. Bold lines and strong contrast make Glyphs easily
            distinguishable, even at small sizes. No two are identical.
          </p>
        </div>
      </div>

      <div
        style={{
          margin: '0 auto',
          width: threeColContainerWidth,
        }}
      >
        <div>
          <div>
            <h3>Each Glyph has its own colors</h3>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Glyph address={redGlyphAddress} color size={threeColWidth} />
            <Glyph address={blueGlyphAddress} color size={threeColWidth} />
            <Glyph address={yellowGlyphAddress} color size={threeColWidth} />
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Glyph address={redGlyphAddress} size={threeColWidth} />
            <Glyph address={blueGlyphAddress} size={threeColWidth} />
            <Glyph address={yellowGlyphAddress} size={threeColWidth} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <h3>...but is unique even without them.</h3>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          margin: '20vh auto 5vh',
          maxWidth: isMobile ? undefined : 1000,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          {previewGlyph && utils.isAddress(previewGlyph.toLowerCase()) ? (
            <Glyph
              address={previewGlyph}
              size={
                isMobile ? document.documentElement.clientWidth - 40 : '70vh'
              }
              color={useColor}
            />
          ) : (
            <div
              style={{
                width: isMobile ? '94vw' : '70vh',
                height: isMobile ? '94vw' : '70vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Not a valid address
            </div>
          )}
        </div>
        <div
          style={{
            display: isMobile ? 'block' : 'flex',
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>
            <h3>How will you use yours?</h3>

            <input
              style={{
                textAlign: 'center',
                display: 'block',
                border: '1px solid #ddd',
                borderRadius: 4,
                padding: 5,
                width: 360,
                boxSizing: 'border-box',
                marginTop: isMobile ? 40 : '10vh',
              }}
              disabled
              placeholder={constants.AddressZero}
              value={previewGlyph}
              onChange={e =>
                setPreviewGlyph(e.target.value.trim().toLowerCase())
              }
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              <div
                style={{ cursor: 'pointer', marginBottom: 20, marginRight: 10 }}
                onClick={() => newPreviewGlyph()}
              >
                Random
              </div>
              <div>
                <span
                  style={{ opacity: useColor ? 1 : 0.5, marginLeft: 10 }}
                  onClick={() => setUseColor(true)}
                >
                  Color
                </span>
                <span style={{ marginLeft: 10, marginRight: 10 }}>|</span>
                <span
                  style={{ opacity: useColor ? 0.5 : 1 }}
                  onClick={() => setUseColor(false)}
                >
                  No color
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div style={{ height: '33.33vw', overflow: 'hidden' }}>
        <Glyph
          address="0x1866963bf5a31839bc8c3fd8dd741b03dbec4013"
          size={'100vw'}
          color
        />
        
      </div> */}
    </div>
  )
}
