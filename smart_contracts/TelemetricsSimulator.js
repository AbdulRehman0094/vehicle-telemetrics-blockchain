const { Web3 } = require('web3');
const { abi: contractABI } = require('./build/contracts/VehicleTelemetrics.json');
const contractAddress = '0x591D8c585558b2cCa052A9B8e042d3EffA379deA';

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

async function getAllVehicles() {
    return await vehicleTelemetricsContract.methods.getAllVehicles().call();
}

async function isAddressValid(address) {
    if (!Web3.utils.isAddress(address)) {
        return false;
    }
    const balance = await web3.eth.getBalance(address);
    return balance !== '0';
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
    while (true) {
        const vehicles = await getAllVehicles();
        const fromTime = Math.floor(Date.now() / 1000);
        await wait(60000);
        const toTime = Math.floor(Date.now() / 1000);
        console.log(vehicles);
        for (let i = 0; i < vehicles.length; i++) {
            const vehicle = vehicles[i];
            console.log(fromTime, toTime);
            console.log(await addTelemetricData(vehicle.id, fromTime, toTime, 50, 120, vehicle.owner));
        }
    }
})();