#!/bin/bash

# Script to initialize the lottery by creating the first round
# This should be run after the devnet starts and contracts are deployed

echo "🎰 Initializing Lottery - Creating Round 1"
echo "==========================================="
echo ""

# Wait for devnet to be ready
echo "⏳ Waiting for devnet to be ready..."
sleep 5

# Create the first round (1000 blocks duration)
echo "📝 Creating round with 1000 block duration..."

# Use Clarinet to call the create-round function
# The deployer address has the authority to create rounds
clarinet devnet exec \
  --contract-call \
  --contract-address ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM \
  --contract-name main-lottery \
  --function-name create-round \
  --function-args "(u1000)" \
  --sender ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Round created successfully!"
    echo ""
    echo "🎉 Your lottery is now ready!"
    echo "   Users can now purchase tickets from the frontend."
    echo ""
    echo "📋 Current Status:"
    echo "   - Round ID: 1"
    echo "   - Duration: 1000 blocks"
    echo "   - Status: OPEN"
    echo "   - Ticket Price: 1 STX"
    echo ""
else
    echo ""
    echo "❌ Failed to create round"
    echo "   Please check that the devnet is running and contracts are deployed"
    exit 1
fi
