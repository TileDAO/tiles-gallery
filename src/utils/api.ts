export const tileSvgUrl = (address: string) =>
  process.env.REACT_APP_TILE_API_URL +
  '/svg/' +
  address.toLowerCase() +
  '?color=true'

export const glyphSvgUrl = (address: string, color?: boolean) =>
  process.env.REACT_APP_GLYPH_API_URL +
  '/svg/' +
  address.toLowerCase() +
  (color ? '?color=true' : '')
