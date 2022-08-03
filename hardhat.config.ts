import { HardhatUserConfig } from 'hardhat/config'
import '@nomiclabs/hardhat-waffle'
// import * as fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config()

const API_URL = process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_URL
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY

// const privateKey = fs.readFileSync('.secret').toString().trim()

const config: HardhatUserConfig = {
  defaultNetwork: 'goerli',
  networks: {
    goerli: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: '0.8.15'
}

export default config

// hardhat: {
//   chainId: 1337
// }
