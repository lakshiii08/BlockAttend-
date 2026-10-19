
# BlockAttend

**A Decentralized Blockchain-Based Attendance Tracking System**

BlockAttend is a smart contract-based attendance management system built with Solidity and Ethereum. It enables authorized teachers to register students, create attendance sessions, and securely record attendance on the blockchain.

## Features

- **Access Control:** Restricts attendance management to the deploying teacher.
- **Student Registration:** Registers students using unique IDs.
- **Session Management:** Creates and manages attendance sessions.
- **Attendance Tracking:** Records student presence on-chain.
- **Duplicate Prevention:** Prevents multiple attendance entries for the same student in a session.
- **Event Logging:** Emits blockchain events for attendance records.

## Tech Stack

- Solidity
- Hardhat
- Ethereum Sepolia Testnet
- Hardhat Ignition
- MetaMask
- Alchemy

## Smart Contract

**Network:** Ethereum Sepolia Testnet

**Contract Address:** `0xe6a63e74b8FE9AF0Ba5cde072125E35eeAd14E4b`

[View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0xe6a63e74b8FE9AF0Ba5cde072125E35eeAd14E4b)

## Getting Started

```bash
git clone <your-repository-url>
cd BlockAttend
npm install
npx hardhat compile
npx hardhat test
```

## Deployment

Configure your Sepolia RPC URL and development wallet private key in a local `.env` file, then deploy using:

```bash
npx hardhat ignition deploy ignition/modules/BlockAttend.js --network sepolia
```

Never commit your `.env` file or expose private keys.

## Note

This project is developed for learning and experimentation with Solidity, smart contracts, and blockchain development. It is deployed on the Sepolia testnet and is not intended for production use.
