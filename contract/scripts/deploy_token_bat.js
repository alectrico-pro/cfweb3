// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const TokenBat = await hre.ethers.getContractFactory("TokenBat");
  const token_bat = await TokenBat.deploy();
  await token_bat.deployed();
  console.log("TokenBat deployed to:", token_bat.address);
  await token_bat.setPriceToMint(7000000000000000);
  console.log("Price set to 7000000000000000 wei");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("something went wrong")
    console.error(error);
    process.exit(1);
  });
