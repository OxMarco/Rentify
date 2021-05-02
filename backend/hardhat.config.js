require("@nomiclabs/hardhat-waffle");
const GOERLI_PRIVATE_KEY = fs.readFileSync(".goerli_secret").toString().trim();
const MATIC_PRIVATE_KEY = fs.readFileSync(".matic_secret").toString().trim();

// Choose "goerli" or "matic"
const DEFAULT_NETWORK = "goerli";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: DEFAULT_NETWORK,
    networks: {
        goerli: {
            url: "https://goerli.infura.io/v3/ee56c2ce91d1434a8cfb71e6619829d1",
            accounts: [GOERLI_PRIVATE_KEY]
        },
        matic: {
            url: "https://rpc-mumbai.maticvigil.com",
            accounts: [MATIC_PRIVATE_KEY]
          }
    },
    solidity: {
        version: "0.7.3",
        settings: {
            optimizer: {
                enabled: false,
                runs: 200
            }
        }
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    mocha: {
        timeout: 20000
    }
}
