import { useEthers } from '@usedapp/core'
import { BigNumber } from 'ethers'
import { useLayoutEffect, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Artist from './components/Artist'
import Dao from './components/Dao'
import FAQ from './components/FAQ'
import Gallery from './components/Gallery'
import Glyphs from './components/Glyphs'
import Manifesto from './components/Manifesto'
import Minted from './components/Minted'
import Navbar from './components/Navbar'
import Prices from './components/Prices'
import Detail from './components/shared/Detail'
import Treasury from './components/Treasury'
import Wallet from './components/Wallet'
import { TilesContext } from './contexts/TilesContext'
import { useTilesContract } from './hooks/TilesContract'


function App() {
  const { account } = useEthers()
  const [saleIsActive, setsaleIsActive] = useState<boolean>()
  const [userIsArtist, setUserIsArtist] = useState<boolean>()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [currentPrice, setCurrentPrice] = useState<BigNumber>()

  const contract = useTilesContract()

  useLayoutEffect(() => {
    if (!account) return
    contract.functions
      .owner()
      .then(res => setUserIsArtist(res[0] === account))
      .catch(e => console.log('Error getting owner', e))
  }, [account])

  useLayoutEffect(() => {
    contract.functions
      .totalSupply()
      .then(res => setTotalSupply(res[0]))
      .catch(e => console.log('Error getting totalSupply()', e))
    contract.functions
      .saleIsActive()
      .then(res => setsaleIsActive(res[0]))
      .catch(e => console.log('Error getting saleIsActive', e))
    contract.functions
      .calculatePrice()
      .then(res => setCurrentPrice(res[0]))
      .catch(e => console.log('Error getting calculatePrice', e))
  }, [])

  return (
    <TilesContext.Provider
      value={{
        userIsArtist,
        totalSupply,
        currentPrice,
        saleIsActive,
      }}
    >
      <div style={{ width: '100vw', height: '100vh', cursor: 'crosshair' }}>
        <div style={{ width: '100%', maxWidth: 1400, margin: '0 auto' }}>
          <Navbar />
          <HashRouter>
            <Switch>
              <Route exact path="/">
                <Gallery />
              </Route>
              <Route exact path="/glyphs">
                <Glyphs />
              </Route>
              <Route exact path="/minted">
                <Minted />
              </Route>
              <Route exact path="/artist">
                <Artist saleIsActive={saleIsActive} />
              </Route>
              <Route exact path="/prices">
                <Prices />
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
              <Route path="/id/:id">
                <Detail />
              </Route>
              <Route path="/:address">
                <Detail />
              </Route>
            </Switch>
          </HashRouter>
        </div>
      </div>
    </TilesContext.Provider>
  )
}

export default App
