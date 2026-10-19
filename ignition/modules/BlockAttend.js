const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BlockAttendModule", (m) => {
    const blockAttend = m.contract("BlockAttend");

    return { blockAttend };
});