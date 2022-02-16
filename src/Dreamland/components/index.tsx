import { useEthers } from '@usedapp/core'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import { DreamlandContext } from '../../contexts/DreamlandContext'
import { useDreamsContract } from '../hooks/DreamsContract'
import Dream from './Dream'
import DreamDetail from './DreamDetail'
import DreamsOwnerDashboard from './DreamsOwnerDashboard'
import MintDream from './MintDream'
import MintedDreams from './MintedDreams'
import SelectTile from './SelectTile'

export default function Dreamland() {
  const [saleIsActive, setsaleIsActive] = useState<boolean>()
  const [userIsOwner, setUserIsOwner] = useState<boolean>()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [maxSupply, setMaxSupply] = useState<BigNumber>()
  const [price, setPrice] = useState<BigNumber>()

  const { account } = useEthers()

  const { path, url } = useRouteMatch()

  const dreamsContract = useDreamsContract()

  useEffect(() => {
    if (!account) return
    dreamsContract.functions
      .owner()
      .then(res => setUserIsOwner(res[0] === account))
      .catch(e => console.log('Error getting owner', e))
  }, [account])

  useEffect(() => {
    dreamsContract.functions
      .totalSupply()
      .then(res => setTotalSupply(res[0]))
      .catch(e => console.log('Error getting total supply', e))
    dreamsContract.functions
      .saleIsActive()
      .then(res => setsaleIsActive(res[0]))
      .catch(e => console.log('Error getting saleIsActive', e))
    dreamsContract.functions
      .PRICE()
      .then(res => {
        console.log('price')
        setPrice(res[0])
      })
      .catch(e => console.log('Error getting price', e))
    dreamsContract.functions
      .MAX_SUPPLY()
      .then(res => setMaxSupply(res[0]))
      .catch(e => console.log('Error getting max supply', e))
  }, [])

  console.log('url', url, path)

  return (
    <DreamlandContext.Provider
      value={{
        totalSupply,
        maxSupply,
        saleIsActive,
        userIsOwner,
        price,
      }}
    >
      <div
        style={{
          paddingTop: 100,
          paddingBottom: 100,
          width: 960,
          maxWidth: '90vw',
          margin: '0 auto',
        }}
      >
        <Switch>
          <Route exact path={`${url}/owner`}>
            <DreamsOwnerDashboard />
          </Route>
          <Route exact path={`${url}/mint`}>
            <SelectTile />
          </Route>
          <Route exact path={`${url}/mint/:tile`}>
            <MintDream />
          </Route>
          <Route exact path={`${url}/:tile`}>
            <DreamDetail />
          </Route>
          <Route exact path={`${url}/id/:id`}>
            <DreamDetail />
          </Route>
          <Route exact path={`${url}`}>
            <MintedDreams />
          </Route>
        </Switch>
      </div>
    </DreamlandContext.Provider>
  )
}
