/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");

const pk = process.env.dapk

module.exports = {
  solidity:
   {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },	   
  paths: {
	  artifacts: './artifacts',
  },
  networks: {
    backend: {
      url: "http://nodo:8545",
      chainId: 1337
    },
    localhost: {
      chainId: 1337
    },
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: "https://goerli.infura.io/v3/afd9719a56c3484fbabce83eef19b22c",
      accounts: [`0x${pk}`] 
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/5707a1c75350408cb408cba40175e252",
      accounts: [`0x${pk}`],
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY
  },
};
