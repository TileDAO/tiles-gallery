import { BigNumber } from '@ethersproject/bignumber'
import { useEthers } from '@usedapp/core'
import { utils } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { useContext, useLayoutEffect, useState } from 'react'

import { TilesContext } from '../contexts/TilesContext'
import { useTicketBoothContract } from '../hooks/TicketBoothContract'
import { useTilesContract } from '../hooks/TilesContract'
import FormattedAddress from './shared/FormattedAddress'

export default function Navbar() {
  const [ownedTokens, setOwnedTokens] = useState<BigNumber[]>()
  const [TILEBalance, setTILEBalance] = useState<BigNumber>()
  const { activateBrowserWallet, account, deactivate } = useEthers()

  const { saleIsActive, currentPrice, totalSupply } = useContext(TilesContext)

  const tilesContract = useTilesContract()
  const ticketBoothContract = useTicketBoothContract()

  // Get token IDs of owned Tiles
  useLayoutEffect(() => {
    if (account) {
      // Get tokenIDs of Tiles owned by `account`
      tilesContract.functions
        .tokensOfOwner(account)
        .then(res => setOwnedTokens(res[0]))
        .catch(e => console.log('Error getting tokensOfOwner', e))

      // Get staked TILE balance
      ticketBoothContract.functions
        .balanceOf(account, '0x02')
        .then(res => setTILEBalance(res[0]))
        .catch(e => console.log('Error getting balanceOf', e))
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
          <a className="text-link" href="/#/minted" style={{ marginLeft: 10 }}>
            {saleIsActive ? (
              <span>
                {totalSupply?.toString() ?? 0} minted{' '}
                {currentPrice && (
                  <span>
                    // current price:{' '}
                    {utils.formatUnits(currentPrice.toString())} ETH
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
              | <FormattedAddress address={account} />{' '}
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
