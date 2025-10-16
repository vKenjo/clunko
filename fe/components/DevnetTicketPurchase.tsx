'use client';

import { useState } from 'react';
import { NumberPicker } from './NumberPicker';
import { CharitySelector } from './CharitySelector';
import { 
  uintCV,
  listCV,
  standardPrincipalCV,
  someCV,
  noneCV,
  makeContractCall,
  broadcastTransaction,
  AnchorMode
} from '@stacks/transactions';
import { STACKS_DEVNET } from '@stacks/network';
import { getNetwork, CONTRACTS, TICKET_PRICE } from '@/lib/stacks-config';
import { Ticket, AlertCircle, CheckCircle } from 'lucide-react';

const TICKET_PRICE_STX = TICKET_PRICE / 1000000;

// Devnet test account (for development only!)
const DEVNET_PRIVATE_KEY = '753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601';
const DEVNET_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

export function DevnetTicketPurchase() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedCharity, setSelectedCharity] = useState<string>('');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handlePurchaseTicket = async () => {
    if (selectedNumbers.length !== 6) {
      setMessage({ type: 'error', text: 'Please select exactly 6 numbers' });
      return;
    }

    const invalidNumbers = selectedNumbers.filter(n => n < 1 || n > 59);
    if (invalidNumbers.length > 0) {
      setMessage({ type: 'error', text: 'Numbers must be between 1 and 59' });
      return;
    }

    const uniqueNumbers = new Set(selectedNumbers);
    if (uniqueNumbers.size !== 6) {
      setMessage({ type: 'error', text: 'Please select 6 different numbers' });
      return;
    }

    setIsPurchasing(true);
    setMessage(null);

    try {
      const network = STACKS_DEVNET;
      const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');

      const functionArgs = [
        listCV(selectedNumbers.map(n => uintCV(n))),
        selectedCharity 
          ? someCV(standardPrincipalCV(selectedCharity))
          : noneCV()
      ];

      console.log('🎟️ Purchasing ticket with devnet account...', {
        numbers: selectedNumbers,
        charity: selectedCharity || 'none',
      });

      const txOptions = {
        contractAddress,
        contractName,
        functionName: 'buy-ticket',
        functionArgs,
        senderKey: DEVNET_PRIVATE_KEY,
        network,
        anchorMode: AnchorMode.Any,
        fee: 200000, // 0.2 STX
      };

      const transaction = await makeContractCall(txOptions);
      const response = await broadcastTransaction({ transaction, network });

      if (typeof response === 'object' && 'error' in response) {
        throw new Error(response.error || 'Transaction failed');
      }

      console.log('✅ Transaction successful:', response);
      
      setMessage({ 
        type: 'success', 
        text: `✅ Ticket purchased! Numbers: ${selectedNumbers.join(', ')}${selectedCharity ? ' | Charity selected' : ''}. TX: ${typeof response === 'string' ? response : response.txid}` 
      });
      
      setSelectedNumbers([]);
      setSelectedCharity('');
    } catch (error: any) {
      console.error('Purchase error:', error);
      setMessage({ 
        type: 'error', 
        text: `Failed to purchase ticket: ${error.message}` 
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="bg-[#2a1f3d] rounded-xl p-6 shadow-xl border border-purple-700/20">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Ticket className="text-white" size={18} />
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">Purchase Ticket (Devnet Mode)</h2>
        </div>
        <div className="bg-[#FFB800]/20 border border-[#FFB800]/50 rounded-full px-3 py-1">
          <span className="text-[#FFB800] font-bold text-sm">{TICKET_PRICE_STX} STX</span>
        </div>
      </div>

      <div className="mb-4 p-3 bg-blue-900/20 border border-blue-700/50 rounded-lg">
        <p className="text-xs text-blue-200">
          🧪 <strong>Development Mode:</strong> Using pre-funded devnet account ({DEVNET_ADDRESS.slice(0, 10)}...)
        </p>
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

      <div className="space-y-4">
        <div>
          <NumberPicker 
            selectedNumbers={selectedNumbers}
            onNumbersChange={setSelectedNumbers}
            disabled={isPurchasing}
          />
        </div>

        <div>
          <CharitySelector 
            selectedCharity={selectedCharity}
            onCharityChange={setSelectedCharity}
            disabled={isPurchasing}
          />
        </div>

        <button
          onClick={handlePurchaseTicket}
          disabled={selectedNumbers.length !== 6 || isPurchasing}
          className={`w-full py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all transform ${
            selectedNumbers.length !== 6 || isPurchasing
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
