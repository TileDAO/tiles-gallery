import { CSSProperties, useEffect, useState } from 'react'

import Tile from './shared/Tile'

const chars = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
]

function randChar() {
  return chars[Math.floor(Math.random() * chars.length)]
}

export default function Phaser({ tileStyle }: { tileStyle?: CSSProperties }) {
  const [address, setAddress] = useState<string>()

  useEffect(() => {
    let newAddress = ''

    for (let i = 0; i < 40; i++) {
      newAddress += randChar()
    }

    setAddress(newAddress)

    const interval = setInterval(() => {
      let addressArr = newAddress.split('')

      for (let i = 0; i < 3; i++) {
        const index = Math.floor(Math.random() * 40)
        addressArr[index] = randChar()
      }

      newAddress = addressArr.join('')
      setAddress(newAddress)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ textAlign: 'center', paddingTop: 15 }}>
      <Tile address={address} style={tileStyle} />
      0x{address}
    </div>
  )
}
