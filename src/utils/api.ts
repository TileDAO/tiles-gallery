export const tilesUrl = (address: string) =>
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:9600'
    : 'https://api.tiles.art') +
  '/tile/' +
  address
