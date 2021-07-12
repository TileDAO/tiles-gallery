export default function FAQ() {
  const qa = (q: string, a: string | JSX.Element) => (
    <div key={q} style={{ marginBottom: 40 }}>
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
          Any minted Tile can be "collected" by the owner of the wallet with
          that Tile's address, by paying the owner the current market price.
          However, the probability of accidentally minting someone else's wallet
          address Tile is virtually zero.
        </span>
      ),
    },
    {
      q: 'What is the TileDAO?',
      a: (
        <span>
          <a href="/#/dao">TileDAO</a> receives all funds from Tile sales. Funds
          are stored in a{' '}
          <a
            href="https://juicebox.money/#/p/tiledao"
            target="_blank"
            rel="noopener noreferrer"
          >
            Juicebox treasury
          </a>
          , where they can be programmed towards anyone the community decides to
          support. Anyone who owns a Tile is a member of the TileDAO and is
          invited to join the{' '}
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
      q: `What is the TILE ERC-20 token?`,
      a: (
        <span>
          <p>
            TILE is given by the <a href="/#/dao">TileDAO</a> treasury to anyone
            who purchases a Tile, proportional to the price they paid. Tiles
            sold on the secondary market will not earn TILE.
          </p>
          <p>
            Right now TILE is simply a way to give Tile buyers a balance of
            community tokens proportional to the amount they've spent. It will
            be up to the community to decide how they might be used in the
            future.
          </p>
          <p>
            One option may involve using{' '}
            <a
              href="https://juicebox.money/#/p/tiledao"
              target="_blank"
              rel="noopener noreferrer"
            >
              Juicebox
            </a>{' '}
            to allow TILE holders to exchange their tokens for a portion of
            Tiles revenue.
          </p>
        </span>
      ),
    },
    {
      q: `How can I claim my TILE ERC-20 tokens after buying a Tile?`,
      a: (
        <span>
          TILE tokens can be claimed from the{' '}
          <a
            href="https://juicebox.money/#/p/tiledao"
            target="_blank"
            rel="noopener noreferrer"
          >
            TileDAO treasury
          </a>{' '}
          after first connecting the same wallet you used to purchase your Tile.
        </span>
      ),
    },
    {
      q: 'How are Tiles made, and where are they stored?',
      a: (
        <span>
          <p>
            Tiles are created by a server located at https://api.tiles.art. Tile
            images are rendered each time a url like https://api.tiles.art/tile/
            {'<tile-address>'} is visited.
          </p>
          <p>
            A server is used because, unlike NFT projects with a finite number
            of artworks in a collection, it would be impossible to pre-generate
            and store every Tile on a network like IPFS. While Tiles could be
            generated and stored at the time of minting, saving a{' '}
            <a
              href="https://docs.ipfs.io/concepts/content-addressing/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CID
            </a>{' '}
            in the on-chain metadata, this is risky: in the case of an
            unexpected network or browser error, flawed metadata could be stored
            and an incorrect CID would be irreversibly saved on-chain for that
            Tile.
          </p>
          <p>
            If needed, the server can be relocated in the future, and the Tiles
            contract can be updated to retrieve metadata/image URIs from the new
            location using the <code>setBaseURI()</code> function.
          </p>
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
