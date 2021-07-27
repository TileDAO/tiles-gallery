import { useContractFunction, useEthers } from '@usedapp/core'
import { BigNumber, utils } from 'ethers'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useTilesContract } from '../hooks/TilesContract'
import Tile from './Tile'

export default function Detail({
  saleIsActive,
  isArtist,
  price,
}: {
  saleIsActive?: boolean
  isArtist?: boolean
  price?: BigNumber
}) {
  const [reserveReceiver, setReserveReceiver] = useState<string>()
  const [tokenId, setTokenId] = useState<BigNumber>()
  const [owner, setOwner] = useState<string>()
  const { account } = useEthers()

  const contract = useTilesContract()

  const { address } = useParams<{ address: string }>()

  const { state: mintState, send: mint } = useContractFunction(
    contract as any,
    'mintTile',
  )
  const { send: mintReserve } = useContractFunction(
    contract as any,
    'mintReserveTile',
  )

  const owned = tokenId?.gt(0)

  useEffect(() => {
    if (address && !utils.isAddress(address.toLowerCase()))
      window.location.hash = '/'
  }, [address])

  useLayoutEffect(() => {
    contract.functions
      .idOfAddress(address)
      .then(res => setTokenId(res[0] as BigNumber))
  }, [address])

  useLayoutEffect(() => {
    if (!tokenId || tokenId.eq(0)) return

    contract.functions
      .ownerOf(tokenId.toHexString())
      .then(res => setOwner(res[0]))
  }, [tokenId])

  const _mint = async (reserve?: boolean) => {
    if (!address) return

    reserve
      ? mintReserve(reserveReceiver, address)
      : mint(address, {
          value: price?.toHexString(),
        })
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 800, paddingTop: 40, paddingBottom: 40 }}>
        <Tile address={address} />

        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <div style={{ marginBottom: 20 }}>
            {address.startsWith('0x') ? '' : '0x'}
            {address}
          </div>
          {saleIsActive === false ? (
            <div>
              Sale starts July 16 3pm ET
              {isArtist && (
                <div style={{ marginTop: 20 }}>
                  {owned ? (
                    <div>Reserved for {owner}</div>
                  ) : (
                    <div>
                      <div>mint reserve to:</div>
                      <input
                        style={{ width: 360, textAlign: 'center' }}
                        onChange={e => setReserveReceiver(e.target.value)}
                      />
                      <div style={{ textAlign: 'center', marginTop: 10 }}>
                        <span className="btn" onClick={() => _mint(true)}>
                          MINT
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : owned ? (
            <span style={{ opacity: 0.4 }}>Owned by {owner}</span>
          ) : (
            <div>
              <div style={{ marginBottom: 30 }}>Available</div>
              {mintState.status === 'Mining' ? (
                'Waiting...'
              ) : (
                <div style={{ padding: 5 }}>
                  {account ? (
                    <span className="btn" onClick={() => _mint()}>
                      BUY (
                      {price && parseFloat(utils.formatUnits(price.toString()))}{' '}
                      ETH)
                    </span>
                  ) : (
                    'Connect wallet to mint'
                  )}

                  <div>
                    {mintState.errorMessage && (
                      <div>{mintState.errorMessage}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, right: 0, padding: 10 }}>
        <a
          href={'https://api.tiles.art/png/' + address + '?scale=5'}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download PNG
        </a>
      </div>
    </div>
  )
}
