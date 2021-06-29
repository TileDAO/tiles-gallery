import { BigNumber } from '@ethersproject/bignumber'
import { useEthers } from '@usedapp/core'
import { formatUnits } from 'ethers/lib/utils'
import { useLayoutEffect } from 'react'
import { useState } from 'react'
import { tilesAddress } from '../contract/address'

import { useTilesContract } from '../hooks/TilesContract'

export default function Artist({ saleIsActive }: { saleIsActive?: boolean }) {
  const [balance, setBalance] = useState<BigNumber>()
  const { library } = useEthers()

  const contract = useTilesContract()

  useLayoutEffect(() => {
    library?.getBalance(tilesAddress).then(res => setBalance(res))
  }, [library])

  const startSale = async () => {
    contract.functions.startSale().then(
      success => console.log('success', success),
      rejected => console.log('reject', rejected),
    )
  }

  const withdraw = async () => {
    contract.functions.withdrawAll().then(
      success => console.log('success', success),
      rejected => console.log('reject', rejected),
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div style={{ display: 'grid', gridAutoFlow: 'row', gridGap: 20 }}>
        <div
          style={
            saleIsActive
              ? { textDecoration: 'line-through' }
              : { cursor: 'pointer' }
          }
          onClick={saleIsActive ? () => null : startSale}
        >
          start sale
        </div>
        <div style={{ cursor: 'pointer' }} onClick={withdraw}>
          withdraw ({balance ? formatUnits(balance) : null})
        </div>
      </div>
    </div>
  )
}
