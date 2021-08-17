import { useEthers } from '@usedapp/core'
import { utils } from 'ethers'
import { useLayoutEffect, useState } from 'react'

export default function FormattedAddress({
  address,
}: {
  address: string | undefined
}) {
  const { library } = useEthers()
  const [ensName, setEnsName] = useState<string>()

  useLayoutEffect(() => {
    if (!library) return

    const read = async () => {
      if (
        address?.toLowerCase() ===
        '0x64931F06d3266049Bf0195346973762E6996D764'.toLowerCase()
      ) {
        setEnsName('tiledao.eth')
        return
      }

      if (!address || !utils.isAddress(address)) {
        setEnsName(undefined)
        return
      }

      try {
        const name = await library.lookupAddress(address)

        if (!name) return

        // Reverse lookup to check validity
        const isValid =
          (await (await library.resolveName(name)).toLowerCase()) ===
          address.toLowerCase()

        if (isValid) setEnsName(name)
      } catch (e) {
        console.log('Error looking up ENS name for address', address, e)
      }
    }

    read()
  }, [library, address])

  if (!address) return null

  return (
    <span className="address-container" style={{ position: 'relative' }}>
      {ensName ?? address}
      <div style={{ borderTop: '5px solid transparent' }}>
        <div
          className="address"
          style={{ fontWeight: 400, lineHeight: 1.5 }}
          onClick={e => e.stopPropagation()}
        >
          {ensName && (
            <div
              onClick={e => e.stopPropagation()}
              style={{ userSelect: 'all', cursor: 'crosshair' }}
            >
              {address}
            </div>
          )}
          <div>
            <a style={{ marginRight: 10 }} href={`/#/wallet/${address}`}>
              Tiles
            </a>
            |
            <a
              style={{ marginLeft: 10 }}
              href={`https://etherscan.io/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Etherscan
            </a>
          </div>
        </div>
      </div>
    </span>
  )
}
