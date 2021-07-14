export default function Prices() {
  const row = (range: string, price: number) => (
    <div
      style={{
        width: 300,
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}
    >
      <span>{range}</span>
      <span>{price} ETH</span>
    </div>
  )

  return (
    <div>
      <div
        style={{
          margin: '0 auto',
          marginTop: '20vh',
          paddingBottom: 80,
        }}
      >
        <div style={{ maxWidth: 300, margin: '0 auto' }}>
          <h4 style={{ textAlign: 'center' }}>Tile pricing</h4>
          <div>{row('1 - 200', 0.01)}</div>
          <div>{row('201 - 400', 0.02)}</div>
          <div>{row('401 - 800', 0.04)}</div>
          <div>{row('801 - 1,600', 0.08)}</div>
          <div>{row('1,601 - 3,200', 0.16)}</div>
          <div>{row('3,201 - 6,400', 0.32)}</div>
          <div>{row('6,401 - 12,800', 0.64)}</div>
          <div>{row('12,801 - 25,600', 1.28)}</div>
          <div>{row('25,601 - 51,200', 2.56)}</div>
          <div>{row('51,201 - 102,400', 5.12)}</div>
          <div>{row('102,401 +', 10.24)}</div>
        </div>
      </div>
    </div>
  )
}
