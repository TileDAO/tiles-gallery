export const dreamsAddress = {
  1: '0xc6fBd19df15f6258Ec591F1342c18585A2eE54fB',
  4: '0x5d90aE167cD46a1BbBA205b4ab470f710a4C697d',
  // 4: '0x9A9c83E0A758B946bC6781cd79Bd1e31fB9A63D1',
}[process.env.REACT_APP_READONLY_CHAIN_ID as string] as string
