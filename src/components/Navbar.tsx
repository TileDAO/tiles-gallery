import { BigNumber } from '@ethersproject/bignumber'
import { useEthers } from '@usedapp/core'
import { utils } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { useLayoutEffect, useState } from 'react'

import { useTicketBoothContract } from '../hooks/TicketBoothContract'
import { useTilesContract } from '../hooks/TilesContract'

export default function Navbar({
  saleIsActive,
  price,
}: {
  saleIsActive?: boolean
  price?: BigNumber
}) {
  const [ownedTokens, setOwnedTokens] = useState<BigNumber[]>()
  const [TILEBalance, setTILEBalance] = useState<BigNumber>()
  const [supply, setSupply] = useState<BigNumber>()
  const { activateBrowserWallet, account, deactivate } = useEthers()

  const tilesContract = useTilesContract()
  const ticketBoothContract = useTicketBoothContract()

  // Get token IDs of owned Tiles
  useLayoutEffect(() => {
    // Get total supply of Tiles
    tilesContract.functions.totalSupply().then(res => setSupply(res[0]))

    if (account) {
      // Get tokenIDs of Tiles owned by `account`
      tilesContract.functions
        .tokensOfOwner(account)
        .then(res => setOwnedTokens(res[0]))

      // Get staked TILE balance
      ticketBoothContract.functions
        .balanceOf(account, '0x02')
        .then(res => setTILEBalance(res[0]))
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
          alignContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a className="bland" href="/">
            <img style={{ width: 24, height: 24 }} src="assets/logo.svg" />
          </a>
          <a className="text-link" href="/#/recent" style={{ marginLeft: 10 }}>
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
          </a>
        </div>
        {window.innerWidth > 600 &&
          (account ? (
            <div>
              <span>
                <a className="text-link" href={'/#/wallet/' + account}>
                  {ownedTokens?.length ?? 0} Tiles
                </a>{' '}
                |{' '}
                <a className="text-link" href="/#/treasury">
                  {TILEBalance
                    ? Math.round(parseFloat(formatEther(TILEBalance ?? 0)))
                    : '--'}{' '}
                  TILE
                </a>
              </span>{' '}
              | {account}{' '}
              <span className="btn" onClick={deactivate}>
                X
              </span>
            </div>
          ) : (
            <div className="btn" onClick={() => activateBrowserWallet()}>
              connect
            </div>
          ))}
      </div>
    </div>
  )
}
