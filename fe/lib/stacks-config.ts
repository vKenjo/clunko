import { STACKS_MAINNET, STACKS_TESTNET, STACKS_DEVNET } from '@stacks/network';

// Network configuration - change based on deployment
export const NETWORK_CONFIG = {
  // Use 'mainnet', 'testnet', or 'devnet'
  network: process.env.NEXT_PUBLIC_NETWORK || 'devnet',
};

export const getNetwork = () => {
  switch (NETWORK_CONFIG.network) {
    case 'mainnet':
      return STACKS_MAINNET;
    case 'testnet':
      return STACKS_TESTNET;
    case 'devnet':
    default:
      // STACKS_DEVNET uses http://localhost:3999 by default
      return STACKS_DEVNET;
  }
};

// Contract addresses - update these with your deployed contract addresses
// Using v2 contracts deployed on testnet (with number range 1-59)
export const CONTRACTS = {
  mainLottery: process.env.NEXT_PUBLIC_MAIN_LOTTERY_CONTRACT || 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.main-lottery-v2',
  numberGenerator: process.env.NEXT_PUBLIC_NUMBER_GENERATOR_CONTRACT || 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.number-generator-v2',
  prizeDisbursement: process.env.NEXT_PUBLIC_PRIZE_DISBURSEMENT_CONTRACT || 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.prize-disbursement-v2',
};

// Ticket price in microSTX (1 STX = 1,000,000 microSTX)
export const TICKET_PRICE = 1000000;

// Number range
export const MIN_NUMBER = 1;
export const MAX_NUMBER = 59;
export const NUMBERS_TO_SELECT = 6;
