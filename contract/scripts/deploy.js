// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const CFNFT = await hre.ethers.getContractFactory("CFNFT");
  const cfnft = await CFNFT.deploy();
  await cfnft.deployed();
  console.log("CFNFT deployed to:", cfnft.address);


  const TokenBat = await hre.ethers.getContractFactory("TokenBat");
  const token_bat = await TokenBat.deploy();
  await token_bat.deployed();
  console.log("TokenBat deployed to:", token_bat.address);

  const ZombieFactory = await hre.ethers.getContractFactory("ZombieFactory");
  const zombie_factory = await ZombieFactory.deploy();
  await zombie_factory.deployed();
  console.log("ZombieFactory deployed to:", zombie_factory.address);

  const ZombieElectrico = await hre.ethers.getContractFactory("ZombieElectrico");
  const zombie_electrico = await ZombieElectrico.deploy();
  await zombie_electrico.deployed();
  console.log("ZombieElectrico deployed to:", zombie_electrico.address);

  const RondaFactory = await hre.ethers.getContractFactory("RondaFactory");
  const ronda_factory = await RondaFactory.deploy();
  await ronda_factory.deployed();
  console.log("RondaFactory deployed to:", ronda_factory.address);


  const BatteryFactory = await hre.ethers.getContractFactory("BatteryFactory");
  const battery_factory = await BatteryFactory.deploy();
  await battery_factory.deployed();
  console.log("BatteryFactory deployed to:", battery_factory.address);

  const TokenCreation = await hre.ethers.getContractFactory("TokenCreation");
  const token_creation = await TokenCreation.deploy();
  await token_creation.deployed();
  console.log("TokenCreation deployed to:", token_creation.address);

  const SendEther= await hre.ethers.getContractFactory("SendEther");
  const send_ether = await SendEther.deploy();
  await send_ether.deployed();
  console.log("SendEther deployed to:", send_ether.address);

  const ReceiveEther= await hre.ethers.getContractFactory("ReceiveEther");
  const receive_ether = await ReceiveEther.deploy();
  await receive_ether.deployed();
  console.log("ReceiveEther deployed to:", receive_ether.address);

  const TicketSystem = await hre.ethers.getContractFactory("TicketSystem");
  const ticket_system = await TicketSystem.deploy(100);
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
