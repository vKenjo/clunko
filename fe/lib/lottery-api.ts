/**
 * Lottery API - Helper functions to interact with the lottery smart contract
 * This module provides typed interfaces and helper functions for querying ticket history
 */

import {
  fetchCallReadOnlyFunction,
  cvToJSON,
  uintCV,
  principalCV,
} from '@stacks/transactions';
import { getNetwork, CONTRACTS } from './stacks-config';

export interface TicketEntry {
  roundId: number;
  entryId: number;
  numbers: number[];
  timestamp: number;
  charity?: string;
  matches?: number;
  isWinner?: boolean;
}

export interface RoundInfo {
  roundId: number;
  isDrawn: boolean;
  winningNumbers: number[];
  totalPool: number;
  drawTimestamp: number;
  playerTicketCount?: number;
  playerEntryIds?: number[];
}

/**
 * Get the current round number
 */
export async function getCurrentRound(): Promise<number> {
  const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');
  
  const result = await fetchCallReadOnlyFunction({
    network: getNetwork(),
    contractAddress,
    contractName,
    functionName: 'get-current-round',
    functionArgs: [],
    senderAddress: contractAddress,
  });

  const value = cvToJSON(result);
  return value.value || 0;
}

/**
 * Get round summary with player's ticket information
 * This uses the enhanced smart contract function
 */
export async function getRoundSummaryForPlayer(
  roundId: number,
  playerAddress: string
): Promise<RoundInfo | null> {
  try {
    const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');
    
    const result = await fetchCallReadOnlyFunction({
      network: getNetwork(),
      contractAddress,
      contractName,
      functionName: 'get-round-summary-for-player',
      functionArgs: [uintCV(roundId), principalCV(playerAddress)],
      senderAddress: playerAddress,
    });

    const value = cvToJSON(result);
    
    if (value && value.value) {
      const data = value.value;
      return {
        roundId: data['round-id'],
        isDrawn: data['is-drawn'],
        winningNumbers: data['winning-numbers'],
        totalPool: data['total-pool'],
        drawTimestamp: data['draw-timestamp'],
        playerTicketCount: data['player-ticket-count'],
        playerEntryIds: data['player-entry-ids'],
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching round summary:', error);
    return null;
  }
}

/**
 * Get detailed ticket information including match results
 * This uses the enhanced get-ticket-info function
 */
export async function getTicketInfo(
  roundId: number,
  entryId: number,
  userAddress: string
): Promise<TicketEntry | null> {
  try {
    const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');
    
    const result = await fetchCallReadOnlyFunction({
      network: getNetwork(),
      contractAddress,
      contractName,
      functionName: 'get-ticket-info',
      functionArgs: [uintCV(roundId), uintCV(entryId)],
      senderAddress: userAddress,
    });

    const value = cvToJSON(result);
    
    if (value && value.value) {
      const data = value.value;
      return {
        roundId,
        entryId,
        numbers: data.numbers,
        timestamp: data.timestamp,
        charity: data.charity?.value || undefined,
        matches: data.matches,
        isWinner: data['is-winner'],
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching ticket info:', error);
    return null;
  }
}

/**
 * Get all player entry IDs for a specific round
 */
export async function getPlayerEntries(
  roundId: number,
  playerAddress: string
): Promise<number[]> {
  try {
    const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');
    
    const result = await fetchCallReadOnlyFunction({
      network: getNetwork(),
      contractAddress,
      contractName,
      functionName: 'get-player-entries',
      functionArgs: [uintCV(roundId), principalCV(playerAddress)],
      senderAddress: playerAddress,
    });

    return cvToJSON(result) as number[];
  } catch (error) {
    console.error('Error fetching player entries:', error);
    return [];
  }
}

/**
 * Get basic round information
 */
export async function getRoundInfo(roundId: number, userAddress: string): Promise<any> {
  try {
    const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');
    
    const result = await fetchCallReadOnlyFunction({
      network: getNetwork(),
      contractAddress,
      contractName,
      functionName: 'get-round-info',
      functionArgs: [uintCV(roundId)],
      senderAddress: userAddress,
    });

    return cvToJSON(result);
  } catch (error) {
    console.error('Error fetching round info:', error);
    return null;
  }
}

/**
 * Get a single entry's details
 */
export async function getEntry(
  roundId: number,
  entryId: number,
  userAddress: string
): Promise<any> {
  try {
    const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');
    
    const result = await fetchCallReadOnlyFunction({
      network: getNetwork(),
      contractAddress,
      contractName,
      functionName: 'get-entry',
      functionArgs: [uintCV(roundId), uintCV(entryId)],
      senderAddress: userAddress,
    });

    return cvToJSON(result);
  } catch (error) {
    console.error('Error fetching entry:', error);
    return null;
  }
}

/**
 * Check if a specific entry is a winner and get match count
 */
export async function checkWinner(
  roundId: number,
  entryId: number,
  userAddress: string
): Promise<number> {
  try {
    const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');
    
    const result = await fetchCallReadOnlyFunction({
      network: getNetwork(),
      contractAddress,
      contractName,
      functionName: 'check-winner',
      functionArgs: [uintCV(roundId), uintCV(entryId)],
      senderAddress: userAddress,
    });

    const value = cvToJSON(result);
    return value?.value || 0;
  } catch (error) {
    console.error('Error checking winner:', error);
    return 0;
  }
}

/**
 * Check if player has any winning tickets in a round
 */
export async function playerHasWinners(
  roundId: number,
  playerAddress: string
): Promise<boolean> {
  try {
    const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');
    
    const result = await fetchCallReadOnlyFunction({
      network: getNetwork(),
      contractAddress,
      contractName,
      functionName: 'player-has-winners',
      functionArgs: [uintCV(roundId), principalCV(playerAddress)],
      senderAddress: playerAddress,
    });

    const value = cvToJSON(result);
    return value?.value || false;
  } catch (error) {
    console.error('Error checking player winners:', error);
    return false;
  }
}

/**
 * Get player's total ticket count across all rounds
 */
export async function getPlayerTotalTickets(playerAddress: string): Promise<number> {
  try {
    const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');
    
    const result = await fetchCallReadOnlyFunction({
      network: getNetwork(),
      contractAddress,
      contractName,
      functionName: 'get-player-total-tickets',
      functionArgs: [principalCV(playerAddress)],
      senderAddress: playerAddress,
    });

    const value = cvToJSON(result);
    return value?.total || 0;
  } catch (error) {
    console.error('Error fetching total tickets:', error);
    return 0;
  }
}

/**
 * Efficiently load all tickets for a player across multiple rounds
 * This is the recommended way to populate the MyTickets component
 */
export async function loadPlayerTicketHistory(
  playerAddress: string,
  maxRounds: number = 10
): Promise<{ roundId: number; isDrawn: boolean; winningNumbers: number[]; tickets: TicketEntry[] }[]> {
  try {
    const currentRound = await getCurrentRound();
    const startRound = Math.max(1, currentRound - maxRounds + 1);
    const allRounds = [];

    // Query each round
    for (let roundId = startRound; roundId <= currentRound; roundId++) {
      // Use the enhanced function to get round summary with player entries
      const roundSummary = await getRoundSummaryForPlayer(roundId, playerAddress);
      
      if (!roundSummary || !roundSummary.playerEntryIds || roundSummary.playerEntryIds.length === 0) {
        continue; // Skip rounds with no tickets
      }

      const tickets: TicketEntry[] = [];

      // Get each ticket using the enhanced get-ticket-info function
      for (const entryId of roundSummary.playerEntryIds) {
        const ticketInfo = await getTicketInfo(roundId, entryId, playerAddress);
        if (ticketInfo) {
          tickets.push(ticketInfo);
        }
      }

      allRounds.push({
        roundId,
        isDrawn: roundSummary.isDrawn,
        winningNumbers: roundSummary.winningNumbers,
        tickets,
      });
    }

    // Return in reverse order (newest first)
    return allRounds.reverse();
  } catch (error) {
    console.error('Error loading ticket history:', error);
    return [];
  }
}
