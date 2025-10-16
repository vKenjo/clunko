#!/usr/bin/env ts-node

/**
 * Transfer devnet STX to a user's wallet
 */

import { makeSTXTokenTransfer, broadcastTransaction, AnchorMode } from '@stacks/transactions';
import { STACKS_DEVNET } from '@stacks/network';

const DEPLOYER_PRIVATE_KEY = '753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601';
const RECIPIENT_ADDRESS = 'ST2JPWKN5JFN5GT4F4ZXY5WYHNJG9WATHCP0GVZND';
const AMOUNT = 100000000; // 100 STX (in microSTX)

async function transferSTX() {
  const network = STACKS_DEVNET;

  console.log('💰 Transferring devnet STX...');
  console.log(`To: ${RECIPIENT_ADDRESS}`);
  console.log(`Amount: ${AMOUNT / 1000000} STX`);

  try {
    const txOptions = {
      recipient: RECIPIENT_ADDRESS,
      amount: AMOUNT,
      senderKey: DEPLOYER_PRIVATE_KEY,
      network,
      anchorMode: AnchorMode.Any,
      memo: 'Devnet test funds',
    };

    const transaction = await makeSTXTokenTransfer(txOptions);
    const broadcastResponse = await broadcastTransaction({
      transaction,
      network,
    });

    if (typeof broadcastResponse === 'object' && 'error' in broadcastResponse) {
      console.error('❌ Error transferring STX:', broadcastResponse.error);
      if (broadcastResponse.reason) {
        console.error('Reason:', broadcastResponse.reason);
      }
      throw new Error('Failed to transfer STX');
    } else {
      console.log('✅ STX transferred successfully!');
      console.log('Transaction ID:', broadcastResponse);
      console.log('\n🎉 You now have devnet STX!');
      console.log('\nNext steps:');
      console.log('1. Make sure your Leather wallet is on "Local Devnet" network');
      console.log('2. Go to http://localhost:3000/raffles');
      console.log('3. Connect your wallet');
      console.log('4. Purchase a lottery ticket!');
    }
  } catch (error: any) {
    console.error('❌ Failed to transfer STX:', error.message);
    throw error;
  }
}

transferSTX().catch(console.error);
