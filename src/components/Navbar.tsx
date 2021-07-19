import { BigNumber } from '@ethersproject/bignumber'
import { useEthers } from '@usedapp/core'
import { utils } from 'ethers'
import { useLayoutEffect, useState } from 'react'

import { useTilesContract } from '../hooks/TilesContract'
import { tileAddress } from '../contracts/tile.address'
import { useTicketBoothContract } from '../hooks/TicketBoothContract'
import { useErc20Contract } from '../hooks/Erc20Contract'
import { formatEther, parseEther } from 'ethers/lib/utils'

export default function Navbar({
  saleIsActive,
  price,
}: {
  saleIsActive?: boolean
  price?: BigNumber
}) {
  const [ownedTokens, setOwnedTokens] = useState<BigNumber[]>()
  const [TILEBalance, setTILEBalance] = useState<BigNumber>()
  const [stakedTILEBalance, setStakedTILEBalance] = useState<BigNumber>()
  const [supply, setSupply] = useState<BigNumber>()
  const { activateBrowserWallet, account, deactivate, library } = useEthers()

  const tileContract = useErc20Contract(tileAddress)
  const tilesContract = useTilesContract()
  const ticketBoothContract = useTicketBoothContract()

  // Get token IDs of owned Tiles
  useLayoutEffect(() => {
    tilesContract.functions.totalSupply &&
      tilesContract.functions.totalSupply().then(
        res => setSupply(res[0]),
        err => console.log('err', err),
      )
    if (account && tilesContract.functions.tokensOfOwner) {
      tilesContract.functions
        .tokensOfOwner(account)
        .then(res => setOwnedTokens(res[0]))
    } else if (ownedTokens) {
      setOwnedTokens([])
    }

    // Get staked TILE balance
    ticketBoothContract.functions
      .stakedBalanceOf(account, '0x02')
      .then(res => setStakedTILEBalance(res[0]))

    // Get ERC20 TILE balance
    tileContract?.functions
      .balanceOf(account)
      .then(res => setTILEBalance(res[0]))
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
            <span>
              <a className="bland" href={'/#/wallet/' + account}>
                {ownedTokens?.length ?? 0} Tiles
              </a>{' '}
              |{' '}
              <a className="bland" href="/#/treasury">
                {Math.round(
                  parseFloat(
                    formatEther(stakedTILEBalance?.add(TILEBalance ?? 0) || 0),
                  ),
                ) || '--'}{' '}
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
        )}
      </div>
    </div>
  )
}
