const hre = require("hardhat");

async function main() {
  const WhiteList = await hre.ethers.getContractFactory("WhiteList");
  const whiteList = await WhiteList.deploy(10);

  await whiteList.deployed();

  console.log("white list contract deployed to:", whiteList.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
