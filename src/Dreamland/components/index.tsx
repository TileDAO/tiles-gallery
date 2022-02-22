import { useEthers } from '@usedapp/core'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import { DreamsContext } from '../../contexts/DreamsContext'
import { useDreamsContract } from '../hooks/DreamsContract'
import DreamDetail from './DreamDetail'
import DreamsOwnerDashboard from './DreamsOwnerDashboard'
import FAQ from './FAQ'
import Landing from './Landing'
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

  const { url, isExact } = useRouteMatch()

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
      .then(res => setPrice(res[0]))
      .catch(e => console.log('Error getting price', e))
    dreamsContract.functions
      .MAX_SUPPLY()
      .then(res => setMaxSupply(res[0]))
      .catch(e => console.log('Error getting max supply', e))
  }, [])

  return (
    <DreamsContext.Provider
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
        <div style={{ marginBottom: 100 }} hidden={!isExact}>
          <Landing />
        </div>

        <div style={{ marginBottom: 40 }}>
          <div>
            <a
              className="text-link"
              href="/#/dreamland"
              style={{ fontWeight: 'bold' }}
            >
              {totalSupply?.toString()}/{maxSupply?.toString()} Dreams minted
            </a>{' '}
            {price && <>// price: {formatEther(price)} ETH</>}
          </div>
        </div>

        {saleIsActive ? (
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
            <Route exact path={`${url}/faq`}>
              <FAQ />
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
        ) : (
          <div>Sale has not started</div>
        )}
      </div>
    </DreamsContext.Provider>
  )
}
