import './index.css'

import { ChainId, Config, DAppProvider } from '@usedapp/core'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import reportWebVitals from './reportWebVitals'

const infuraId = process.env.REACT_APP_INFURA_ID

export const networkConfig: Config = {
  readOnlyChainId: parseInt(
    process.env.REACT_APP_READONLY_CHAIN_ID || '31337',
  ) as ChainId,
  readOnlyUrls: {
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/' + infuraId,
  },
  multicallAddresses: {
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/' + infuraId,
  },
  supportedChains: [ChainId.Mainnet],
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={networkConfig}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
