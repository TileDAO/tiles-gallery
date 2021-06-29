require('hardhat-deploy')
require('hardhat-deploy-ethers')

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: [
        {
          privateKey:
            'c6cbd7d76bc5baca530c875663711b947efa6a86a900a9e8645ce32e5821484e',
          balance: '1000000000000000000000',
        },
      ],
    },
    localhost: {
      url: 'http://localhost:8545',
    },
  },
  solidity: {
    version: '0.8.0',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: 0,
    dev: 1,
    fee: 2,
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20000,
  },
}
