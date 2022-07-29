import { HardhatUserConfig } from 'hardhat/config'
import '@nomiclabs/hardhat-waffle'
import * as fs from 'fs'

const privateKey = fs.readFileSync('.secret').toString().trim()

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337
    }
  },
  solidity: '0.8.15'
}

export default config
