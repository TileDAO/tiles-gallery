import { isMobile } from '../../utils/isMobile'

export default function Landing() {
  const size = isMobile ? 320 : 400

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
        <p>
          Create a Dream from your Tile by adding phrases to a dream journal.
          Your Tile will evolve based on what you're dreaming of, using a neural
          network developed by{' '}
          <a
            className="btn"
            href="https://wolfbearstudio.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wolfbear Studio
          </a>
          .
        </p>
        <p>
          Every Tile allows its owner to mint a single Dream, until the max
          supply of 2,222 Dreams is reached.{' '}
          <a className="btn" href="/#/dreamland/faq">
            FAQ
          </a>
        </p>
        <br />
        <a
          style={{ fontWeight: 'bold' }}
          className="btn"
          href="/#/dreamland/mint"
        >
          Mint a Dream
        </a>
      </div>
    </div>
  )
}
