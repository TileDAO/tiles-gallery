import './index.css'

import { ChainId, Config, DAppProvider } from '@usedapp/core'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import reportWebVitals from './reportWebVitals'

const infuraId = '643e4d7aeffa4bd1b56c33e0c99b7604'

export const networkConfig: Config = {
  readOnlyChainId: parseInt(
    process.env.REACT_APP_READONLY_CHAIN_ID || '31337',
  ) as ChainId,
  // readOnlyChainId: ChainId.Localhost,
  // readOnlyChainId: 31337,
  readOnlyUrls: {
    31337: 'http://localhost:8545',
    [ChainId.Localhost]: 'http://localhost:8545',
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/' + infuraId,
  },
  multicallAddresses: {
    31337: 'http://localhost:8545',
    [ChainId.Localhost]: 'http://localhost:8545',
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/' + infuraId,
  },
  supportedChains: [31337, ChainId.Localhost, ChainId.Mainnet],
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
