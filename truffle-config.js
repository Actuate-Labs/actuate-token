const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config()

const { PROJECT_ID, PROJECT_ID_MAIN, MNEMONIC } = process.env

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 5000000
    },
    
    // sepolia network
    sepolia: {
      networkCheckTimeout: 10000,
      // networkCheckTimeout: 120000,
      provider: () => new HDWalletProvider(MNEMONIC, `https://eth-sepolia.g.alchemy.com/v2/${PROJECT_ID}`),
      network_id: 11155111,       // sepolia's id
      // confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },


    // mainnet network
    mainnet: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://eth-mainnet.alchemyapi.io/v2/${PROJECT_ID_MAIN}`),
      network_id: 1,       // Mainnet's id
      confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }
  },
  compilers: {
    solc: {
      version: "0.8.13",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    }
  }
};
