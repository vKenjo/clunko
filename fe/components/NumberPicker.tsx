'use client';

import { useState } from 'react';
import { MIN_NUMBER, MAX_NUMBER, NUMBERS_TO_SELECT } from '@/lib/stacks-config';
import { Shuffle } from 'lucide-react';

interface NumberPickerProps {
  selectedNumbers: number[];
  onNumbersChange: (numbers: number[]) => void;
  disabled?: boolean;
}

export function NumberPicker({ selectedNumbers, onNumbersChange, disabled = false }: NumberPickerProps) {
  const toggleNumber = (num: number) => {
    if (disabled) return;
    if (selectedNumbers.includes(num)) {
      onNumbersChange(selectedNumbers.filter(n => n !== num));
    } else if (selectedNumbers.length < NUMBERS_TO_SELECT) {
      onNumbersChange([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  const quickPick = () => {
    if (disabled) return;
    const numbers: number[] = [];
    while (numbers.length < NUMBERS_TO_SELECT) {
      const num = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    onNumbersChange(numbers.sort((a, b) => a - b));
  };

  const clearNumbers = () => {
    onNumbersChange([]);
  };

  // Create grid of numbers
  const numberGrid = Array.from({ length: MAX_NUMBER }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      {/* Header with title and buttons */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-white">Select 6 numbers (1-59)</h3>
        <div className="flex gap-2">
          <button
            onClick={quickPick}
            disabled={disabled}
            className={`px-4 py-1.5 rounded-full transition-colors flex items-center gap-1.5 text-xs font-bold ${
              disabled 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-[#FFB800] text-[#1a0f2e] hover:bg-[#FFA500]'
            }`}
          >
            <Shuffle size={14} />
            Quick Pick
          </button>
          {selectedNumbers.length > 0 && (
            <button
              onClick={clearNumbers}
              disabled={disabled}
              className={`px-4 py-1.5 rounded-full transition-colors text-xs font-bold ${
                disabled 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#4d4d4d] text-white hover:bg-[#5d5d5d]'
              }`}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Selected Numbers Display - Above the grid with beige/tan background */}
      <div className="bg-[#8b7d6b] rounded-lg p-4 min-h-[80px] flex items-center justify-center gap-2.5">
        {selectedNumbers.length === 0 ? (
          <p className="text-[#3d2b5e] text-sm font-medium">Select 6 numbers from below</p>
        ) : (
          selectedNumbers.map((num) => (
            <div
              key={num}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c9302c] to-[#a02622] flex items-center justify-center text-white font-bold text-xl shadow-lg animate-in zoom-in-50 duration-200"
            >
              {num}
            </div>
          ))
        )}
      </div>

      {/* Number Grid */}
      <div className="rounded-lg">
        <div className="grid grid-cols-10 gap-2">
          {numberGrid.map(num => {
            const isSelected = selectedNumbers.includes(num);
            return (
              <button
                key={num}
                onClick={() => toggleNumber(num)}
                disabled={disabled || (!isSelected && selectedNumbers.length >= NUMBERS_TO_SELECT)}
                className={`
                  w-full aspect-square rounded-lg font-bold text-sm transition-all
                  ${isSelected 
                    ? 'bg-gradient-to-br from-[#c9302c] to-[#a02622] text-white shadow-lg scale-105' 
                    : 'bg-[#4d4361] text-white hover:bg-[#5d5371]'
                  }
                  ${(disabled || (!isSelected && selectedNumbers.length >= NUMBERS_TO_SELECT)) ? 'opacity-40 cursor-not-allowed' : ''}
                `}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
