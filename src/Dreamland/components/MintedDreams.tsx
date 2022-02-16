import { BigNumber } from 'ethers'
import { useContext, useLayoutEffect, useState } from 'react'
import { DreamlandContext } from '../../contexts/DreamlandContext'
import Grid from '../../components/shared/Grid'

import DreamForToken from './DreamForToken'

const pageSize = 30

export default function MintedDreams() {
  const [tokenIds, setTokenIds] = useState<BigNumber[]>([])

  const { totalSupply, maxSupply } = useContext(DreamlandContext)

  useLayoutEffect(() => {
    load(pageSize, totalSupply)
  }, [totalSupply])

  function load(count: number, start?: BigNumber) {
    if (!start?.gt(0)) return

    const newTokenIds = start ? [start] : [...tokenIds]

    for (let i = 0; i < count - (start ? 1 : 0); i++) {
      const idx = newTokenIds.length - 1
      if (idx === 0) break
      newTokenIds?.push(newTokenIds[newTokenIds.length - 1].sub(1))
    }

    setTokenIds(newTokenIds)
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
        <h4>
          {totalSupply?.toString()}/{maxSupply?.toString()} Dreams minted
        </h4>
        <a
          style={{ display: 'inline-block' }}
          className="bland btn"
          href="/#/dreamland/mint"
        >
          Mint a Dream
        </a>
      </div>

      <Grid
        cols={3}
        items={tokenIds.map(tokenId => (
          <div key={tokenId.toString()}>
            <a
              href={'/#/dreamland/' + tokenId}
              style={{
                display: 'block',
                textDecoration: 'none',
              }}
            >
              <DreamForToken
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
