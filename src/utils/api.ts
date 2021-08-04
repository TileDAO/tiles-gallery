export const svgUrl = (address: string) =>
  process.env.REACT_APP_API_URL + '/svg/' + address.toLowerCase()
