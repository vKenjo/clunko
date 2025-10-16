/**
 * Test utilities for ProjectX Lottery frontend
 * Use these functions to test contract interactions
 */

import { fetchCallReadOnlyFunction, cvToJSON, uintCV, principalCV } from '@stacks/transactions';
import { getNetwork, CONTRACTS } from './stacks-config';

/**
 * Test connection to contracts
 */
export async function testContractConnection() {
  try {
    const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');
    
    const response = await fetchCallReadOnlyFunction({
      network: getNetwork(),
      contractAddress,
      contractName,
      functionName: 'get-current-round',
      functionArgs: [],
      senderAddress: contractAddress,
    });

    const data = cvToJSON(response);
    console.log('✅ Contract connection successful');
    console.log('Current round:', data.value);
    return true;
  } catch (error) {
    console.error('❌ Contract connection failed:', error);
    return false;
  }
}

/**
 * Check if a round is active and accepting tickets
 */
export async function checkRoundStatus() {
  try {
    const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');
    
    // Get current round
    const roundResponse = await fetchCallReadOnlyFunction({
      network: getNetwork(),
      contractAddress,
      contractName,
      functionName: 'get-current-round',
      functionArgs: [],
      senderAddress: contractAddress,
    });

    const roundData = cvToJSON(roundResponse);
    const roundNumber = parseInt(roundData.value.toString());

    if (roundNumber === 0) {
      console.log('⚠️ No active round');
      return null;
    }

    // Get round info
    const infoResponse = await fetchCallReadOnlyFunction({
      network: getNetwork(),
      contractAddress,
      contractName,
      functionName: 'get-round-info',
      functionArgs: [uintCV(roundNumber)],
      senderAddress: contractAddress,
    });

    const info = cvToJSON(infoResponse);
    console.log('📊 Round Status:', {
      roundId: roundNumber,
      isOpen: info.value['is-open'].value,
      isDrawn: info.value['is-drawn'].value,
      totalPool: info.value['total-pool'].value,
    });

    return info.value;
  } catch (error) {
    console.error('❌ Error checking round status:', error);
    return null;
  }
}

/**
 * Get player's entries for a round
 */
export async function getPlayerTickets(roundId: number, playerAddress: string) {
  try {
    const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');
    
    const response = await fetchCallReadOnlyFunction({
      network: getNetwork(),
      contractAddress,
      contractName,
      functionName: 'get-player-entries',
      functionArgs: [uintCV(roundId), principalCV(playerAddress)],
      senderAddress: contractAddress,
    });

    const data = cvToJSON(response);
    console.log(`🎫 Player entries for round ${roundId}:`, data.value);
    return data.value;
  } catch (error) {
    console.error('❌ Error getting player tickets:', error);
    return null;
  }
}

/**
 * Check if an entry won
 */
export async function checkIfWinner(roundId: number, entryId: number) {
  try {
    const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');
    
    const response = await fetchCallReadOnlyFunction({
      network: getNetwork(),
      contractAddress,
      contractName,
      functionName: 'check-winner',
      functionArgs: [uintCV(roundId), uintCV(entryId)],
      senderAddress: contractAddress,
    });

    const data = cvToJSON(response);
    const matches = parseInt(data.value.value.toString());
    
    console.log(`🎯 Entry ${entryId} matches: ${matches}`);
    return matches;
  } catch (error) {
    console.error('❌ Error checking winner:', error);
    return 0;
  }
}

/**
 * Calculate expected prize for matches
 */
export async function calculatePrize(roundId: number, matches: number, totalPool: number) {
  try {
    const [contractAddress, contractName] = CONTRACTS.prizeDisbursement.split('.');
    
    const response = await fetchCallReadOnlyFunction({
      network: getNetwork(),
      contractAddress,
      contractName,
      functionName: 'calculate-net-prize',
      functionArgs: [uintCV(roundId), uintCV(matches), uintCV(totalPool)],
      senderAddress: contractAddress,
    });

    const data = cvToJSON(response);
    console.log(`💰 Net prize for ${matches} matches: ${data.value} microSTX`);
    return parseInt(data.value.toString());
  } catch (error) {
    console.error('❌ Error calculating prize:', error);
    return 0;
  }
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).lotteryTest = {
    testContractConnection,
    checkRoundStatus,
    getPlayerTickets,
    checkIfWinner,
    calculatePrize,
  };
  
  console.log('🎰 Lottery test utilities loaded!');
  console.log('Use window.lotteryTest.testContractConnection() to test');
}
