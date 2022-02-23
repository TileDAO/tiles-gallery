import QA from './shared/QA'

export default function FAQ() {
  const qas: { q: string; a: string | JSX.Element }[] = [
    {
      q: 'How many Tiles are there?',
      a: `There is a unique Tile for every possible ETH wallet address. That's 16^40 Tiles. Or roughly, 15 with 47 zeros behind it.`,
    },
    {
      q: 'What happens when I buy a Tile?',
      a: `Purchasing a Tile mints a Tiles NFT to your connected wallet address,
          for the Tile you've selected.`,
    },
    {
      q: 'Can I only mint the Tile with my address?',
      a: `Any Tile can be minted by anyone.`,
    },
    {
      q: 'What if someone else mints a Tile with my wallet address?',
      a: `Any minted Tile can be "collected" by the owner of the wallet with
          that Tile's address, by paying the owner the current market price.
          However, the probability of accidentally minting someone else's wallet
          address Tile is virtually zero.`,
    },
    {
      q: 'Is every Tile different?',
      a: `No SVGs will be exactly the same for any two Tiles. However, there will be some (extremely uncommon) sets that are hard to tell apart or visually indistinguishable, even though their code is unique. Whether these are more or less valuable will be up to you.`,
    },
    {
      q: 'Where can I find the Tiles NFT contract?',
      a: (
        <span>
          You can see the contract on etherscan{' '}
          <a
            href="https://etherscan.io/address/0x64931F06d3266049Bf0195346973762E6996D764"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          . Its address is 0x64931F06d3266049Bf0195346973762E6996D764
        </span>
      ),
    },
    {
      q: 'What is the TileDAO?',
      a: (
        <span>
          <a href="/#/dao">TileDAO</a> receives all funds from the Tiles primary
          sale. Funds are stored in a{' '}
          <a
            href="https://juicebox.money/#/p/tiles"
            target="_blank"
            rel="noopener noreferrer"
          >
            Juicebox treasury
          </a>
          , where they can be programmed transparently toward other people or
          projects. Anyone who owns a Tile is a member of the TileDAO and is
          invited to join the{' '}
          <a
            href="https://discord.gg/SqZA8dUFtY"
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
            who purchases a Tile in the primary sale, proportional to the price
            they paid. TILE tokens can be redeemed for a portion of any
            unallocated funds in the{' '}
            <a
              href="https://juicebox.money/#/p/tiles"
              target="_blank"
              rel="noopener noreferrer"
            >
              treasury
            </a>
            —effectively a discount on buying a Tile. It will be up to the
            community to decide how else TILE tokens are used in the future.
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
            href="https://juicebox.money/#/p/tiles"
            target="_blank"
            rel="noopener noreferrer"
          >
            TileDAO treasury
          </a>{' '}
          after first connecting the same wallet you used to purchase your Tile.
          You can always cash in TILE tokens for unallocated treasury funds
          without needing to claim them first.
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
            If needed, the server could be relocated in the future, or
            redesigned in a case like the ETH wallet address standard being
            changed. The Tiles contract can be updated by the owner to retrieve
            metadata from the new location using the <code>setBaseURI()</code>{' '}
            function.
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
        {qas.map(qa => (
          <div style={{ marginBottom: 40 }}>
            <QA q={qa.q} a={qa.a} />
          </div>
        ))}
      </div>
    </div>
  )
}
