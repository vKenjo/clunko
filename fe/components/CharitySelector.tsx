'use client';

import { Heart } from 'lucide-react';

interface CharitySelectorProps {
  selectedCharity: string;
  onCharityChange: (charity: string) => void;
  disabled?: boolean;
}

export function CharitySelector({ selectedCharity, onCharityChange, disabled = false }: CharitySelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Heart className="text-red-500" size={20} />
        <h3 className="text-lg font-semibold">Select Charity (Optional)</h3>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400">
        If you win with 6 matches, 10% of the total prize pool will be donated to your selected charity.
      </p>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Charity Wallet Address
        </label>
        <input
          type="text"
          value={selectedCharity}
          onChange={(e) => onCharityChange(e.target.value)}
          disabled={disabled}
          placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM (optional)"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
        />
        <p className="text-xs text-gray-500">
          Enter a valid Stacks address or leave empty
        </p>
      </div>
    </div>
  );
}
