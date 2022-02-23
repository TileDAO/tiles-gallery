import { useParams } from 'react-router-dom'

import { useOwnedTiles } from '../hooks/OwnedTiles'
import FormattedAddress from './shared/FormattedAddress'
import Grid from './shared/Grid'
import TileForToken from './shared/TileForToken'

export default function Wallet() {
  const { address } = useParams<{ address: string }>()

  const ownedTiles = useOwnedTiles(address)

  return (
    <div
      style={{
        paddingTop: '20vh',
        width: 960,
        maxWidth: '90vw',
        margin: '0 auto',
        paddingBottom: 100,
      }}
    >
      <h4 style={{ marginBottom: 80 }}>
        Tiles owned by <FormattedAddress address={address} />
      </h4>
      {ownedTiles &&
        (ownedTiles.length ? (
          <Grid
            items={ownedTiles.map(id => {
              return (
                <TileForToken
                  key={id.toString()}
                  tileLink={'/#/id/' + id.toString()}
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
          <div>No Tiles yet</div>
        ))}
    </div>
  )
}
