import { constants, utils } from 'ethers'
import { CSSProperties, useLayoutEffect, useState } from 'react'
import { useDreamsContract } from '../hooks/DreamsContract'

export default function DreamsOwnerDashboard() {
  const [saleIsActive, setSaleIsActive] = useState<boolean>()
  const [currentOwner, setCurrentOwner] = useState<string>()
  const [currentBaseURI, setCurrentBaseURI] = useState<string>()

  const contract = useDreamsContract()

  useLayoutEffect(() => {
    contract.functions
      .owner()
      .then(res => setCurrentOwner(res[0]))
      .catch(e => console.log('Error getting owner', e))
    contract.functions
      .saleIsActive()
      .then(res => setSaleIsActive(res[0]))
      .catch(e => console.log('Error getting saleIsActive', e))
    contract.functions
      .baseURI()
      .then(res => setCurrentBaseURI(res[0]))
      .catch(e => console.log('Error getting baseURI', e))
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

        <div>Owner: {currentOwner}</div>
        <div style={gridItemStyle}>
          <input id="newOwner" placeholder={constants.AddressZero} />
          <div
            className="btn"
            onClick={() => {
              const address = getInputById('newOwner').value
              if (address) transferOwnership(address)
            }}
          >
            Set new owner
          </div>
        </div>
      </div>
    </div>
  )
}
