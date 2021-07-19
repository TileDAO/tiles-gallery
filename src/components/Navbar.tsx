import { BigNumber } from '@ethersproject/bignumber'
import { useEthers } from '@usedapp/core'
import { utils } from 'ethers'
import { useLayoutEffect, useState } from 'react'

import { useTilesContract } from '../hooks/TilesContract'

export default function Navbar({
  saleIsActive,
  price,
}: {
  saleIsActive?: boolean
  price?: BigNumber
}) {
  const [ownedTokens, setOwnedTokens] = useState<BigNumber[]>()
  const [supply, setSupply] = useState<BigNumber>()
  const { activateBrowserWallet, account, deactivate } = useEthers()

  const contract = useTilesContract()

  useLayoutEffect(() => {
    contract.functions.totalSupply &&
      contract.functions.totalSupply().then(
        res => setSupply(res[0]),
        err => console.log('err', err),
      )
    if (account && contract.functions.tokensOfOwner) {
      contract.functions
        .tokensOfOwner(account)
        .then(res => setOwnedTokens(res[0]))
    } else if (ownedTokens) {
      setOwnedTokens([])
    }
  }, [account])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <a
          className="bland"
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <img style={{ width: 24, height: 24 }} src="assets/logo.svg" />
          <span style={{ marginLeft: 10 }}>
            {saleIsActive ? (
              <span>
                {supply?.toString() ?? 0} minted{' '}
                {price && (
                  <span>
                    // current price: {utils.formatUnits(price.toString())} ETH
                  </span>
                )}
              </span>
            ) : saleIsActive === false ? (
              'Sale is paused'
            ) : (
              ''
            )}
          </span>
        </a>
        {account ? (
          <div>
            <a className="bland" href={'/#/wallet/' + account}>
              ({ownedTokens?.length ?? 0} owned)
            </a>{' '}
            {account}{' '}
            <span className="btn" onClick={deactivate}>
              X
            </span>
          </div>
        ) : (
          <div className="btn" onClick={() => activateBrowserWallet()}>
            connect
          </div>
        )}
      </div>
    </div>
  )
}
