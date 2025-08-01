const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  // Явно подгружаем ABI из artifacts
  const abi = require("../artifacts/contracts/Lock.sol/Lock.json").abi;

  const lock = new ethers.Contract(contractAddress, abi, deployer);

  // Чтение значения
  const unlockTime = await lock.unlockTime();
  console.log("Unlock time:", new Date(unlockTime * 1000).toLocaleString());

  try {
    const tx = await lock.withdraw();
    await tx.wait();
    console.log("Withdraw successful!");
  } catch (err) {
    console.log("Withdraw failed:", err.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
