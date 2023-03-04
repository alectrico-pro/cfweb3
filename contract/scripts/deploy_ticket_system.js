// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const TicketSystem = await hre.ethers.getContractFactory("TicketSystem");
  const ticket_system = await TicketSystem.deploy("7000000000000000");
  await ticket_system.deployed();
  console.log("TicketSystem deployed to:", ticket_system.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("something went wrong")
    console.error(error);
    process.exit(1);
  });
