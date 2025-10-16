# Lottery Initialization Scripts

## Quick Start

After starting the devnet with `clarinet devnet start`, you need to **create the first lottery round** before users can buy tickets.

### Option 1: Use Clarinet Console (Recommended)

```bash
cd projectx
clarinet console

# In the Clarinet console, run:
(contract-call? .main-lottery create-round u1000)
```

### Option 2: Use the Stacks Explorer UI

1. Open <http://localhost:8000> (Stacks Explorer)
2. Navigate to the `main-lottery` contract
3. Call the `create-round` function with parameter `u1000`
4. Sign with the deployer account

### Option 3: Use the TypeScript Script

```bash
cd projectx
npm install
npx ts-node scripts/create-round.ts
```

## What This Does

The `create-round` function:

- Creates a new lottery round (Round ID: 1)
- Sets duration to 1000 blocks
- Opens the round for ticket purchases
- Initializes the prize pool

After running this, users can:

- Connect their Leather wallet
- Select 6 numbers (1-59)
- Purchase tickets for 1 STX each
- View their tickets in "My Tickets"

## Troubleshooting

Error: "err-no-active-round"**

- You forgot to create a round. Run one of the initialization options above.

Error: "transaction rejected"**

- The round might be closed or not created yet
- Check the round status with `(contract-call? .main-lottery get-current-round)`

Error: "contract not found"**

- Make sure the devnet is running: `clarinet devnet start`
- Check that contracts are deployed by looking at the devnet logs
