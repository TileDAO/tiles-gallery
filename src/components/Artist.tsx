import { BigNumber } from '@ethersproject/bignumber'
import { constants, utils } from 'ethers'
import { useLayoutEffect, useState } from 'react'

import { useTilesContract } from '../hooks/TilesContract'

export default function Artist({ saleIsActive }: { saleIsActive?: boolean }) {
  const [currentJuicer, setCurrentJuicer] = useState<string>()
  const [currentProjectID, setCurrentProjectID] = useState<BigNumber>()
  const [reservesCount, setReservesCount] = useState<BigNumber>()
  const [reservesLimit, setReservesLimit] = useState<BigNumber>()

  const contract = useTilesContract()

  useLayoutEffect(() => {
    contract.functions.juicer().then(res => setCurrentJuicer(res[0]))
    contract.functions.projectID().then(res => setCurrentProjectID(res[0]))
    contract.functions
      .mintedReservesCount()
      .then(res => setReservesCount(res[0]))
    contract.functions
      .mintedReservesLimit()
      .then(res => setReservesLimit(res[0]))
  }, [])

  const startSale = () => contract.functions.startSale()

  const pauseSale = () => contract.functions.pauseSale()

  const setJuicerAddress = (address: string) => {
    if (utils.isAddress(address)) return
    contract.functions.setJuicer(address)
  }

  const setProjectID = (newProjectID: string) =>
    contract.functions.setProjectID(BigNumber.from(newProjectID).toHexString())

  const transferOwnership = (address: string) => {
    if (!utils.isAddress(address)) return
    contract.functions.transferOwnership(address)
  }

  const mintReserveTile = (to: string, address: string) => {
    if (!utils.isAddress(to) || !utils.isAddress(address)) return
    contract.functions.mintReserveTile(to, address)
  }

  const remainingReserves = reservesLimit?.sub(reservesCount ?? 0)

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
          style={{ cursor: 'pointer' }}
          onClick={saleIsActive ? pauseSale : startSale}
        >
          {saleIsActive ? 'Pause sale' : 'Start sale'}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <input id="newJuicerAddress" placeholder={currentJuicer} />
          <div
            style={{ cursor: 'pointer', marginLeft: 10 }}
            onClick={() => {
              const address =
                document.getElementById('newJuicerAddress')?.nodeValue
              if (address) setJuicerAddress(address)
            }}
          >
            Set Juicer
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <input id="newArtist" placeholder={constants.AddressZero} />
          <div
            style={{ cursor: 'pointer', marginLeft: 10 }}
            onClick={() => {
              const address = document.getElementById('newArtist')?.nodeValue
              if (address) transferOwnership(address)
            }}
          >
            Set new Artist
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <input id="newProjectId" placeholder={currentProjectID?.toString()} />
          <div
            style={{ cursor: 'pointer', marginLeft: 10 }}
            onClick={() => {
              const id = document.getElementById('newProjectId')?.nodeValue
              if (id) setProjectID(id)
            }}
          >
            Set Juicebox Project
          </div>
        </div>

        <div>
          <div>
            Mint reserve Tile ({remainingReserves?.toString()}/
            {reservesLimit?.toString()} remaining)
          </div>
          <div>
            <label htmlFor="to">To</label>
            <input
              name="to"
              id="mintReserveTo"
              disabled={remainingReserves?.eq(0)}
              placeholder={constants.AddressZero}
            />
          </div>
          <div>
            <label htmlFor="address">Tile address</label>
            <input
              name="address"
              id="mintReserveAddress"
              disabled={remainingReserves?.eq(0)}
              placeholder={constants.AddressZero}
            />
          </div>
          {remainingReserves?.gt(0) && (
            <div
              style={{ cursor: 'pointer', marginLeft: 10 }}
              onClick={() => {
                const to = document.getElementById('mintReserveTo')?.nodeValue
                const address =
                  document.getElementById('mintReserveAddress')?.nodeValue
                if (to && address) mintReserveTile(to, address)
              }}
            >
              Mint
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
