import Wallet from 'ethereumjs-wallet'
import { constants } from 'ethers'
import { useLayoutEffect, useState } from 'react'

import Tile from './Tile'

export default function Gallery() {
  const [size, setSize] = useState<'small' | 'big'>('big')
  const [gallery, setGallery] = useState<string[]>()
  const [address, setAddress] = useState<string>('')

  useLayoutEffect(() => {
    if (gallery?.length || address) return

    let _gallery: string[] = []

    for (let i = 0; i < 90; i++) {
      _gallery.push('0x' + randomAddress())
    }

    setGallery(_gallery)
  }, [address, gallery])

  const randomAddress = () => Wallet.generate().getAddress().toString('hex')

  return (
    <div>
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          paddingTop: '12vh',
          textAlign: 'center',
        }}
      >
        <span style={{ fontWeight: 600 }}>Tiles</span>
        <br />
        <br />
        <br />
        Infinite artworks
        <br />
        <br />
        <br />
        Generated from any ETH address
        <br />
        <br />
        <br />
        Each one is unique. And equally rare?
        <br />
        <br />
        <br />
        <a href="/#/prices">Price</a> increases as more are sold
        <br />
        <br />
        <br />
        Value is for you to decide
        <br />
        <br />
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: 110,
            margin: '0 auto',
          }}
        >
          <a href="/#/manifesto" target="_blank" rel="noreferrer">
            Manifesto
          </a>
          <a href="/#/dao" target="_blank" rel="noreferrer">
            DAO
          </a>
        </div>
        <br />
        <br />
        <a style={{ width: 70 }} href="/#/faq" target="_blank" rel="noreferrer">
          FAQ
        </a>
      </div>
      <div
        style={{
          marginTop: 60,
          marginBottom: 60,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 360,
          maxWidth: '90vw',
        }}
      >
        <input
          style={{
            textAlign: 'center',
            display: 'block',
            border: '1px solid #ddd',
            borderRadius: 4,
            padding: 5,
            width: '100%',
            boxSizing: 'border-box',
          }}
          placeholder={constants.AddressZero}
          onChange={e => setAddress(e.target.value)}
        />
      </div>

      <div style={{ width: '100%', textAlign: 'center', paddingBottom: 300 }}>
        {address ? (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => (window.location.hash = address)}
          >
            <Tile address={address} />
          </div>
        ) : (
          <div>
            <div
              style={{
                display: 'grid',
                gridGap: size === 'big' ? 100 : 60,
                margin: '0 auto',
                ...(window.innerWidth > 960
                  ? {
                      gridTemplateColumns:
                        size === 'big' ? 'repeat(2, 1fr)' : 'repeat(3, 1fr',
                      maxWidth: size === 'big' ? 900 : 960,
                      paddingLeft: 60,
                      paddingRight: 60,
                    }
                  : { gridTemplateColumns: '1fr', gridGap: 60 }),
              }}
            >
              {gallery?.map(
                g =>
                  g && (
                    <div
                      key={g}
                      onClick={() => (window.location.hash = g)}
                      style={{ cursor: 'pointer' }}
                    >
                      <Tile
                        address={g}
                        style={
                          window.innerWidth > 600
                            ? size === 'big'
                              ? { width: 360, height: 360 }
                              : { width: 240, height: 240 }
                            : { width: 300, height: 300 }
                        }
                      />
                      <div
                        style={{
                          fontSize: 11,
                          opacity: 0.25,
                          userSelect: 'all',
                        }}
                      >
                        {g}
                      </div>
                    </div>
                  ),
              )}
            </div>
            <div
              style={{ textAlign: 'center', marginTop: 100 }}
              onClick={() => {
                let newAddresses: string[] = []

                for (let i = 0; i < 30; i++) {
                  newAddresses.push(randomAddress())
                }

                setGallery([...(gallery ?? []), ...newAddresses])
              }}
            >
              more
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          padding: 10,
        }}
      >
        <a href="https://github.com" target="_blank" rel="noreferrer">
          <img style={{ color: '#222' }} src="assets/github.svg" />
        </a>
      </div>

      {window.innerWidth > 960 && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            padding: 10,
          }}
        >
          <div
            style={{
              cursor: 'pointer',
              background: '#222',
              color: 'white',
              padding: 5,
              opacity: size === 'big' ? 0.4 : 1,
            }}
            onClick={() => setSize('big')}
          >
            +
          </div>
          <div
            style={{
              cursor: 'pointer',
              background: '#222',
              color: 'white',
              padding: 5,
              opacity: size === 'small' ? 0.4 : 1,
            }}
            onClick={() => setSize('small')}
          >
            -
          </div>
        </div>
      )}
    </div>
  )
}
