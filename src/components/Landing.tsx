import { isMobile } from '../utils/isMobile'
import Phaser from './Phaser'

export default function Landing() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '95vh',
        width: '100vw',
        maxWidth: 1000,
        margin: '0 auto',
        paddingTop: '5vh',
      }}
    >
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
          <Phaser
            tileStyle={{
              width: '70vh',
              height: '70vh',
              maxWidth: '100vw',
              maxHeight: '100vw',
              minWidth: 360,
              minHeight: 360,
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            fontSize: '1rem',
            textAlign: 'center',
            ...(isMobile ? { marginBottom: 80 } : { marginLeft: 20 }),
          }}
        >
          <span style={{ fontWeight: 600, fontSize: '1.25rem' }}>Tiles</span>
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
          Each is unique & subjectively rare
          <br />
          <br />
          <br />
          Value is for you to decide
          <br />
          <br />
          <br />
          <span>
            <a
              href="/#/manifesto"
              className="btn"
              style={{ marginRight: '1rem' }}
            >
              Manifesto
            </a>
            <a href="/#/dao" className="btn" style={{ marginRight: '1rem' }}>
              DAO
            </a>
            <a href="/#/faq" className="btn">
              FAQ
            </a>
          </span>
          <br />
          <br />
          <br />
          <a className="btn" href="/#/mint" style={{ fontWeight: 'bold' }}>
            Mint a Tile
          </a>
          <br />
          <br />
          <br />
          <a className="btn" href="/#/dreamland" style={{ fontWeight: 'bold' }}>
            Dreamland
          </a>
        </div>
      </div>
    </div>
  )
}
