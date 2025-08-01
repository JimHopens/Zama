const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const lockedAmount = ethers.parseEther("0.001");

  const unlockTime = Math.floor(Date.now() / 1000) + 60;

  const Lock = await ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  await Lock.waitForDeployment();

  console.log(`Lock with 0.001 ETH and unlock timestamp deployed to ${Lock.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
