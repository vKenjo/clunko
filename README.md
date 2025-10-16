# 🎰 Clunko - Decentralized Lottery on Stacks

A fully decentralized lottery application built on the Stacks blockchain, featuring a sweepstakes-style game where players can win prizes and optionally donate to charity. The platform combines transparent smart contracts with a modern, user-friendly interface.

[![Stacks Blockchain](https://img.shields.io/badge/Stacks-Blockchain-5546FF?logo=stacks)](https://www.stacks.co/)
[![Clarity](https://img.shields.io/badge/Smart%20Contracts-Clarity-5546FF)](https://clarity-lang.org/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2015-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/)

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Backend Setup](#-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [How It Works](#-how-it-works)
- [Smart Contracts](#-smart-contracts)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎮 Gameplay
- **Number Selection**: Pick 6 numbers from 1-59 for your lottery ticket
- **Multiple Prize Tiers**: Win based on matches (3, 4, 5, or 6 numbers)
- **1 STX Per Ticket**: Simple, flat pricing for all players
- **Automatic Payouts**: Winners are paid automatically via smart contracts

### 💝 Charity Integration
- **Optional Donations**: Select a charity to receive 10% of jackpot if you win
- **Transparent Tracking**: All charity donations recorded on-chain
- **Multiple Charities**: Support for various charitable organizations

### ⏰ Time-Based Rounds
- **Daily Draws**: Lottery draws occur at 23:00 UTC
- **Safe Entry Periods**: No entries during draw window (23:00-23:59 UTC)
- **Automatic Round Management**: Smart contracts handle round transitions

### 🔒 Security & Transparency
- **On-Chain Verification**: All transactions verifiable on Stacks blockchain
- **Decentralized RNG**: Fair random number generation using block hashes
- **Auditable**: Open-source smart contracts written in Clarity

### 👛 Wallet Integration
- **Multiple Wallets**: Support for Leather, Xverse, and other Stacks wallets
- **Seamless Connection**: Easy wallet connection and transaction signing
- **Real-Time Updates**: Live balance and transaction status

## 🏗️ Architecture

Clunko consists of three main components:

```
┌─────────────────────────────────────────────────────────────┐
│                       Frontend (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Wallet     │  │    Ticket    │  │    Round     │     │
│  │  Connection  │  │   Purchase   │  │     Info     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Stacks Blockchain                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Smart Contracts (Clarity)                    │  │
│  │  ┌────────────┐ ┌────────────┐ ┌──────────────────┐ │  │
│  │  │   Main     │ │   Number   │ │      Prize       │ │  │
│  │  │  Lottery   │ │ Generator  │ │  Disbursement    │ │  │
│  │  └────────────┘ └────────────┘ └──────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Smart Contract Architecture

1. **main-lottery.clar**: Core lottery logic, ticket purchases, round management
2. **number-generator.clar**: Random number generation using block hashes
3. **prize-disbursement.clar**: Prize calculation and winner payouts

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ installed ([Download](https://nodejs.org/))
- **Clarinet** CLI tool installed ([Installation Guide](https://docs.hiro.so/clarinet/getting-started))
- **Stacks Wallet** (Leather or Xverse recommended)
- **STX Tokens** for testing/deployment

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/vKenjo/clunko.git
   cd clunko
   ```

2. **Install backend dependencies**
   ```bash
   cd be
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../fe
   npm install
   ```

4. **Start development environment**
   ```bash
   # Terminal 1: Start Clarinet console (optional)
   cd be
   clarinet console

   # Terminal 2: Start frontend
   cd fe
   npm run dev
   ```

5. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Backend Setup

### Directory Structure

```
be/
├── contracts/              # Clarity smart contracts
│   ├── main-lottery.clar
│   ├── number-generator.clar
│   └── prize-disbursement.clar
├── tests/                  # Contract unit tests
├── scripts/                # Deployment and utility scripts
├── deployments/            # Deployment configurations
├── Clarinet.toml          # Clarinet configuration
└── package.json
```

### Local Development

1. **Run tests**
   ```bash
   cd be
   npm test
   ```

2. **Test in console**
   ```bash
   clarinet console
   ```

3. **Check contracts**
   ```bash
   clarinet check
   ```

### Smart Contract Functions

#### Main Lottery Contract

**Public Functions:**
- `initialize-lottery()` - Set up the lottery system
- `create-new-round(end-block)` - Create a new lottery round
- `buy-ticket(numbers, charity-id)` - Purchase a lottery ticket
- `draw-winning-numbers()` - Execute the lottery draw
- `finalize-round()` - Complete round and enable new round creation

**Read-Only Functions:**
- `get-round-info(round-id)` - Get round details
- `get-entry-info(entry-id)` - Get ticket information
- `get-current-round-id()` - Get active round ID

#### Number Generator Contract

**Public Functions:**
- `generate-winning-numbers()` - Generate 6 random numbers

**Read-Only Functions:**
- `get-generated-numbers()` - Retrieve last generated numbers

#### Prize Disbursement Contract

**Public Functions:**
- `set-lottery-contract(contract)` - Link to lottery contract
- `calculate-and-pay-all-winners(round-id)` - Process all payouts

**Read-Only Functions:**
- `calculate-prize(round-id, entry-id)` - Calculate prize for entry
- `get-prize-percentages()` - View prize tier percentages

### Deployment

#### Deploy to Testnet

1. **Configure deployment settings**

   Edit `be/settings/Devnet.toml` or `be/deployments/default.testnet-plan.yaml`

2. **Run deployment script**
   ```bash
   cd be
   ./deploy.sh
   ```

3. **Note your contract addresses**

   Save the deployed contract addresses for frontend configuration.

#### Deploy to Mainnet

```bash
cd be
clarinet deployments apply --plan default.mainnet-plan.yaml --network mainnet
```

### Current Testnet Deployment

The contracts are currently deployed on Stacks Testnet:

- **Main Lottery**: `ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.main-lottery`
- **Number Generator**: `ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.number-generator`
- **Prize Disbursement**: `ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.prize-disbursement`

## 💻 Frontend Setup

### Directory Structure

```
fe/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── raffles/           # Raffles page
│   └── help/              # Help page
├── components/            # React components
│   ├── WalletConnect.tsx
│   ├── TicketPurchase.tsx
│   ├── NumberPicker.tsx
│   ├── RoundInfo.tsx
│   └── ...
├── lib/                   # Utilities and configs
│   ├── stacks-config.ts
│   ├── stacks-utils.ts
│   └── lottery-api.ts
├── public/                # Static assets
└── package.json
```

### Configuration

Update the contract addresses in `fe/lib/stacks-config.ts`:

```typescript
export const LOTTERY_CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
export const LOTTERY_CONTRACT_NAME = 'main-lottery';
export const PRIZE_CONTRACT_NAME = 'prize-disbursement';
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env.local` file in the `fe` directory:

```env
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
NEXT_PUBLIC_CONTRACT_NAME=main-lottery
```

## 🎲 How It Works

### For Players

1. **Connect Wallet**: Connect your Stacks wallet (Leather, Xverse, etc.)
2. **Check Round Status**: Ensure the current round is accepting entries
3. **Select Numbers**: Choose 6 numbers between 1-59
4. **Optional Charity**: Select a charity to donate 10% of jackpot if you win
5. **Purchase Ticket**: Pay 1 STX and confirm transaction
6. **Wait for Draw**: Draw occurs daily at 23:00 UTC
7. **Check Results**: View winning numbers and your prizes

### Prize Tiers

| Matches | Prize      | % of Pool |
|---------|------------|-----------|
| 6/6     | Jackpot    | 50%       |
| 5/6     | 2nd Tier   | 25%       |
| 4/6     | 3rd Tier   | 15%       |
| 3/6     | 4th Tier   | 10%       |

### Round Lifecycle

```
┌─────────────────────────────────────────────────────────┐
│  1. ROUND CREATED                                       │
│     └─> Owner calls create-new-round()                 │
├─────────────────────────────────────────────────────────┤
│  2. TICKET SALES OPEN                                   │
│     └─> Players call buy-ticket(numbers, charity)      │
├─────────────────────────────────────────────────────────┤
│  3. DRAW TIME (23:00 UTC)                              │
│     └─> No ticket sales during draw window            │
├─────────────────────────────────────────────────────────┤
│  4. DRAW EXECUTION                                      │
│     └─> Owner calls draw-winning-numbers()            │
├─────────────────────────────────────────────────────────┤
│  5. PRIZE DISTRIBUTION                                  │
│     └─> calculate-and-pay-all-winners() executed      │
├─────────────────────────────────────────────────────────┤
│  6. ROUND FINALIZED                                     │
│     └─> Owner calls finalize-round()                  │
│     └─> New round can be created                      │
└─────────────────────────────────────────────────────────┘
```

## 📝 Smart Contracts

### Main Lottery Contract

Handles the core lottery functionality:

- **Ticket Sales**: Accept ticket purchases with number validation
- **Entry Management**: Store player entries with charity preferences
- **Round Control**: Manage round states and transitions
- **Time Safety**: Enforce draw windows and prevent conflicts
- **Pool Management**: Track prize pools and charity contributions

### Number Generator Contract

Provides fair random number generation:

- **Block Hash RNG**: Uses Stacks block hashes for randomness
- **6 Unique Numbers**: Generates numbers from 1-59
- **Duplicate Prevention**: Ensures all numbers are unique
- **Verifiable**: All randomness is on-chain and auditable

### Prize Disbursement Contract

Calculates and distributes prizes:

- **Match Counting**: Determines number matches for each entry
- **Prize Calculation**: Calculates winnings based on tier percentages
- **Batch Processing**: Pays multiple winners efficiently
- **Charity Donations**: Handles charity disbursements for winners

## 🧪 Testing

### Backend Tests

```bash
cd be
npm test                  # Run all tests
npm run test:watch       # Watch mode
npm run test:report      # Generate coverage report
```

Test files located in `be/tests/`:
- `main-lottery.test.ts`
- `number-generator.test.ts`
- `prize-disbursement.test.ts`
- `stx-transfer-verification.test.ts`

### Frontend Testing

Currently in development. To manually test:

1. Start local development server
2. Connect wallet to testnet
3. Purchase test tickets
4. Verify transactions on blockchain explorer

## 🛠️ Technology Stack

### Backend
- **Clarity**: Smart contract language for Stacks blockchain
- **Clarinet**: Development and testing framework
- **Vitest**: Unit testing for contracts
- **TypeScript**: Type-safe scripting

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Stacks.js**: Blockchain interaction libraries
  - `@stacks/connect`: Wallet connections
  - `@stacks/transactions`: Transaction building
  - `@stacks/network`: Network configuration
- **Lucide React**: Icon library

### Blockchain
- **Stacks Blockchain**: Bitcoin-secured layer for smart contracts
- **Clarity Language**: Decidable smart contract language
- **Bitcoin Finality**: Transactions secured by Bitcoin

## 📁 Project Structure

```
clunko/
├── be/                         # Backend (Smart Contracts)
│   ├── contracts/              # Clarity smart contracts
│   │   ├── main-lottery.clar
│   │   ├── number-generator.clar
│   │   └── prize-disbursement.clar
│   ├── tests/                  # Contract tests
│   ├── scripts/                # Deployment & utility scripts
│   │   ├── create-round.ts
│   │   ├── fund-wallet.ts
│   │   └── test-buy-ticket.ts
│   ├── deployments/            # Network deployment configs
│   ├── settings/               # Network settings
│   ├── Clarinet.toml          # Clarinet configuration
│   ├── package.json
│   └── README.md
│
├── fe/                         # Frontend (Next.js App)
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Home/Lottery page
│   │   ├── raffles/           # Raffles page
│   │   ├── help/              # Help page
│   │   └── globals.css
│   ├── components/             # React components
│   │   ├── WalletConnect.tsx
│   │   ├── TicketPurchase.tsx
│   │   ├── NumberPicker.tsx
│   │   ├── RoundInfo.tsx
│   │   ├── PrizeInfo.tsx
│   │   ├── MyTickets.tsx
│   │   ├── CharitySelector.tsx
│   │   └── Navbar.tsx
│   ├── lib/                    # Utilities
│   │   ├── stacks-config.ts   # Contract addresses
│   │   ├── stacks-utils.ts    # Blockchain utilities
│   │   ├── lottery-api.ts     # API functions
│   │   └── test-utils.ts
│   ├── public/                 # Static assets
│   │   ├── clunko-logo.png
│   │   └── *.png              # Prize & emotion images
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── README.md
│
└── README.md                   # This file
```

## 🚀 Deployment Guide

### Prerequisites for Deployment

1. **Funded Wallet**: Ensure wallet has sufficient STX for deployment fees
2. **Network Access**: Connection to Stacks testnet or mainnet
3. **Clarinet Installed**: Latest version of Clarinet CLI

### Step-by-Step Deployment

#### 1. Backend Deployment

```bash
cd be

# Deploy to testnet
clarinet deployments apply --plan default.testnet-plan.yaml

# Or use the automated script
./deploy.sh
```

#### 2. Update Frontend Configuration

After deployment, update `fe/lib/stacks-config.ts` with your contract addresses:

```typescript
export const LOTTERY_CONTRACT_ADDRESS = 'YOUR_ADDRESS';
export const LOTTERY_CONTRACT_NAME = 'main-lottery';
```

#### 3. Initialize Contracts

```bash
cd be

# Initialize lottery contract
npm run init-lottery

# Create first round
node scripts/create-round.ts
```

#### 4. Deploy Frontend

**Vercel Deployment:**

```bash
cd fe
npm run build

# Deploy to Vercel
vercel deploy
```

**Or deploy to any Node.js hosting:**

```bash
npm run build
npm start
```

### Post-Deployment Checklist

- [ ] Verify contracts on Stacks Explorer
- [ ] Test ticket purchase on testnet
- [ ] Confirm wallet connections work
- [ ] Test complete round lifecycle
- [ ] Verify prize calculations
- [ ] Test charity donations
- [ ] Monitor gas costs
- [ ] Set up monitoring/alerts

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Write tests for new features
- Follow TypeScript/Clarity best practices
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📜 License

This project is licensed under the ISC License.

## 🔗 Links

- **Repository**: [github.com/vKenjo/clunko](https://github.com/vKenjo/clunko)
- **Stacks Explorer**: [explorer.hiro.so](https://explorer.hiro.so/)
- **Clarity Documentation**: [clarity-lang.org](https://clarity-lang.org/)
- **Stacks.js Docs**: [stacks.js.org](https://www.stacks.js.org/)

## 📞 Support

For questions or issues:

- Open an issue on GitHub
- Check the [Help Page](http://localhost:3000/help) in the app
- Review the [Stacks Documentation](https://docs.stacks.co/)

## 🎯 Roadmap

- [ ] Mobile-responsive improvements
- [ ] Multi-lottery support
- [ ] Enhanced charity selection
- [ ] Historical results page
- [ ] Player statistics dashboard
- [ ] Social sharing features
- [ ] Email/SMS notifications
- [ ] Multi-language support

## 🏆 Acknowledgments

Built for the Stacks Hackathon with dedication to creating a transparent, fair, and fun lottery experience on the blockchain.

---

**Made with ❤️ on Stacks Blockchain**
