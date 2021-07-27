import { BigNumber } from '@ethersproject/bignumber'

export default function Navbar() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <a
          className="bland"
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <img style={{ width: 24, height: 24 }} src="assets/logo.svg" />
        </a>
      </div>
    </div>
  )
}
