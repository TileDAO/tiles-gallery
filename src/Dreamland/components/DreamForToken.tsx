import { BigNumber } from '@ethersproject/bignumber'
import axios from 'axios'
import { CSSProperties, useEffect, useLayoutEffect, useState } from 'react'
import { useDreamsContract } from '../hooks/DreamsContract'

export default function DreamForToken({
  tokenId,
  onClickDream,
  dreamLink,
  style,
  renderDetails,
}: {
  tokenId: BigNumber | undefined
  onClickDream?: (address: string) => void
  dreamLink?: string
  style?: CSSProperties
  renderDetails?: (address: string, id: BigNumber) => string | JSX.Element
}) {
  const [URI, setURI] = useState<string>()
  const [data, setData] = useState<{ name: string; image: string }>()

  const contract = useDreamsContract()

  useEffect(() => {
    if (!tokenId || tokenId.eq(0)) return
    contract.functions
      .tokenURI(tokenId.toHexString())
      .then(res => {
        console.log('asdf', res)
        setURI(res[0])
      })
      .catch(e => console.log('Error getting tokenURI', e))
  }, [tokenId])

  useLayoutEffect(() => {
    if (!URI) return
    console.log('asdf', URI)
    axios
      .get(URI)
      .then(res => {
        console.log('asdf', res)
        setData(res.data)
      })
      .catch(e => console.log('asdf e', e))
  }, [URI])

  console.log('drmtok', data)

  if (!data) return null

  const elem = (
    <div style={{ textAlign: 'center' }}>
      <img
        style={{
          width: 100,
          height: 100,
          cursor: onClickDream ? 'cursor' : 'unset',
          ...style,
        }}
        src={data.image}
        onClick={() => onClickDream?.(data.name)}
      />
      {renderDetails && tokenId ? renderDetails(data.name, tokenId) : null}
    </div>
  )

  return dreamLink ? (
    <a href={dreamLink} style={{ textDecoration: 'none' }}>
      {elem}
    </a>
  ) : (
    elem
  )
}
