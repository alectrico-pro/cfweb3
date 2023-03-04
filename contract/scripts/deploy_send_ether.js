// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const SendEther = await hre.ethers.getContractFactory("SendEther");
  const send_ether = await SendEther.deploy();
  await send_ether.deployed();
  console.log("SendEther deployed to:", send_ether.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("something went wrong")
    console.error(error);
    process.exit(1);
  });
