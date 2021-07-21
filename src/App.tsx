import { useEthers } from '@usedapp/core'
import { BigNumber } from 'ethers'
import { useLayoutEffect, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Artist from './components/Artist'
import Dao from './components/Dao'
import Detail from './components/Detail'
import FAQ from './components/FAQ'
import Gallery from './components/Gallery'
import Manifesto from './components/Manifesto'
import Navbar from './components/Navbar'
import Prices from './components/Prices'
import Treasury from './components/Treasury'
import Wallet from './components/Wallet'
import { useTilesContract } from './hooks/TilesContract'

function App() {
  const { account } = useEthers()
  const [saleIsActive, setsaleIsActive] = useState<boolean>()
  const [isArtist, setIsArtist] = useState<boolean>()
  const [price, setPrice] = useState<BigNumber>()

  const contract = useTilesContract()

  useLayoutEffect(() => {
    if (!account) return
    contract.functions.owner().then(res => setIsArtist(res[0] === account))
  }, [account])

  useLayoutEffect(() => {
    contract.functions.saleIsActive().then(res => setsaleIsActive(res[0]))
    contract.functions.calculatePrice().then(res => setPrice(res[0]))
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', cursor: 'crosshair' }}>
      <div style={{ width: '100%', maxWidth: 1400, margin: '0 auto' }}>
        <Navbar price={price} saleIsActive={saleIsActive} />
        <HashRouter>
          <Switch>
            <Route exact path="/">
              <Gallery />
            </Route>
            <Route exact path="/artist">
              <Artist saleIsActive={saleIsActive} />
            </Route>
            <Route exact path="/prices">
              <Prices salePrice={price} />
            </Route>
            <Route exact path="/manifesto">
              <Manifesto />
            </Route>
            <Route exact path="/dao">
              <Dao />
            </Route>
            <Route exact path="/treasury">
              <Treasury />
            </Route>
            <Route exact path="/faq">
              <FAQ />
            </Route>
            <Route exact path="/wallet/:address">
              <Wallet />
            </Route>
            <Route path="/:address">
              <Detail
                price={price}
                isArtist={isArtist}
                saleIsActive={saleIsActive}
              />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    </div>
  )
}

export default App
