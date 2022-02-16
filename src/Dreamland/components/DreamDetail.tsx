import { BigNumber } from 'ethers'
import { useParams } from 'react-router-dom'

import DreamForToken from './DreamForToken'

export default function DreamDetail() {
  const { id } = useParams<{ id: string }>()

  if (!id) return null

  return (
    <div>
      <DreamForToken tokenId={BigNumber.from(id)} />
    </div>
  )
}
