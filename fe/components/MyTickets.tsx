'use client';

import { useState, useEffect } from 'react';
import { userSession } from '@/lib/stacks-session';
import { Ticket, Calendar, Hash, Heart, Trophy, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface TicketEntry {
  roundId: number;
  entryId: number;
  numbers: number[];
  timestamp: number;
  charity?: string;
  matches?: number;
  isWinner?: boolean;
  prizeAmount?: number;
}

interface RoundData {
  roundId: number;
  isDrawn: boolean;
  winningNumbers: number[];
  tickets: TicketEntry[];
}

export function MyTickets() {
  const [isConnected, setIsConnected] = useState(false);
  const [tickets, setTickets] = useState<RoundData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRounds, setExpandedRounds] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsConnected(userSession.isUserSignedIn());
  }, []);

  const toggleRound = (roundId: number) => {
    setExpandedRounds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(roundId)) {
        newSet.delete(roundId);
      } else {
        newSet.add(roundId);
      }
      return newSet;
    });
  };

  const loadTickets = async () => {
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // For demo purposes, show mock data
      // In production, this would query the blockchain
      const mockTickets: RoundData[] = [
        {
          roundId: 3,
          isDrawn: true,
          winningNumbers: [7, 14, 21, 35, 42, 56],
          tickets: [
            {
              roundId: 3,
              entryId: 42,
              numbers: [7, 14, 21, 35, 42, 56],
              timestamp: Date.now() - 86400000 * 2,
              charity: 'Red Cross',
              matches: 6,
              isWinner: true,
              prizeAmount: 1000,
            },
            {
              roundId: 3,
              entryId: 43,
              numbers: [3, 12, 23, 45, 56, 67],
              timestamp: Date.now() - 86400000 * 2,
              matches: 1,
              isWinner: false,
            },
          ],
        },
        {
          roundId: 2,
          isDrawn: true,
          winningNumbers: [5, 12, 23, 34, 45, 67],
          tickets: [
            {
              roundId: 2,
              entryId: 25,
              numbers: [5, 12, 23, 34, 45, 68],
              timestamp: Date.now() - 86400000 * 9,
              charity: 'UNICEF',
              matches: 5,
              isWinner: true,
              prizeAmount: 50,
            },
          ],
        },
        {
          roundId: 1,
          isDrawn: false,
          winningNumbers: [],
          tickets: [
            {
              roundId: 1,
              entryId: 5,
              numbers: [1, 15, 27, 38, 49, 61],
              timestamp: Date.now() - 3600000,
            },
            {
              roundId: 1,
              entryId: 6,
              numbers: [8, 16, 24, 32, 40, 48],
              timestamp: Date.now() - 1800000,
              charity: 'Save the Children',
            },
          ],
        },
      ];

      setTickets(mockTickets);

      /* 
      // Actual blockchain integration (uncomment when contracts are deployed):
      const userData = userSession.loadUserData();
      const userAddress = userData.profile.stxAddress.testnet;
      
      // Get current round
      const currentRound = await callReadOnlyFunction({
        network: STACKS_TESTNET,
        contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        contractName: 'main-lottery',
        functionName: 'get-current-round',
        functionArgs: [],
        senderAddress: userAddress,
      });
      
      const roundId = cvToValue(currentRound);
      const allRounds: RoundData[] = [];
      
      // Query last 10 rounds
      for (let i = Math.max(1, roundId - 9); i <= roundId; i++) {
        // Get player entries for this round
        const entriesResponse = await callReadOnlyFunction({
          network: STACKS_TESTNET,
          contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
          contractName: 'main-lottery',
          functionName: 'get-player-entries',
          functionArgs: [uintCV(i), standardPrincipalCV(userAddress)],
          senderAddress: userAddress,
        });
        
        const entryIds = cvToValue(entriesResponse);
        
        if (entryIds.length > 0) {
          // Get round info
          const roundInfo = await callReadOnlyFunction({
            network: STACKS_TESTNET,
            contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
            contractName: 'main-lottery',
            functionName: 'get-round-info',
            functionArgs: [uintCV(i)],
            senderAddress: userAddress,
          });
          
          const roundData = cvToValue(roundInfo);
          const tickets: TicketEntry[] = [];
          
          // Get each entry details
          for (const entryId of entryIds) {
            const entryResponse = await callReadOnlyFunction({
              network: STACKS_TESTNET,
              contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
              contractName: 'main-lottery',
              functionName: 'get-entry',
              functionArgs: [uintCV(i), uintCV(entryId)],
              senderAddress: userAddress,
            });
            
            const entry = cvToValue(entryResponse);
            
            // Check if winner
            let matches = 0;
            if (roundData.isDrawn) {
              const matchesResponse = await callReadOnlyFunction({
                network: STACKS_TESTNET,
                contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
                contractName: 'main-lottery',
                functionName: 'check-winner',
                functionArgs: [uintCV(i), uintCV(entryId)],
                senderAddress: userAddress,
              });
              matches = cvToValue(matchesResponse);
            }
            
            tickets.push({
              roundId: i,
              entryId,
              numbers: entry.numbers,
              timestamp: entry.timestamp,
              charity: entry.selectedCharity,
              matches: roundData.isDrawn ? matches : undefined,
              isWinner: matches >= 3,
            });
          }
          
          allRounds.push({
            roundId: i,
            isDrawn: roundData.isDrawn,
            winningNumbers: roundData.winningNumbers,
            tickets,
          });
        }
      }
      
      setTickets(allRounds.reverse());
      */
    } catch (err: any) {
      console.error('Error loading tickets:', err);
      setError(err.message || 'Failed to load tickets');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      loadTickets();
    }
  }, [isConnected]);

  const getTierLabel = (matches: number) => {
    if (matches === 6) return 'JACKPOT';
    if (matches === 5) return 'Tier 2';
    if (matches === 4) return 'Tier 3';
    if (matches === 3) return 'Tier 4';
    return 'No Prize';
  };

  const getTierColor = (matches: number) => {
    if (matches === 6) return 'text-yellow-500';
    if (matches === 5) return 'text-purple-500';
    if (matches === 4) return 'text-blue-500';
    if (matches === 3) return 'text-green-500';
    return 'text-gray-400';
  };

  if (!isConnected) {
    return (
      <div className="bg-gradient-to-b from-[#2d1b4e] to-[#1a0f2e] rounded-2xl p-6 shadow-2xl border-2 border-purple-700/40">
        <div>
          <h2 className="text-2xl font-black mb-5" style={{ fontFamily: 'Impact, sans-serif', fontStyle: 'italic', letterSpacing: '0.02em' }}>
            <span className="text-white">PLAY. </span>
            <span className="text-[#FFB800]">EARN. </span>
            <span className="text-white">GIVE.</span>
          </h2>
          <div className="flex gap-8 mb-6">
            <button className="text-white text-base border-b-2 border-[#FFB800] pb-1.5 font-black tracking-wide" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
              MY TICKETS
            </button>
            <button className="text-white/40 text-base pb-1.5 font-black hover:text-white transition-colors tracking-wide" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
              RAFFLES HISTORY
            </button>
          </div>
          <div className="bg-[#1a0f2e]/60 rounded-xl p-16 text-center border-2 border-purple-700/40 hover:border-purple-500/60 transition-all duration-300">
            <p className="text-[#FFB800] text-lg font-black uppercase tracking-wider leading-relaxed" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.1em' }}>
              YOU DON&apos;T HAVE<br />ANY TICKETS YET
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#2d1b4e] to-[#1a0f2e] rounded-2xl p-6 shadow-2xl border-2 border-purple-700/40">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Impact, sans-serif', fontStyle: 'italic', letterSpacing: '0.02em' }}>
            <span className="text-white">PLAY. </span>
            <span className="text-[#FFB800]">EARN. </span>
            <span className="text-white">GIVE.</span>
          </h2>
          <div className="flex gap-8">
            <button className="text-white text-base border-b-2 border-[#FFB800] pb-1.5 font-black tracking-wide" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
              MY TICKETS
            </button>
            <button className="text-white/40 text-base pb-1.5 font-black hover:text-white transition-colors tracking-wide" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
              RAFFLES HISTORY
            </button>
          </div>
        </div>
        <button
          onClick={loadTickets}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FFB800] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-[#1a0f2e] rounded-full text-sm font-black transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg hover:shadow-[#FFB800]/50 border border-[#FFB800]/30"
          style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}
        >
          <RefreshCw className={isLoading ? 'animate-spin' : ''} size={16} strokeWidth={3} />
          REFRESH
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-900/30 border-2 border-red-700/60 rounded-xl">
          <p className="text-sm text-red-200 font-semibold">{error}</p>
        </div>
      )}

      <div className="text-xs text-white/60 mb-4 font-bold tracking-wide" style={{ fontFamily: 'Impact, sans-serif' }}>
        TOTAL TICKETS: {tickets.reduce((acc, round) => acc + round.tickets.length, 0)} ACROSS {tickets.length} ROUNDS
      </div>

      {isLoading ? (
        <div className="text-center py-16 bg-[#1a0f2e]/60 rounded-xl border-2 border-purple-700/40">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#FFB800] border-t-transparent"></div>
          <p className="mt-4 text-white/60 text-sm font-bold tracking-wide" style={{ fontFamily: 'Impact, sans-serif' }}>LOADING TICKETS...</p>
        </div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-16 bg-[#1a0f2e]/60 rounded-xl border-2 border-purple-700/40 hover:border-purple-500/60 transition-all duration-300">
          <p className="text-[#FFB800] text-lg font-black uppercase tracking-wider leading-relaxed" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.1em' }}>
            YOU DON&apos;T HAVE<br />ANY TICKETS YET
          </p>
        </div>
      ) : (
        <div className="space-y-3">

          {tickets.map((round) => (
            <div
              key={round.roundId}
              className="border-2 border-purple-700/40 rounded-xl overflow-hidden bg-[#1a0f2e]/40 hover:border-purple-500/60 transition-all duration-300"
            >
              <button
                onClick={() => toggleRound(round.roundId)}
                className="w-full px-5 py-4 bg-[#2d1b4e]/50 hover:bg-[#2d1b4e] transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="text-[#FFB800]" size={20} strokeWidth={2.5} />
                  <div className="text-left">
                    <h3 className="font-black text-white text-base tracking-wide" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
                      ROUND #{round.roundId}
                    </h3>
                    <p className="text-xs text-white/60 font-bold mt-0.5" style={{ fontFamily: 'Impact, sans-serif' }}>
                      {round.tickets.length} TICKET{round.tickets.length !== 1 ? 'S' : ''}
                      {round.isDrawn && ' • DRAW COMPLETE'}
                      {!round.isDrawn && ' • ACTIVE ROUND'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {round.isDrawn && round.tickets.some(t => t.isWinner) && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-900/40 rounded-full border border-green-500/30">
                      <Trophy className="text-green-400" size={14} strokeWidth={2.5} />
                      <span className="text-xs font-black text-green-300 tracking-wide" style={{ fontFamily: 'Impact, sans-serif' }}>
                        WINNER!
                      </span>
                    </div>
                  )}
                  {expandedRounds.has(round.roundId) ? (
                    <ChevronUp className="text-white/50" size={20} strokeWidth={2.5} />
                  ) : (
                    <ChevronDown className="text-white/50" size={20} strokeWidth={2.5} />
                  )}
                </div>
              </button>

              {expandedRounds.has(round.roundId) && (
                <div className="p-4 space-y-3">
                  {round.isDrawn && (
                    <div className="mb-3 p-4 bg-blue-900/30 border-2 border-blue-700/60 rounded-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <Trophy className="text-blue-400" size={18} strokeWidth={2.5} />
                        <span className="text-sm font-black text-blue-300 tracking-wide" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
                          WINNING NUMBERS
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {round.winningNumbers.map((num, idx) => (
                          <div
                            key={idx}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-black text-sm shadow-lg border-2 border-blue-400/50"
                            style={{ fontFamily: 'Impact, sans-serif' }}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {round.tickets.map((ticket) => (
                    <div
                      key={ticket.entryId}
                      className={`p-4 rounded-xl border-2 ${
                        ticket.isWinner
                          ? 'bg-green-900/30 border-green-700/60'
                          : 'bg-[#1a0f2e]/60 border-purple-700/40'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Hash className="text-white/60" size={16} strokeWidth={2.5} />
                          <span className="text-sm font-black font-mono text-white/80 tracking-wide" style={{ fontFamily: 'Impact, sans-serif' }}>
                            ENTRY #{ticket.entryId}
                          </span>
                        </div>
                        {ticket.charity && (
                          <div className="flex items-center gap-1.5 text-xs text-pink-400 font-bold">
                            <Heart size={14} strokeWidth={2.5} />
                            <span>{ticket.charity}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 mb-3">
                        {ticket.numbers.map((num, idx) => {
                          const isMatch = round.isDrawn && round.winningNumbers.includes(num);
                          return (
                            <div
                              key={idx}
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-lg ${
                                isMatch
                                  ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white ring-2 ring-green-400 number-glow'
                                  : 'bg-[#3d2b5e] text-white border border-purple-500/30'
                              }`}
                              style={{ fontFamily: 'Impact, sans-serif' }}
                            >
                              {num}
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between text-xs text-white/60 font-bold">
                        <span>
                          {new Date(ticket.timestamp).toLocaleDateString()}
                        </span>
                        {round.isDrawn && typeof ticket.matches === 'number' && (
                          <div className="flex items-center gap-2">
                            <span className={`font-black ${getTierColor(ticket.matches)}`} style={{ fontFamily: 'Impact, sans-serif' }}>
                              {ticket.matches} MATCH{ticket.matches !== 1 ? 'ES' : ''}
                            </span>
                            {ticket.isWinner && (
                              <span className="px-2 py-1 bg-yellow-900/40 text-yellow-300 rounded-full text-xs font-black border border-yellow-500/30" style={{ fontFamily: 'Impact, sans-serif' }}>
                                {getTierLabel(ticket.matches)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {ticket.isWinner && ticket.prizeAmount && (
                        <div className="mt-3 pt-3 border-t-2 border-green-700/40">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/70 font-bold" style={{ fontFamily: 'Impact, sans-serif' }}>PRIZE:</span>
                            <span className="text-base font-black text-green-400" style={{ fontFamily: 'Impact, sans-serif' }}>
                              {ticket.prizeAmount} STX
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
