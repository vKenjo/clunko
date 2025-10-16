#!/usr/bin/env ts-node

/**
 * Script to create a new lottery round
 * Run this after deploying contracts to initialize the lottery
 */

import { makeContractCall, broadcastTransaction, AnchorMode, uintCV } from '@stacks/transactions';
import { STACKS_TESTNET } from '@stacks/network';

const CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
// Using v2 contract deployed on testnet
const CONTRACT_NAME = 'main-lottery-v2';
const PRIVATE_KEY = '753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601'; // Deployer key

async function createRound() {
  const network = STACKS_TESTNET;
  
  // Duration in blocks (1000 blocks ~ 7 days on mainnet, but on devnet blocks are faster)
  const durationBlocks = 1000;

  console.log('Creating new lottery round...');
  console.log(`Contract: ${CONTRACT_ADDRESS}.${CONTRACT_NAME}`);
  console.log(`Duration: ${durationBlocks} blocks`);

  try {
    const txOptions = {
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'create-round',
      functionArgs: [uintCV(durationBlocks)],
      senderKey: PRIVATE_KEY,
      validateWithAbi: false,
      network,
      anchorMode: AnchorMode.Any,
    };

    const transaction = await makeContractCall(txOptions);
    const broadcastResponse = await broadcastTransaction({
      transaction,
      network,
    });

    if (typeof broadcastResponse === 'object' && 'error' in broadcastResponse) {
      console.error('❌ Error creating round:', broadcastResponse.error);
      if (broadcastResponse.reason) {
        console.error('Reason:', broadcastResponse.reason);
      }
      throw new Error('Failed to create round');
    } else {
      console.log('✅ Round created successfully!');
      console.log('Transaction ID:', broadcastResponse);
      console.log('\n🎉 Users can now purchase lottery tickets!');
      console.log('\nNext steps:');
      console.log('1. Wait a few seconds for transaction to confirm');
      console.log('2. Open your frontend application');
      console.log('3. Connect wallet and purchase tickets');
    }
  } catch (error: any) {
    console.error('❌ Failed to create round:', error.message);
    if (error.message.includes('contract not found')) {
      console.error('\n⚠️  Contract not deployed yet!');
      console.error('Please ensure the devnet is running and contracts are deployed.');
      console.error('The contracts should auto-deploy when you start: clarinet devnet start');
    }
    throw error;
  }
}

createRound().catch(console.error);
