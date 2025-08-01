// scripts/interact.js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Адрес ранее задеплоенного контракта Lock
  const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

  // Подключаемся к контракту Lock
  const Lock = await ethers.getContractFactory("Lock");
  const lock = Lock.attach(contractAddress);

  // Чтение значения
  const unlockTime = await lock.unlockTime();
  console.log("Unlock time:", new Date(unlockTime * 1000).toLocaleString());

  // Попытка разблокировки (если время пришло)
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
