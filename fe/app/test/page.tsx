'use client';

import { useState } from 'react';
import { 
  uintCV,
  listCV,
  noneCV,
  makeContractCall,
  broadcastTransaction,
  AnchorMode
} from '@stacks/transactions';
import { STACKS_DEVNET } from '@stacks/network';
import { CONTRACTS } from '@/lib/stacks-config';

const DEVNET_PRIVATE_KEY = '753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601';
const DEVNET_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

export default function TestPage() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [message, setMessage] = useState('');

  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  const handlePurchase = async () => {
    if (selectedNumbers.length !== 6) {
      setMessage('❌ Please select exactly 6 numbers');
      return;
    }

    setIsPurchasing(true);
    setMessage('⏳ Purchasing ticket...');

    try {
      const network = STACKS_DEVNET;
      const [contractAddress, contractName] = CONTRACTS.mainLottery.split('.');

      const txOptions = {
        contractAddress,
        contractName,
        functionName: 'buy-ticket',
        functionArgs: [
          listCV(selectedNumbers.map(n => uintCV(n))),
          noneCV()
        ],
        senderKey: DEVNET_PRIVATE_KEY,
        network,
        anchorMode: AnchorMode.Any,
        fee: 200000,
      };

      const transaction = await makeContractCall(txOptions);
      const response = await broadcastTransaction({ transaction, network });

      const txid = typeof response === 'string' ? response : response.txid;
      setMessage(`✅ Ticket purchased! TX: ${txid}`);
      setSelectedNumbers([]);
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] to-[#2d1b4e] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">🎰 Lottery Test Page</h1>
        <p className="text-cyan-400 mb-8">Direct devnet testing - No wallet needed!</p>
        
        <div className="bg-[#2a1f3d] rounded-xl p-6 shadow-xl border border-purple-700/20 mb-6">
          <div className="mb-4 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
            <p className="text-sm text-blue-200">
              🧪 <strong>Development Mode</strong><br/>
              Using: {DEVNET_ADDRESS}<br/>
              Network: Local Devnet (http://localhost:3999)
            </p>
          </div>

          <h2 className="text-xl font-bold text-white mb-4">
            Select 6 numbers (1-59)
          </h2>

          <div className="grid grid-cols-10 gap-2 mb-6">
            {Array.from({ length: 59 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => toggleNumber(num)}
                disabled={isPurchasing}
                className={`
                  w-full aspect-square rounded-lg font-bold text-sm transition-all
                  ${selectedNumbers.includes(num)
                    ? 'bg-red-600 text-white scale-110 shadow-lg'
                    : 'bg-[#3a2f5d] text-white/70 hover:bg-[#4a3f6d]'
                  }
                  ${isPurchasing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="mb-4 p-4 bg-purple-900/20 border border-purple-700/50 rounded-lg">
            <p className="text-white font-semibold">
              Selected: {selectedNumbers.length === 0 ? 'None' : selectedNumbers.join(', ')}
            </p>
          </div>

          <button
            onClick={handlePurchase}
            disabled={selectedNumbers.length !== 6 || isPurchasing}
            className={`
              w-full py-4 rounded-full font-bold text-lg uppercase tracking-wider transition-all
              ${selectedNumbers.length === 6 && !isPurchasing
                ? 'bg-[#FFB800] hover:bg-[#FFA500] text-[#1a0f2e] shadow-xl hover:scale-[1.02]'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {isPurchasing ? '⏳ Processing...' : 'Purchase Ticket (1 STX)'}
          </button>

          {message && (
            <div className={`mt-4 p-4 rounded-lg ${
              message.includes('✅') 
                ? 'bg-green-900/20 border border-green-700/50 text-green-200'
                : message.includes('❌')
                ? 'bg-red-900/20 border border-red-700/50 text-red-200'
                : 'bg-blue-900/20 border border-blue-700/50 text-blue-200'
            }`}>
              <p className="text-sm break-all">{message}</p>
            </div>
          )}
        </div>

        <div className="bg-[#2a1f3d] rounded-xl p-6 shadow-xl border border-purple-700/20">
          <h2 className="text-xl font-bold text-white mb-4">📋 Instructions</h2>
          <ol className="text-white/80 text-sm space-y-2">
            <li>1. Select any 6 numbers from the grid above</li>
            <li>2. Click "Purchase Ticket"</li>
            <li>3. Wait a few seconds for the transaction to confirm</li>
            <li>4. You'll see a success message with the transaction ID</li>
            <li>5. Select new numbers and purchase again!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
