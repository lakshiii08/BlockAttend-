BlockAttend — Decentralized Blockchain Attendance Tracker
BlockAttend is a beginner-friendly Web3 project that records classroom attendance using a Solidity smart contract on the Ethereum Sepolia testnet. It demonstrates how smart contracts can enforce permissions, store attendance records, prevent duplicate entries, and emit blockchain events.
Network: Ethereum Sepolia Testnet
Contract address: 0xe6a63e74b8FE9AF0Ba5cde072125E35eeAd14E4b
Explorer: View BlockAttend on Sepolia Etherscan

Features
- Teacher access control: Only the account that deploys the contract can register students, create sessions, and mark attendance.
- Student registration: Register students using numeric student IDs.
- Attendance sessions: Create sessions using numeric session IDs.
- Attendance recording: Record whether a registered student was present for a session.
- Duplicate prevention: A student's attendance can be marked only once per session.
- Validation: Rejects unknown sessions, unregistered students, duplicate registrations, and unauthorized callers.
- Event logging: Emits AttendanceRecorded when attendance is recorded.
- Automated tests: Tests key contract behavior locally with Hardhat.
Tech Stack
- Solidity ^0.8.28
- Node.js and npm
- Hardhat 2.26.x
- Hardhat Ignition for deployment
- Ethereum Sepolia testnet
- Alchemy RPC endpoint
- MetaMask
- Sepolia Etherscan
How It Works
1. The deployer becomes the contract's teacher.
2. The teacher registers a student with a numeric ID.
3. The teacher creates an attendance session with a numeric ID.
4. The teacher records the student's attendance for that session.
5. The contract validates the request, saves the status, and emits an event.
Contract Functions
Function	Description	Access
teacher()	Returns the teacher's address	Public
registerStudent(studentId)	Registers a student ID	Teacher only
registeredStudents(studentId)	Checks whether a student is registered	Public
createSession(sessionId)	Creates an attendance session	Teacher only
sessionExists(sessionId)	Checks whether a session exists	Public
markAttendance(sessionId, studentId, isPresent)	Records attendance	Teacher only
attendance(sessionId, studentId)	Reads the recorded presence status	Public
attendanceMarked(sessionId, studentId)	Checks whether attendance was recorded	Public


Event
AttendanceRecorded(sessionId, studentId, isPresent, markedBy)

The event is emitted when attendance is successfully recorded. Event logs can be inspected through the transaction details on Etherscan.
Project Structure
BlockAttend/
├── contracts/
│   └── BlockAttend.sol
├── ignition/
│   └── modules/
│       └── BlockAttend.js
├── test/
│   └── BlockAttend.js
├── .env                 # Local secrets; do not commit
├── .gitignore
├── hardhat.config.js
├── package.json
└── README.md
Your project may also contain Hardhat-generated folders such as artifacts/, cache/, and ignition/deployments/.
Getting Started
Prerequisites
- Node.js and npm
- Git
- MetaMask (for managing the deployment wallet)
- An Alchemy account or another Ethereum Sepolia RPC provider
- Sepolia test ETH for deployment gas
1. Clone the repository
Replace the placeholder with your GitHub repository URL:
git clone <YOUR_REPOSITORY_URL>
cd BlockAttend
2. Install dependencies
npm install
3. Configure environment variables
Create a .env file in the project root:
SEPOLIA_RPC_URL="YOUR_ETHEREUM_SEPOLIA_HTTPS_RPC_URL"
PRIVATE_KEY="YOUR_DEVELOPMENT_WALLET_PRIVATE_KEY"
- SEPOLIA_RPC_URL should point to Ethereum Sepolia, not Ethereum Mainnet or another chain.
- PRIVATE_KEY must be the private key of the development account that will deploy the contract. It is not the public wallet address.
Security: Never commit .env, share your private key or Secret Recovery Phrase, or put secrets in source code. Ensure .env is listed in .gitignore. Prefer a separate development wallet funded only with test ETH.
4. Compile the contract
npx hardhat compile
5. Run tests
npx hardhat test
6. Deploy to Ethereum Sepolia
npx hardhat ignition deploy ignition/modules/BlockAttend.js --network sepolia
Confirm the network prompt before proceeding. After deployment, save the contract address printed by Hardhat and check it on Sepolia Etherscan.
Example Usage
The contract can be called from a Hardhat console or another Ethereum-compatible client. To open a console connected to Sepolia:
npx hardhat console --network sepolia
Inside the console, get the contract factory and attach it to your deployed contract address:
const BlockAttend = await ethers.getContractFactory("BlockAttend");
const blockAttend = BlockAttend.attach("YOUR_DEPLOYED_CONTRACT_ADDRESS");
Then, using the account that deployed the contract:
await (await blockAttend.registerStudent(101)).wait();
await (await blockAttend.createSession(1)).wait();
await (await blockAttend.markAttendance(1, 101, true)).wait();

await blockAttend.attendance(1, 101);
await blockAttend.attendanceMarked(1, 101);
Use the same address and network as your deployment. Transactions on Sepolia require test ETH for gas. The example assumes the console's signer is the teacher account that deployed the contract.
Important Limitations
- This is an educational prototype, not a production-ready attendance system.
- Student IDs and attendance are publicly readable on-chain; do not store sensitive personal data.
- The teacher is permanently set to the deployer in this version; there is no teacher transfer or recovery mechanism.
- Attendance cannot currently be edited after it has been marked.
- Session IDs and student IDs are supplied manually and are not tied to verified real-world identities.
- The contract uses testnet ETH and is deployed to Sepolia; it is not deployed to Ethereum Mainnet.
Future Improvements
- Add a teacher-controlled attendance correction process with an audit trail.
- Add role transfer or multiple authorized teachers.
- Add session timestamps and richer event indexing.
- Add privacy-conscious student identifiers.
- Build a frontend after the core smart-contract workflow is complete.
Learning Outcomes
Through BlockAttend, I practiced:
- Solidity state variables, mappings, constructors, and modifiers
- Access control with msg.sender and require
- Smart-contract events
- Hardhat compilation and automated testing
- Local deployment with Hardhat Ignition
- Sepolia testnet deployment and Etherscan verification
- Managing RPC configuration and secrets with environment variables
License
This project is released under the MIT License. Add a LICENSE file if you intend to distribute it under that license.git init