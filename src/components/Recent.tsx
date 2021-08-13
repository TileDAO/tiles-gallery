import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import { useLayoutEffect, useState } from 'react'

import { useTilesContract } from '../hooks/TilesContract'
import Grid from './Grid'
import TileForToken from './TileForToken'

export default function Recent() {
  const [tokenIds, setTokenIds] = useState<BigNumber[]>([])

  const tilesContract = useTilesContract()

  useLayoutEffect(() => {
    tilesContract.functions.totalSupply().then(res => {
      load(30, res[0])
    })
  }, [])

  function load(count: number, start?: BigNumber) {
    const newTokenIds = start ? [start] : tokenIds

    for (let i = 0; i < count; i++) {
      newTokenIds?.push(newTokenIds[newTokenIds.length - 1].sub(1))
    }

    setTokenIds(newTokenIds)
  }

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
      <h4 style={{ marginBottom: 80 }}>Minted Tiles</h4>
      <Grid
        cols={3}
        items={tokenIds.map(tokenId => (
          <div key={tokenId.toString()}>
            <a
              href={'/#/id/' + tokenId}
              style={{
                display: 'block',
                textDecoration: 'none',
              }}
            >
              <TileForToken
                style={{ width: 280, height: 280 }}
                tokenId={tokenId}
                renderDetails={(address, id) => (
                  <div style={{ marginBottom: 10, textAlign: 'center' }}>
                    <div style={{ fontSize: 11, opacity: 0.25 }}>{address}</div>
                    <div>#{id.toString()}</div>
                  </div>
                )}
              />
            </a>
          </div>
        ))}
      />
      <div style={{ textAlign: 'center' }}>
        <div
          className="btn"
          style={{
            display: 'inline-block',
            marginTop: 100,
            padding: 20,
          }}
          onClick={() => load(30)}
        >
          more
        </div>
      </div>
    </div>
  )
}
