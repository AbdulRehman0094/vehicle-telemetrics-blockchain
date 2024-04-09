// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VehicleTelemetrics {
    struct TelemetricData {
        uint256 fromTimestamp;
        uint256 toTimestamp;
        uint256 fromSpeed;
        uint256 toSpeed;
        uint256 vehicleId;
    }

    struct Vehicle {
        uint256 id;
        string registrationNumber;
        string make;
        string model;
        string variant;
        uint256 price;
        address owner;
        bool forSale;
        uint256 totalKilometers;
        uint256 totalLiters;
        uint256 milage;
    }

    mapping(uint256 => Vehicle) public vehicles;
    uint256 public vehicleCount;

    mapping(uint256 => TelemetricData) public telemetricData;
    uint256 public telemetricCount;

    event VehicleSold(
        address indexed previousOwner,
        address indexed newOwner,
        uint256 vehicleId
    );

    modifier onlyOwner(uint256 _vehicleId) {
        require(
            msg.sender == vehicles[_vehicleId].owner,
            "Only the owner can perform this action"
        );
        _;
    }

    function addVehicle(
        string memory _registrationNumber,
        string memory _make,
        string memory _model,
        string memory _variant,
        uint256 _price,
        bool _forSale,
        uint256 _totalKilometers,
        uint256 _milage
    ) external {
        vehicleCount++;
        vehicles[vehicleCount] = Vehicle({
            id: vehicleCount,
            registrationNumber: _registrationNumber,
            make: _make,
            model: _model,
            variant: _variant,
            price: _price,
            owner: msg.sender,
            forSale: _forSale,
            totalKilometers: _totalKilometers,
            totalLiters: _totalKilometers / _milage,
            milage: _milage
        });
    }

    function addTelemetricData(
        uint256 _vehicleId,
        uint256 _fromTimestamp,
        uint256 _toTimestamp,
        uint256 _fromSpeed,
        uint256 _toSpeed
    ) external onlyOwner(_vehicleId) {
        require(_fromTimestamp < _toTimestamp, "Invalid timestamps");
        telemetricCount++;
        telemetricData[telemetricCount] = TelemetricData({
            fromTimestamp: _fromTimestamp,
            toTimestamp: _toTimestamp,
            fromSpeed: _fromSpeed,
            toSpeed: _toSpeed,
            vehicleId: _vehicleId
        });

        uint256 timeDifference = _toTimestamp - _fromTimestamp;
        uint256 distanceTraveled = ((_fromSpeed + _toSpeed) / 2) *
            timeDifference;
        vehicles[_vehicleId].totalKilometers += distanceTraveled;
    }

    function setForSale(
        uint256 _vehicleId,
        bool _forSale
    ) external onlyOwner(_vehicleId) {
        vehicles[_vehicleId].forSale = _forSale;
    }

    function buyVehicle(uint256 _vehicleId) external payable {
        require(vehicles[_vehicleId].forSale, "Vehicle is not for sale");
        require(msg.value > 0, "Invalid payment");
        require(msg.value >= vehicles[_vehicleId].price, "Invalid payment");

        address payable previousOwner = payable(vehicles[_vehicleId].owner);
        address payable newOwner = payable(msg.sender);
        previousOwner.transfer(msg.value);
        vehicles[_vehicleId].owner = msg.sender;
        vehicles[_vehicleId].forSale = false;
        emit VehicleSold(previousOwner, newOwner, _vehicleId);
    }

    function getVehiclesByOwnerAddress(
        address _owner
    ) external view returns (Vehicle[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= vehicleCount; i++) {
            if (vehicles[i].owner == _owner) {
                count++;
            }
        }
        Vehicle[] memory result = new Vehicle[](count);
        uint256 counter = 0;
        for (uint256 i = 1; i <= vehicleCount; i++) {
            if (vehicles[i].owner == _owner) {
                result[counter] = vehicles[i];
                counter++;
            }
        }
        return result;
    }

    function getForSaleVehicles() external view returns (Vehicle[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= vehicleCount; i++) {
            if (vehicles[i].forSale) {
                count++;
            }
        }
        Vehicle[] memory result = new Vehicle[](count);
        uint256 counter = 0;
        for (uint256 i = 1; i <= vehicleCount; i++) {
            if (vehicles[i].forSale) {
                result[counter] = vehicles[i];
                counter++;
            }
        }
        return result;
    }

    function getAllVehicles() external view returns (Vehicle[] memory) {
        Vehicle[] memory result = new Vehicle[](vehicleCount);
        for (uint256 i = 1; i <= vehicleCount; i++) {
            result[i - 1] = vehicles[i];
        }
        return result;
    }
}