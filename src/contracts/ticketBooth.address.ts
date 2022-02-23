export const ticketBoothAddress = {
  1: '0xee2eBCcB7CDb34a8A822b589F9E8427C24351bfc',
  4: '0x0d038636a670E8bd8cF7D56BC4626f2a6446cF11',
}[process.env.REACT_APP_READONLY_CHAIN_ID as string] as string
