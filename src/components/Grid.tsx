export default function Grid({
  cols,
  items,
}: {
  cols?: 1 | 3
  items: JSX.Element[] | undefined
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridGap: cols === 1 ? 100 : 60,
        margin: '0 auto',
        ...(window.innerWidth > 960
          ? {
              gridTemplateColumns: cols === 1 ? '1fr' : 'repeat(3, 1fr)',
              maxWidth: cols === 1 ? 900 : 960,
            }
          : { gridTemplateColumns: '1fr', gridGap: 60 }),
      }}
    >
      {items}
    </div>
  )
}
