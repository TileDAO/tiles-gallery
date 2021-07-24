import Wallet from 'ethereumjs-wallet'
import { constants, utils } from 'ethers'
import { useLayoutEffect, useState } from 'react'

import Tile from './Tile'

export default function Gallery() {
  const [size, setSize] = useState<'small' | 'big'>('big')
  const [gallery, setGallery] = useState<string[]>()
  const [address, setAddress] = useState<string>('')

  const load = (count: number) => {
    const newGallery = [...(gallery ?? [])]

    for (let i = 0; i < count; i++) {
      newGallery.push('0x' + randomAddress())
    }

    setGallery(newGallery)
  }

  useLayoutEffect(() => {
    if (gallery?.length || address) return

    load(90)
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
        Each one is unique & subjectively rare
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
          <a href="/#/manifesto">Manifesto</a>
          <a href="/#/dao">DAO</a>
        </div>
        <br />
        <br />
        <a style={{ width: 70 }} href="/#/faq">
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
          onChange={e => setAddress(e.target.value.trim())}
        />
      </div>
      <div style={{ width: '100%', textAlign: 'center', paddingBottom: 300 }}>
        {address ? (
          utils.isAddress(address.toLowerCase()) ? (
            <a href={'/#/' + address} style={{ display: 'block' }}>
              <Tile
                style={{ width: 360, height: 360 }}
                address={address.toLowerCase()}
              />
            </a>
          ) : (
            'Not a valid address'
          )
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
                        size === 'big' ? '1fr' : 'repeat(3, 1fr)',
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
                    <div key={g}>
                      <a href={'/#/' + g} style={{ display: 'block' }}>
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
                      </a>
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
              className="btn"
              style={{
                display: 'inline-block',
                marginTop: 100,
                padding: 20,
              }}
              onClick={() => load(30)}
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
        <div style={{ marginBottom: 10 }}>
          <a
            href="https://twitter.com/Tile_DAO"
            target="_blank"
            rel="noreferrer"
          >
            <img
              style={{ color: '#222', width: 24 }}
              src="assets/twitter.svg"
            />
          </a>
        </div>
        <div style={{ marginBottom: 10 }}>
          <a
            href="https://discord.gg/SqZA8dUFtY"
            target="_blank"
            rel="noreferrer"
          >
            <img
              style={{ color: '#222', width: 24 }}
              src="assets/discord.svg"
            />
          </a>
        </div>
        <div>
          <a
            href="https://github.com/TileDAO/tiles"
            target="_blank"
            rel="noreferrer"
          >
            <img style={{ color: '#222', width: 24 }} src="assets/github.svg" />
          </a>
        </div>
      </div>
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
            marginBottom: 10,
          }}
          onClick={() => window.scrollTo({ top: 0 })}
        >
          ^
        </div>
        {window.innerWidth > 960 && (
          <div
            style={{
              cursor: size === 'big' ? 'default' : 'pointer',
              background: '#222',
              color: 'white',
              padding: 5,
              opacity: size === 'big' ? 0.4 : 1,
            }}
            onClick={() => setSize('big')}
          >
            +
          </div>
        )}
        {window.innerWidth > 960 && (
          <div
            style={{
              cursor: size === 'small' ? 'default' : 'pointer',
              background: '#222',
              color: 'white',
              padding: 5,
              opacity: size === 'small' ? 0.4 : 1,
            }}
            onClick={() => setSize('small')}
          >
            -
          </div>
        )}
      </div>
      )
    </div>
  )
}
