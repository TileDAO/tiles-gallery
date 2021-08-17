import { useLayoutEffect, useState } from 'react'
import Wallet from 'ethereumjs-wallet'
import Glyph from './shared/Glyph'
import { constants, utils } from 'ethers'

export default function Glyphs() {
  const [gallery, setGallery] = useState<string[]>()
  const [useColor, setUseColor] = useState<boolean>(true)
  const [previewGlyph, setPreviewGlyph] = useState<string>()

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

  return (
    <div style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div
        style={{ display: 'flex', margin: '40px auto 20vh', maxWidth: 1000 }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <h3>Glyphs</h3>
          <p>Encoded from ETH wallet addresses.</p>
          <p>Designed to be decoded.</p>
        </div>
        <div>
          <Glyph
            address="f9d7ae0884c7d06a6b2107c6f5f522c68a9b9112"
            color
            size="80vh"
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 40,
        }}
      >
        <div
          style={{
            display: 'inline-grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            rowGap: 40,
            columnGap: 40,
          }}
        >
          {gallery?.map(g => (
            <Glyph address={g} color size="20vw" />
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
          display: 'flex',
          alignItems: 'center',
          margin: '0 auto',
          maxWidth: 1000,
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 20,
              width: 700,
            }}
          >
            <Glyph
              address="153aedfbd97a076c00397d1566ffd380f8bcff57"
              color
              size={220}
            />
            <Glyph
              address="120755f1a9e58ebe0206a0638a30b0e92976ca3e"
              color
              size={220}
            />
            <Glyph
              address="0x5c383c6024972dd9895b905191b1d2984ffce5b1"
              color
              size={220}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Glyph
              address="153aedfbd97a076c00397d1566ffd380f8bcff57"
              size={220}
            />
            <Glyph
              address="120755f1a9e58ebe0206a0638a30b0e92976ca3e"
              size={220}
            />
            <Glyph
              address="0x5c383c6024972dd9895b905191b1d2984ffce5b1"
              size={220}
            />
          </div>
        </div>
        <div style={{ marginLeft: 20 }}>
          <h4 style={{ marginBottom: 200 }}>Each Glyph has its own colors</h4>
          <h4>...but is unique even without them.</h4>
        </div>
      </div>

      <div style={{ display: 'flex', margin: '20vh auto 5vh', maxWidth: 1000 }}>
        <div>
          {previewGlyph && utils.isAddress(previewGlyph.toLowerCase()) ? (
            <Glyph address={previewGlyph} size="70vh" color={useColor} />
          ) : (
            <div
              style={{
                width: '75vh',
                height: '75vh',
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
            display: 'flex',
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
                marginTop: '10vh',
              }}
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
