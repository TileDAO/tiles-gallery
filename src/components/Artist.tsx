import { BigNumber } from '@ethersproject/bignumber'
import { constants, utils } from 'ethers'
import { CSSProperties } from 'react'
import { useLayoutEffect, useState } from 'react'

import { useTilesContract } from '../hooks/TilesContract'

export default function Artist({ saleIsActive }: { saleIsActive?: boolean }) {
  const [currentArtist, setCurrentArtist] = useState<string>()
  const [currentBaseURI, setCurrentBaseURI] = useState<string>()
  const [reservesCount, setReservesCount] = useState<BigNumber>()
  const [reservesLimit, setReservesLimit] = useState<BigNumber>()

  const contract = useTilesContract()

  useLayoutEffect(() => {
    contract.functions.owner().then(res => setCurrentArtist(res[0]))
    contract.functions.baseURI().then(res => setCurrentBaseURI(res[0]))
    contract.functions
      .mintedReservesCount()
      .then(res => setReservesCount(res[0]))
    contract.functions
      .mintedReservesLimit()
      .then(res => setReservesLimit(res[0]))
  }, [])

  const getInputById = (id: string) =>
    document.getElementById(id) as HTMLInputElement

  const startSale = () => contract.functions.startSale()

  const pauseSale = () => contract.functions.pauseSale()

  const setBaseURI = (uri: string) => contract.functions.setBaseURI(uri)

  const transferOwnership = (address: string) => {
    if (!utils.isAddress(address)) return
    contract.functions.transferOwnership(address)
  }

  const mintReserveTile = (to: string, address: string) => {
    if (!utils.isAddress(to) || !utils.isAddress(address)) return
    contract.functions.mintReserveTile(to, address)
  }

  const remainingReserves = reservesLimit?.sub(reservesCount ?? 0)

  const gridItemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
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
      <div style={{ display: 'grid', gridAutoFlow: 'row', gridGap: 40 }}>
        <div>
          <span className="btn" onClick={saleIsActive ? pauseSale : startSale}>
            {saleIsActive ? 'Pause sale' : 'Start sale'}
          </span>
        </div>

        <div>baseURI: {currentBaseURI}</div>
        <div style={gridItemStyle}>
          <input id="newBaseURI" placeholder={currentBaseURI} />
          <div
            className="btn"
            onClick={() => {
              const uri = getInputById('newBaseURI')?.value
              setBaseURI(uri ?? '')
            }}
          >
            Set new baseURI
          </div>
        </div>

        <div>Artist: {currentArtist}</div>
        <div style={gridItemStyle}>
          <input id="newArtist" placeholder={constants.AddressZero} />
          <div
            className="btn"
            onClick={() => {
              const address = getInputById('newArtist').value
              if (address) transferOwnership(address)
            }}
          >
            Set new Artist
          </div>
        </div>

        <div>
          <div style={{ marginBottom: 10 }}>
            Mint reserve Tile ({remainingReserves?.toString()}/
            {reservesLimit?.toString()} remaining)
          </div>
          <div style={{ ...gridItemStyle, marginBottom: 10 }}>
            <label htmlFor="to">To</label>
            <input
              name="to"
              id="mintReserveTo"
              disabled={remainingReserves?.eq(0)}
              placeholder={constants.AddressZero}
            />
          </div>
          <div style={{ ...gridItemStyle, marginBottom: 10 }}>
            <label htmlFor="address">Tile address</label>
            <input
              name="address"
              id="mintReserveAddress"
              disabled={remainingReserves?.eq(0)}
              placeholder={constants.AddressZero}
            />
          </div>
          <div style={{ textAlign: 'right' }}>
            <span
              className="btn"
              onClick={() => {
                const to = getInputById('mintReserveTo').value
                const address = getInputById('mintReserveAddress').value
                if (to && address) mintReserveTile(to, address)
              }}
            >
              Mint
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
