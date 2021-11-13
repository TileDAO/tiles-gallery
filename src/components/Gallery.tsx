import Wallet from 'ethereumjs-wallet'
import { constants, utils } from 'ethers'
import { useLayoutEffect, useState } from 'react'

import Grid from './shared/Grid'
import Tile from './shared/Tile'
import Phaser from './Phaser'

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

  const largeTileSize = 360
  const smallTileSize = 280

  return (
    <div>
      <div
        style={{
          marginTop: 80,
          marginBottom: 60,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: largeTileSize,
          maxWidth: '90vw',
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Mint a Tile</h2>
        <p>
          Enter an 0x address to find its matching Tile, or browse the randomly
          generated list below.
        </p>

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
          onChange={e => setAddress(e.target.value.trim().toLowerCase())}
        />
      </div>
      <div style={{ width: '100%', textAlign: 'center', paddingBottom: 300 }}>
        {address ? (
          utils.isAddress(address) ? (
            <a href={'/#/' + address} style={{ display: 'block' }}>
              <Tile
                style={{ width: largeTileSize, height: largeTileSize }}
                address={address}
              />
            </a>
          ) : (
            'Not a valid address'
          )
        ) : (
          <div>
            <Grid
              cols={size === 'big' ? 1 : 3}
              items={gallery?.map(g => (
                <div key={g}>
                  <a href={'/#/' + g} style={{ display: 'block' }}>
                    <Tile
                      style={
                        size === 'big'
                          ? { width: largeTileSize, height: largeTileSize }
                          : { width: smallTileSize, height: smallTileSize }
                      }
                      address={g}
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
              ))}
            />

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
          fontWeight: 'bold',
          fontSize: '1rem'
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
