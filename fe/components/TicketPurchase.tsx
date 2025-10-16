'use client';

import { useState, useEffect } from 'react';
import { NumberPicker } from './NumberPicker';
import { CharitySelector } from './CharitySelector';
import { userSession } from '@/lib/stacks-session';
import { openContractCall } from '@stacks/connect';
import { 
  uintCV,
  listCV,
  standardPrincipalCV,
  someCV,
  noneCV,
  PostConditionMode
} from '@stacks/transactions';
import { getNetwork, CONTRACTS, TICKET_PRICE } from '@/lib/stacks-config';
import { Ticket, AlertCircle, CheckCircle } from 'lucide-react';

const TICKET_PRICE_STX = TICKET_PRICE / 1000000; // Convert microSTX to STX for display

export function TicketPurchase() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedCharity, setSelectedCharity] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    setIsConnected(userSession.isUserSignedIn());
  }, []);

  const handlePurchaseTicket = async () => {
    if (!isConnected) {
      setMessage({ type: 'error', text: 'Please connect your wallet first' });
      return;
    }

    if (selectedNumbers.length !== 6) {
      setMessage({ type: 'error', text: 'Please select exactly 6 numbers' });
      return;
    }

    // Validate numbers are in range
    const invalidNumbers = selectedNumbers.filter(n => n < 1 || n > 59);
    if (invalidNumbers.length > 0) {
      setMessage({ type: 'error', text: 'Numbers must be between 1 and 59' });
      return;
    }

    // Check for duplicates
    const uniqueNumbers = new Set(selectedNumbers);
    if (uniqueNumbers.size !== 6) {
      setMessage({ type: 'error', text: 'Please select 6 different numbers' });
      return;
    }

    setIsPurchasing(true);
    setMessage(null);

    try {
      const userData = userSession.loadUserData();
      const network = getNetwork();
      
      // Parse contract address - handle both formats
      let contractAddress: string;
      let contractName: string;
      
      if (CONTRACTS.mainLottery.includes('.')) {
        [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');
      } else {
        throw new Error('Invalid contract format. Expected format: ADDRESS.CONTRACT_NAME');
      }

      if (!contractAddress || !contractName) {
        throw new Error('Contract address or name is missing. Please check your configuration.');
      }

      // Validate contract address format
      if (!contractAddress.startsWith('ST') && !contractAddress.startsWith('SP')) {
        throw new Error('Invalid contract address format. Must start with ST or SP.');
      }

      // Prepare function arguments
      const functionArgs = [
        listCV(selectedNumbers.map(n => uintCV(n))),
        selectedCharity 
          ? someCV(standardPrincipalCV(selectedCharity))
          : noneCV()
      ];

      console.log('Submitting ticket purchase:', {
        contractAddress,
        contractName,
        numbers: selectedNumbers,
        charity: selectedCharity || 'none',
        fullContract: `${contractAddress}.${contractName}`
      });

      // Execute the contract call - this will deduct 1 STX from user's wallet
      await openContractCall({
        network,
        anchorMode: 1,
        contractAddress,
        contractName,
        functionName: 'buy-ticket',
        functionArgs,
        postConditionMode: PostConditionMode.Allow, // Allow mode - contract will handle STX transfer
        postConditions: [],
        onFinish: (data) => {
          console.log('Transaction submitted successfully:', data);
          setMessage({ 
            type: 'success', 
            text: `✅ Ticket purchased! Numbers: ${selectedNumbers.join(', ')}${selectedCharity ? ' | Charity selected' : ''} - 1 STX deducted. Transaction ID: ${data.txId}` 
          });
          
          // Reset selections after successful submission
          setSelectedNumbers([]);
          setSelectedCharity('');
          setIsPurchasing(false);
        },
        onCancel: () => {
          console.log('Transaction cancelled by user');
          setMessage({ type: 'error', text: 'Transaction cancelled by user' });
          setIsPurchasing(false);
        },
      });
    } catch (error: any) {
      console.error('Purchase error:', error);
      
      let errorMessage = 'Failed to purchase ticket. Please try again.';
      
      // Handle specific error cases
      if (error.message?.includes('Insufficient balance')) {
        errorMessage = 'Insufficient STX balance. You need at least 1 STX plus gas fees.';
      } else if (error.message?.includes('User rejected')) {
        errorMessage = 'Transaction was rejected';
      } else if (error.message?.includes('Not a valid contract') || error.message?.includes('contract not found')) {
        errorMessage = '❌ Contract not deployed yet. Please deploy the contracts first using: cd projectx && clarinet integrate';
      } else if (error.message?.includes('Invalid contract')) {
        errorMessage = 'Invalid contract configuration. Please check your .env.local file.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setMessage({ 
        type: 'error', 
        text: errorMessage
      });
      setIsPurchasing(false);
    }
  };

  return (
    <div className="bg-[#2a1f3d] rounded-xl p-6 shadow-xl border border-purple-700/20">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Ticket className="text-white" size={18} />
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">Purchase Ticket</h2>
        </div>
        <div className="bg-[#FFB800]/20 border border-[#FFB800]/50 rounded-full px-3 py-1">
          <span className="text-[#FFB800] font-bold text-sm">{TICKET_PRICE_STX} STX</span>
        </div>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg flex items-start gap-2 ${
          message.type === 'success' 
            ? 'bg-green-900/20 border border-green-700/50' 
            : 'bg-red-900/20 border border-red-700/50'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
          ) : (
            <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
          )}
          <p className={`text-xs ${
            message.type === 'success' 
              ? 'text-green-200' 
              : 'text-red-200'
          }`}>
            {message.text}
          </p>
        </div>
      )}

      {!isConnected && (
        <div className="mb-4 p-3 bg-blue-900/20 border border-blue-700/50 rounded-lg">
          <p className="text-xs text-blue-200">
            ℹ️ Connect your wallet to purchase tickets
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <NumberPicker 
            selectedNumbers={selectedNumbers}
            onNumbersChange={setSelectedNumbers}
            disabled={!isConnected || isPurchasing}
          />
        </div>

        <div>
          <CharitySelector 
            selectedCharity={selectedCharity}
            onCharityChange={setSelectedCharity}
            disabled={!isConnected || isPurchasing}
          />
        </div>

        <button
          onClick={handlePurchaseTicket}
          disabled={!isConnected || selectedNumbers.length !== 6 || isPurchasing}
          className={`w-full py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all transform ${
            !isConnected || selectedNumbers.length !== 6 || isPurchasing
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-[#FFB800] hover:bg-[#FFA500] text-[#1a0f2e] shadow-xl hover:scale-[1.02]'
          }`}
        >
          {isPurchasing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Processing...
            </span>
          ) : (
            `Submit Entry (${TICKET_PRICE_STX} STX)`
          )}
        </button>
      </div>
    </div>
  );
}
