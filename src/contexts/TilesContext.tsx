import { BigNumber } from '@ethersproject/bignumber'
import { createContext } from 'react'

export const TilesContext: React.Context<{
  totalSupply?: BigNumber
  currentPrice?: BigNumber
  saleIsActive?: boolean
  userIsArtist?: boolean
}> = createContext({})
