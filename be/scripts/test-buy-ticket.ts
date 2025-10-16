#!/usr/bin/env ts-node

/**
 * Test script to buy a ticket directly via the devnet
 * This simulates what the frontend does
 */

import { makeContractCall, broadcastTransaction, AnchorMode, uintCV, listCV, noneCV } from '@stacks/transactions';
import { STACKS_DEVNET } from '@stacks/network';

const CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
// Using v2 contract deployed on testnet
const CONTRACT_NAME = 'main-lottery-v2';
const PRIVATE_KEY = '753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601';

async function buyTicket() {
  const network = STACKS_DEVNET;
  
  // Test numbers: 2, 4, 16, 23, 56, 57
  const numbers = [2, 4, 16, 23, 56, 57];

  console.log('🎟️  Buying lottery ticket...');
  console.log(`Contract: ${CONTRACT_ADDRESS}.${CONTRACT_NAME}`);
  console.log(`Numbers: ${numbers.join(', ')}`);

  try {
    const txOptions = {
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'buy-ticket',
      functionArgs: [
        listCV(numbers.map(n => uintCV(n))),
        noneCV() // No charity selected
      ],
      senderKey: PRIVATE_KEY,
      validateWithAbi: false,
      network,
      anchorMode: AnchorMode.Any,
      fee: 200000, // 0.2 STX fee
    };

    const transaction = await makeContractCall(txOptions);
    const broadcastResponse = await broadcastTransaction({
      transaction,
      network,
    });

    if (typeof broadcastResponse === 'object' && 'error' in broadcastResponse) {
      console.error('❌ Error buying ticket:', broadcastResponse.error);
      if (broadcastResponse.reason) {
        console.error('Reason:', broadcastResponse.reason);
      }
      throw new Error('Failed to buy ticket');
    } else {
      console.log('✅ Ticket purchased successfully!');
      console.log('Transaction ID:', broadcastResponse);
      console.log('\n🎉 Your ticket has been submitted!');
      console.log(`Numbers: ${numbers.join(', ')}`);
    }
  } catch (error: any) {
    console.error('❌ Failed to buy ticket:', error.message);
    throw error;
  }
}

buyTicket().catch(console.error);
