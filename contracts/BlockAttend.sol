// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract BlockAttend {

    address public teacher;

    mapping(uint256 => bool) public registeredStudents;
    mapping(uint256 => bool) public sessionExists;

    event AttendanceRecorded(
    uint256 sessionId,
    uint256 studentId,
    bool isPresent,
    address markedBy
);

    // NEW: session ID => student ID => attendance status
    mapping(uint256 => mapping(uint256 => bool))
        public attendance;

    // NEW: track whether attendance has been recorded
    mapping(uint256 => mapping(uint256 => bool))
        public attendanceMarked;

    constructor() {
        teacher = msg.sender;
    }

    modifier onlyTeacher() {
        require(msg.sender == teacher, "Only teacher allowed");
        _;
    }

    function registerStudent(uint256 studentId)
        public
        onlyTeacher
    {
        require(
            !registeredStudents[studentId],
            "Student already registered"
        );

        registeredStudents[studentId] = true;
    }

    function createSession(uint256 sessionId)
        public
        onlyTeacher
    {
        require(
            !sessionExists[sessionId],
            "Session already exists"
        );

        sessionExists[sessionId] = true;
    }

    // NEW: Record attendance
    function markAttendance(
        uint256 sessionId,
        uint256 studentId,
        bool isPresent
    ) public onlyTeacher {

        require(sessionExists[sessionId], "Session does not exist");
        require(registeredStudents[studentId], "Student not registered");

        require(
            !attendanceMarked[sessionId][studentId],
            "Attendance already marked"
        );

        attendance[sessionId][studentId] = isPresent;
attendanceMarked[sessionId][studentId] = true;

emit AttendanceRecorded(
    sessionId,
    studentId,
    isPresent,
    msg.sender
);
    }
}