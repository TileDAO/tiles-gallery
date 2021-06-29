export default function FAQ() {
  const qa = (q: string, a: string | JSX.Element) => (
    <div key={q}>
      <h4>{q}</h4>
      <p>{a}</p>
    </div>
  )

  const qas: { q: string; a: string | JSX.Element }[] = [
    {
      q: 'How many Tiles are there?',
      a: `There is a unique Tile for every possible ETH wallet address. That's 16^40 Tiles. Or roughly, 15 with 47 zeros behind it.`,
    },
    {
      q: 'What if someone else mints a Tile with my wallet address?',
      a: (
        <span>
          Any minted Tile can be "stolen" by the owner of the wallet with that
          Tile's address, by paying the owner the current market price. However,
          the probability of <i>accidentally</i> minting someone else's wallet
          address Tile is virtually zero.
        </span>
      ),
    },
    {
      q: 'What is the TileDAO?',
      a: (
        <span>
          <a href="/#/dao" target="_blank" rel="noopener noreferrer">
            TileDAO
          </a>{' '}
          receives all funds from Tile sales. Funds are stored in a{' '}
          <a href="https://juice.work">Juice</a> treasury, where they can be
          programmed toward any projects the community decides to support.
          Anyone who owns a Tile is a member of the TileDAO and may join the
          private{' '}
          <a
            href="https://discord.gg/8uMxwdfC"
            target="_blank"
            rel="noreferrer"
          >
            Discord
          </a>
          .
        </span>
      ),
    },
    {
      q: 'Who is the Tile Artist?',
      a: (
        <a
          href="https://twitter.com/peripheralist"
          target="_blank"
          rel="noopener noreferrer"
        >
          @peripheralist
        </a>
      ),
    },
  ]

  return (
    <div>
      <div
        style={{
          maxWidth: 540,
          padding: 20,
          lineHeight: 1.3,
          paddingBottom: 100,
          margin: '10vh auto',
        }}
      >
        {qas.map(_qa => qa(_qa.q, _qa.a))}
      </div>
    </div>
  )
}
