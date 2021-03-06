import QA from '../../components/shared/QA'
import { dreamsAddress } from '../../contracts/dreams.address'

export default function FAQ() {
  const qas: { q: string; a: string | JSX.Element }[] = [
    {
      q: 'Where is the Dreams contract?',
      a: (
        <a
          href={`https://etherscan.io/address/${dreamsAddress}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`https://etherscan.io/address/${dreamsAddress}`}
        </a>
      ),
    },
    {
      q: 'What does it cost to mint a Dream?',
      a: 'Price is fixed at 0.02 ETH.',
    },
    {
      q: 'If a buy a Tile that has already been used to mint a Dream, can I still mint a Dream from it?',
      a: 'No, only one Dream can be minted from a Tile.',
    },
    {
      q: 'How many phrases can I add to a dream journal?',
      a: '10',
    },
    {
      q: 'How are Dream images and metadata stored?',
      a: 'Dream images and metadata must be stored in a centralized database, accessible via a server hosted at dreamland.tiles.art. Once all Dreams are minted, data will be migrated to a decentralized storage option like IPFS.',
    },
    {
      q: 'Can Dreams change after being minted?',
      a: 'Dream journals can be added to or erased at any time prior to being locked. Once locked, no more changes will be possible. Dreams journals must be locked before a Dream can be minted.',
    },
    {
      q: 'What if I mint directly from the Dreams contract?',
      a: 'Minting directly to the contract will mean you will never be able to associate an image or metadata with your token.',
    },
    {
      q: 'How are Dream images made?',
      a: (
        <>
          Dream images are generated using a neural network developed by{' '}
          <a
            className="btn"
            href="https://wolfbearstudio.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wolfbear Studio
          </a>
          .
        </>
      ),
    },
  ]

  return (
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
  )
}
