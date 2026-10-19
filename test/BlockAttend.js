const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BlockAttend", function () {

    async function deployContract() {
        const [teacher, otherAccount] =
            await ethers.getSigners();

        const BlockAttend =
            await ethers.getContractFactory("BlockAttend");

        const contract = await BlockAttend.deploy();

        return { contract, teacher, otherAccount };
    }

    it("should set the deployer as teacher", async function () {
        const { contract, teacher } = await deployContract();

        expect(await contract.teacher()).to.equal(teacher.address);
    });

    it("should register a student", async function () {
        const { contract } = await deployContract();

        await contract.registerStudent(101);

        expect(await contract.registeredStudents(101)).to.equal(true);
    });

    it("should prevent duplicate student registration", async function () {
        const { contract } = await deployContract();

        await contract.registerStudent(101);

        await expect(
            contract.registerStudent(101)
        ).to.be.revertedWith("Student already registered");
    });

    it("should prevent a non-teacher from registering students", async function () {
        const { contract, otherAccount } = await deployContract();

        await expect(
            contract.connect(otherAccount).registerStudent(101)
        ).to.be.revertedWith("Only teacher allowed");
    });

    it("should create a session and mark attendance", async function () {
        const { contract } = await deployContract();

        await contract.registerStudent(101);
        await contract.createSession(1);
        await contract.markAttendance(1, 101, true);

        expect(await contract.attendance(1, 101)).to.equal(true);
        expect(await contract.attendanceMarked(1, 101)).to.equal(true);
    });

    it("should emit an attendance event", async function () {
        const { contract, teacher } = await deployContract();

        await contract.registerStudent(101);
        await contract.createSession(1);

        await expect(contract.markAttendance(1, 101, true))
            .to.emit(contract, "AttendanceRecorded")
            .withArgs(1, 101, true, teacher.address);
    });
it("should reject attendance for a nonexistent session", async function () {
    const { contract } = await deployContract();

    await contract.registerStudent(101);

    await expect(
        contract.markAttendance(99, 101, true)
    ).to.be.revertedWith("Session does not exist");
});

it("should prevent attendance from being marked twice", async function () {
    const { contract } = await deployContract();

    await contract.registerStudent(101);
    await contract.createSession(1);

    await contract.markAttendance(1, 101, true);

    await expect(
        contract.markAttendance(1, 101, false)
    ).to.be.revertedWith("Attendance already marked");
});

});