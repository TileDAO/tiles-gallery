import { BigNumber } from '@ethersproject/bignumber'
import { useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useTilesContract } from '../hooks/TilesContract'
import FormattedAddress from './FormattedAddress'
import Grid from './Grid'
import TileForToken from './TileForToken'

export default function Wallet() {
  const [ownedTokens, setOwnedTokens] = useState<BigNumber[]>()

  const { address } = useParams<{ address: string }>()

  const contract = useTilesContract()

  useLayoutEffect(() => {
    if (address) {
      contract.functions
        .tokensOfOwner(address)
        .then(res => setOwnedTokens(res[0]))
        .catch(e => console.log('Error getting tokensOfOwner', e))
    } else if (ownedTokens) {
      setOwnedTokens([])
    }
  }, [address])

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
      {ownedTokens &&
        (ownedTokens.length ? (
          <Grid
            items={ownedTokens.map(t => {
              return (
                <a
                  href={'/#/id/' + t.toString()}
                  key={t.toString()}
                  style={{ textDecoration: 'none' }}
                >
                  <TileForToken
                    tokenId={t}
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
                </a>
              )
            })}
          />
        ) : (
          <div>No Tiles yet</div>
        ))}
    </div>
  )
}
