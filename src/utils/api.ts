export const tileSvgUrl = (address: string) =>
  process.env.REACT_APP_TILE_API_URL +
  '/svg/' +
  address.toLowerCase() +
  '?color=true'

export const tilePngUrl = (address: string) =>
  process.env.REACT_APP_TILE_API_URL + '/png/' + address.toLowerCase()

export const glyphSvgUrl = (address: string, color?: boolean) =>
  process.env.REACT_APP_GLYPH_API_URL +
  '/svg/' +
  address.toLowerCase() +
  (color ? '?color=true' : '')

export const dreamPngUrl = (address: string) =>
  process.env.REACT_APP_DREAMLAND_API_URL + '/img/' + address.toLowerCase()
