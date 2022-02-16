import { BigNumber } from '@ethersproject/bignumber'
import { createContext } from 'react'

export const DreamlandContext: React.Context<{
  totalSupply?: BigNumber
  maxSupply?: BigNumber
  saleIsActive?: boolean
  userIsOwner?: boolean
  price?: BigNumber
}> = createContext({})
