import './index.css'

import { ChainId, Config, DAppProvider } from '@usedapp/core'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import reportWebVitals from './reportWebVitals'

const config: Config = {
  readOnlyChainId: ChainId.Localhost,
  readOnlyUrls: {
    [ChainId.Localhost]: 'http://localhost:8545',
    [ChainId.Ropsten]:
      'https://ropsten.infura.io/v3/62687d1a985d4508b2b7a24827551934',
    [ChainId.Mainnet]:
      'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
  },
  multicallAddresses: {
    [ChainId.Localhost]: 'http://localhost:8545',
    [ChainId.Ropsten]:
      'https://ropsten.infura.io/v3/62687d1a985d4508b2b7a24827551934',
  },
  supportedChains: [ChainId.Localhost, ChainId.Ropsten],
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
