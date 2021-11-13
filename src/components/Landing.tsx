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
              width: '74vh',
              height: '74vh',
              maxWidth: '100vw',
              maxHeight: '100vw',
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
          <span style={{ fontWeight: 600, fontSize: '1.4rem' }}>Tiles</span>
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
          <div>
            <a href="/#/manifesto" className="btn" style={{ marginRight: 20 }}>
              Manifesto
            </a>
            <a href="/#/dao" className="btn" style={{ marginRight: 20 }}>
              DAO
            </a>
            <a style={{ width: 70 }} href="/#/faq" className="btn">
              FAQ
            </a>
          </div>
          <br />
          <br />
          <br />
          <br />
          <a className="btn" href="/#/mint" style={{ fontWeight: 'bold' }}>
            Mint
          </a>
        </div>
      </div>
    </div>
  )
}
