import { useContext } from 'react'

import { DreamsContext } from '../../contexts/DreamsContext'
import { isMobile } from '../../utils/isMobile'

export default function Landing() {
  const size = isMobile ? 320 : 400

  const { saleIsActive } = useContext(DreamsContext)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        flex: 1,
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...(isMobile ? { marginBottom: 50, marginTop: 20 } : {}),
        }}
      >
        <video
          src="assets/dreamland.mp4"
          width={size}
          height={size}
          style={{ objectFit: 'cover' }}
          autoPlay
          muted
          loop
        />
      </div>

      <div
        style={{
          flex: 1,
          ...(isMobile ? { marginBottom: 80 } : { marginLeft: 20 }),
        }}
      >
        <h2>Dreamland</h2>
        <p>How do Tiles appear in your dreams?</p>
        <p>
          Create imaginative new pieces of art from Tiles by writing your
          thoughts to a dream journal. Using a neural network developed by{' '}
          <a
            className="btn"
            href="https://wolfbearstudio.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wolfbear Studio
          </a>
          , your Tile will then evolve to unveil what you're dreaming.
        </p>
        <p>
          Each Tile allows its owner to mint a single Dream on the Ethereum
          blockchain, until the max supply of 2,222 Dreams is reached.{' '}
          <a className="btn" href="/#/dreamland/faq">
            FAQ
          </a>
        </p>
        <br />

        <div>
          {saleIsActive ? (
            <a
              style={{ fontWeight: 'bold' }}
              className={saleIsActive ? 'btn' : 'btn disabled'}
              href="/#/dreamland/mint"
            >
              Mint a Dream
            </a>
          ) : (
            <div style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
              Sale starts 02-22-22
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
