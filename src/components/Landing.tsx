import Phaser from './Phaser'

export default function Landing() {
  const isMobile = window.innerWidth < 600

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
          flexWrap: 'wrap-reverse',
          flex: 1,
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            textAlign: 'center',
            flex: 1,
            fontSize: '1rem',
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
          Each is unique & subjectively rare
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
              maxWidth: 130,
              margin: '0 auto',
            }}
          >
            <a href="/#/manifesto" className="btn">
              Manifesto
            </a>
            <a href="/#/dao" className="btn">
              DAO
            </a>
          </div>
          <br />
          <br />
          <a style={{ width: 70 }} href="/#/faq" className="btn">
            FAQ
          </a>
        </div>

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
            tileStyle={{ width: '55vh', height: '55vh', maxWidth: '88vw' }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '15vh',
          minHeight: 100,
          ...(isMobile ? { marginTop: 60 } : {}),
        }}
      >
        <a
          className="btn"
          href="/#/mint"
          style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: 30 }}
        >
          Mint a Tile
        </a>
      </div>
    </div>
  )
}
