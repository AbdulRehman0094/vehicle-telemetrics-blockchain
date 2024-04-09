const VehicleTelemetrics = artifacts.require("VehicleTelemetrics");

module.exports = async function (deployer) {
    await deployer.deploy(VehicleTelemetrics);
};
