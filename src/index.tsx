import './index.css'

import { ChainId, Config, DAppProvider } from '@usedapp/core'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import reportWebVitals from './reportWebVitals'

export const networkConfig: Config = {
  // readOnlyChainId: ChainId.Localhost,
  readOnlyChainId: ChainId.Kovan,
  // readOnlyChainId: 31337,
  readOnlyUrls: {
    31337: 'http://localhost:8545',
    [ChainId.Localhost]: 'http://localhost:8545',
    [ChainId.Kovan]:
      'https://kovan.infura.io/v3/0e8a1922865f444683f5d0507139d739',
    [ChainId.Mainnet]:
      'https://mainnet.infura.io/v3/0e8a1922865f444683f5d0507139d739',
  },
  multicallAddresses: {
    31337: 'http://localhost:8545',
    [ChainId.Localhost]: 'http://localhost:8545',
    [ChainId.Kovan]:
      'https://kovan.infura.io/v3/0e8a1922865f444683f5d0507139d739',
    [ChainId.Mainnet]:
      'https://mainnet.infura.io/v3/0e8a1922865f444683f5d0507139d739',
  },
  supportedChains: [31337, ChainId.Localhost, ChainId.Kovan, ChainId.Mainnet],
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
