import { BigNumber } from 'ethers'
import { useContext, useLayoutEffect, useState } from 'react'

import Grid from '../../components/shared/Grid'
import { DreamsContext } from '../../contexts/DreamsContext'
import DreamForToken from './DreamForToken'

const pageSize = 30

export default function MintedDreams() {
  const [tokenIds, setTokenIds] = useState<BigNumber[]>([])

  const { totalSupply } = useContext(DreamsContext)

  useLayoutEffect(() => {
    load(pageSize, totalSupply)
  }, [totalSupply])

  function load(count: number, start?: BigNumber) {
    if (!start?.gt(0)) return

    const newTokenIds = start ? [start] : [...tokenIds]

    const startId = newTokenIds[newTokenIds.length - 1]

    let added = 0
    for (let i = startId.toNumber(); i > 0; i--) {
      if (added === count) break
      newTokenIds?.push(BigNumber.from(i).sub(1))
      added++
    }

    setTokenIds(newTokenIds)
  }

  return (
    <div>
      <Grid
        cols={3}
        items={tokenIds.map(tokenId => (
          <div key={tokenId.toString()}>
            <DreamForToken
              style={{ width: 280, height: 280 }}
              tokenId={tokenId}
              dreamLink={
                window.location.href +
                (window.location.href.endsWith('/') ? '' : '/') +
                'id/' +
                tokenId.toString()
              }
              renderDetails={(address, id) => (
                <div style={{ marginBottom: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, opacity: 0.25 }}>{address}</div>
                  <div>#{id.toString()}</div>
                </div>
              )}
            />
          </div>
        ))}
      />

      <div
        style={{
          textAlign: 'center',
          padding: 20,
        }}
      >
        {tokenIds && tokenIds.length && tokenIds.length % pageSize === 0 ? (
          <span className="btn" onClick={() => load(pageSize)}>
            more
          </span>
        ) : (
          tokenIds.length === 0 && <span>No dreams minted yet</span>
        )}
      </div>
    </div>
  )
}
