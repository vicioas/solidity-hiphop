const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();
	const waveContractFactory = await hre.ethers.getContractFactory(
		"WavePortal"
	); //hre itself is hardhat object and will be exposed when executed with hardhat command.
	const waveContract = await waveContractFactory.deploy();
	await waveContract.deployed();

	console.log("Contract deployed to:", waveContract.address);
	console.log("Contract deployed by:", owner.address);

	let waveCount;
	waveCount = await waveContract.getTotalWaves();

	let waveTxn = await waveContract.wave();
	await waveTxn.wait();

	waveCount = await waveContract.getTotalWaves();

	waveTxn = await waveContract.connect(randomPerson).wave();
	await waveTxn.wait();

	waveCount = await waveContract.getTotalWaves();

    walletAddresses = await waveContract.getWalletAddresses();
    console.log(walletAddresses)
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
