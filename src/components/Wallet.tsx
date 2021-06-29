import { BigNumber } from '@ethersproject/bignumber'
import React, { useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useTilesContract } from '../hooks/TilesContract'
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
    } else if (ownedTokens) {
      setOwnedTokens([])
    }
  }, [address])

  return (
    <div
      style={{
        paddingTop: '20vh',
        maxWidth: 960,
        margin: '0 auto',
        paddingBottom: 100,
      }}
    >
      <div style={{ marginBottom: 80 }}>Tiles owned by {address}</div>
      {ownedTokens &&
        (ownedTokens.length ? (
          <div
            style={{
              display: 'grid',
              gridGap: 60,
              margin: '0 auto',
              ...(window.innerWidth > 960
                ? {
                    gridTemplateColumns: `repeat(${Math.min(
                      ownedTokens.length || 3,
                      3,
                    )}, 1fr`,
                    maxWidth: 960,
                  }
                : { gridTemplateColumns: '1fr', gridGap: 60 }),
            }}
          >
            {ownedTokens.map((t, i) => {
              return (
                <div key={t.toString()}>
                  <TileForToken
                    tokenId={t}
                    onClickTile={address => (window.location.hash = address)}
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <div>No Tiles yet</div>
        ))}
    </div>
  )
}
