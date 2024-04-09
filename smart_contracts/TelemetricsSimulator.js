const { Web3 } = require('web3');
const { abi: contractABI } = require('./build/contracts/VehicleTelemetrics.json');
const contractAddress = '0x291485Bf3dF31DBEF5dBcE8f87F7F048554B8ea1';

const web3 = new Web3('http://127.0.0.1:9545/');
const vehicleTelemetricsContract = new web3.eth.Contract(contractABI, contractAddress);


async function addVehicle(registrationNumber, make, model, variant, price, forSale, totalKilometers, milage, ownerAddress) {
    return await vehicleTelemetricsContract.methods.addVehicle(
        registrationNumber, make, model, variant, price, forSale, totalKilometers, milage
    ).send({ from: ownerAddress, gas: 300000 });
}

async function addTelemetricData(vehicleId, fromTimestamp, toTimestamp, fromSpeed, toSpeed, ownerAddress) {
    return await vehicleTelemetricsContract.methods.addTelemetricData(
        vehicleId, fromTimestamp, toTimestamp, fromSpeed, toSpeed
    ).send({ from: ownerAddress, gas: 300000 });
}

async function setForSale(vehicleId, forSale, ownerAddress) {
    return await vehicleTelemetricsContract.methods.setForSale(vehicleId, forSale).send({ from: ownerAddress, gas: 300000 });
}

async function buyVehicle(vehicleId, value, ownerAddress) {
    return await vehicleTelemetricsContract.methods.buyVehicle(vehicleId).send({ from: ownerAddress, value: value, gas: 300000 });
}

async function getVehiclesByOwnerAddress(ownerAddress) {
    return await vehicleTelemetricsContract.methods.getVehiclesByOwnerAddress(ownerAddress).call();
}

async function getForSaleVehicles() {
    return await vehicleTelemetricsContract.methods.getForSaleVehicles().call();
}

(async () => {
    const accounts = await web3.eth.getAccounts();
    const currentTime = Date.now();

    // Subtract 10 minutes in milliseconds
    const tenMinutesEarlier = currentTime - 10 * 60 * 1000;

    // Convert to seconds (Unix timestamp)
    const currentTimeInSeconds = Math.floor(currentTime / 1000);
    const tenMinutesEarlierInSeconds = Math.floor(tenMinutesEarlier / 1000);

    console.log("Current Time:", currentTimeInSeconds);
    console.log("10 Minutes Earlier:", tenMinutesEarlierInSeconds);
    // console.log(await addTelemetricData(1, tenMinutesEarlierInSeconds, currentTimeInSeconds, 50, 120, accounts[0]));






    // console.log(await addVehicle("ABC123", "Toyota", "Corolla", "XLi", 5000, true, 100000, 10, accounts[1]));

    // console.log(await addTelemetricData(1, 1634812800, 1634816400, 50, 120, accounts[0]));

    // console.log(setForSale(1, true, accounts[0]));

    // console.log(buyVehicle(1, 5000, accounts[1]));

    // const ownerVehicles = await getVehiclesByOwnerAddress(accounts[0]);
    // console.log("Owner Vehicles:", ownerVehicles);

    // const forSaleVehicles = await getForSaleVehicles();
    // console.log("For Sale Vehicles:", forSaleVehicles);
})();


