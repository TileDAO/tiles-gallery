import { useEthers } from '@usedapp/core'
import { useOwnedTiles } from '../../hooks/OwnedTiles'
import Grid from '../../components/shared/Grid'
import TileForToken from '../../components/shared/TileForToken'

export default function SelectTile() {
  const { account } = useEthers()
  const ownedTiles = useOwnedTiles(account)

  if (!ownedTiles) {
    return <div style={{ textAlign: 'center' }}>Connect a wallet to mint</div>
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 40,
        }}
      >
        <h4>Select a Tile to dream of</h4>
        <a
          style={{ display: 'inline-block' }}
          className="bland btn"
          href="/#/mint"
        >
          Mint a Tile
        </a>
      </div>

      {ownedTiles.length ? (
        <Grid
          items={ownedTiles.map(id => {
            return (
              <TileForToken
                key={id.toString()}
                tileLink={(_address: string) => '/#/dreamland/mint/' + _address}
                tokenId={id}
                style={{ width: 280, height: 280 }}
                renderDetails={(_address, id) => (
                  <div
                    style={{
                      fontSize: 11,
                      textAlign: 'center',
                    }}
                  >
                    <div>{_address}</div>
                    <div style={{ fontWeight: 600, opacity: 0.25 }}>
                      #{id.toString()}
                    </div>
                  </div>
                )}
              />
            )
          })}
        />
      ) : (
        <div
          style={{
            alignItems: 'baseline',
            textAlign: 'center',
            padding: 20,
          }}
        >
          You don't own any Tiles
        </div>
      )}
    </div>
  )
}
