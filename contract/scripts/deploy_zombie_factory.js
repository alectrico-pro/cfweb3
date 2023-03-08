// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const Contrato = await hre.ethers.getContractFactory("ZombieFactory"); 
  const gasPrice = await Contrato.signer.getGasPrice();
	
  console.log(`Current gas price: ${gasPrice}`);

  const estimatedGas = await Contrato.signer.estimateGas(
    Contrato.getDeployTransaction(),
  );
  console.log(`Estimated gas: ${estimatedGas}`);

  const deploymentPrice = gasPrice.mul(estimatedGas);
  const deployerBalance = await Contrato.signer.getBalance();
  console.log(`Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`);
  console.log(`Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`);
  if (deployerBalance.lt(deploymentPrice)) {
    throw new Error(
      `Insufficient funds. Top up your account balance by ${ethers.utils.formatEther(
        deploymentPrice.sub(deployerBalance),
      )}`,
    );
  }
//const contrato = await Contrato.deploy();
  await contrato.deployed();
  console.log("Contrato deployed to:", contrato.address);
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
