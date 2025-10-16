import {
  uintCV,
  listCV,
  principalCV,
  someCV,
  noneCV,
  cvToJSON,
  ClarityValue,
} from '@stacks/transactions';

export const microStxToStx = (microStx: number): string => {
  return (microStx / 1000000).toFixed(6);
};

export const stxToMicroStx = (stx: number): number => {
  return Math.floor(stx * 1000000);
};

export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const numbersToListCV = (numbers: number[]): ClarityValue => {
  return listCV(numbers.map(n => uintCV(n)));
};

export const charityToCV = (charity: string | null): ClarityValue => {
  if (charity && charity.trim() !== '') {
    return someCV(principalCV(charity));
  }
  return noneCV();
};

export const parseRoundInfo = (clarityValue: any) => {
  try {
    const data = cvToJSON(clarityValue);
    return {
      startBlock: data.value['start-block']?.value || 0,
      endBlock: data.value['end-block']?.value || 0,
      isOpen: data.value['is-open']?.value || false,
      isDrawn: data.value['is-drawn']?.value || false,
      drawTimestamp: data.value['draw-timestamp']?.value || 0,
      totalPool: data.value['total-pool']?.value || 0,
      winningNumbers: data.value['winning-numbers']?.value?.map((n: any) => n.value) || [],
      charityPool: data.value['charity-pool']?.value || 0,
      allWinnersPaid: data.value['all-winners-paid']?.value || false,
      totalWinners: data.value['total-winners']?.value || 0,
      paidWinners: data.value['paid-winners']?.value || 0,
    };
  } catch (error) {
    console.error('Error parsing round info:', error);
    return null;
  }
};

export const parseEntry = (clarityValue: any) => {
  try {
    const data = cvToJSON(clarityValue);
    return {
      player: data.value?.player?.value || '',
      numbers: data.value?.numbers?.value?.map((n: any) => n.value) || [],
      timestamp: data.value?.timestamp?.value || 0,
      selectedCharity: data.value['selected-charity']?.value?.value || null,
    };
  } catch (error) {
    console.error('Error parsing entry:', error);
    return null;
  }
};
