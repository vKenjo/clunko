# ProjectX Lottery - Frontend Application

A decentralized lottery application built on the Stacks blockchain, featuring a sweepstakes-style game where players can win prizes and donate to charity.

## 🎯 Features

- **🎰 Number Selection**: Pick 6 numbers from 1-59 for your lottery ticket
- **💝 Charity Integration**: Optionally select a charity to receive 10% of the jackpot if you win
- **⏰ Live Countdown**: Real-time timer showing when you can enter the lottery
- **👛 Wallet Integration**: Seamless connection with Stacks wallets (Leather, Xverse, etc.)
- **🏆 Prize Tiers**: 4 prize levels based on number matches (3-6 matches)
- **📊 Live Stats**: View current round information, prize pool, and total tickets

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Stacks wallet (Leather or Xverse recommended)
- STX tokens for purchasing tickets

### Installation

\`\`\`bash
cd projectx-fe
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎮 How to Use

1. **Connect Your Wallet** - Click the "Connect Wallet" button
2. **Check the Timer** - Ensure the round is accepting entries
3. **Select Numbers** - Pick 6 numbers from 1-59
4. **Purchase Ticket** - Confirm transaction (1 STX)
5. **Win Prizes** - Match 3-6 numbers to win!

## 🏗️ Technology Stack

- Next.js 15 (React 19)
- Stacks blockchain & Clarity smart contracts
- Tailwind CSS
- TypeScript

## 📝 Current Status

Running in **demo mode** with mock data. Deploy contracts and update config to enable full blockchain integration.

---

Built with ❤️ for the Stacks Hackathon
