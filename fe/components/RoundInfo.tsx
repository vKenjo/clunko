'use client';

import { useState, useEffect } from 'react';
import { Clock, TrendingUp, Users, Calendar } from 'lucide-react';

interface RoundData {
  currentRound: number;
  prizePool: number;
  totalTickets: number;
  drawTime: Date;
  status: 'active' | 'drawing' | 'closed';
}

export function RoundInfo() {
  const [roundData, setRoundData] = useState<RoundData>({
    currentRound: 1,
    prizePool: 100000,
    totalTickets: 123,
    drawTime: new Date('2025-10-17T22:59:59'),
    status: 'active'
  });
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = roundData.drawTime.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [roundData.drawTime]);

  const canEnter = roundData.status === 'active' && 
    (timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0);

  const formatTime = (value: number) => String(value).padStart(2, '0');

  return (
    <div className="bg-transparent rounded-none shadow-none border-none overflow-visible">
      {/* Top Section: Title and Countdown - No background box */}
      <div className="text-center px-6 pt-2 pb-6">
        <p className="text-[#FFB800] text-sm font-black mb-3 tracking-widest uppercase animate-pulse" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.15em' }}>
          ⚡ NEXT JACKPOT IN ⚡
        </p>
        <h3 className="text-5xl md:text-6xl font-black mb-8 text-glow" style={{ fontFamily: 'Impact, sans-serif', fontStyle: 'italic', letterSpacing: '0.02em' }}>
          <span className="text-white">6 DIGIT </span>
          <span className="text-[#FFB800]">MEGA LOTTERY</span>
        </h3>

        {/* Main Countdown Timer with enhanced styling */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="bg-gradient-to-b from-[#2d1b4e] to-[#1f1235] px-6 py-4 rounded-2xl border-2 border-[#FFB800]/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <span className="text-6xl md:text-7xl font-black text-[#FFB800] tabular-nums text-glow" style={{ fontFamily: 'Impact, sans-serif' }}>{formatTime(timeLeft.days)}</span>
            <p className="text-xs text-white/60 font-bold mt-1 uppercase tracking-wider">Days</p>
          </div>
          <span className="text-5xl md:text-6xl font-black text-[#FFB800] animate-pulse">:</span>
          <div className="bg-gradient-to-b from-[#2d1b4e] to-[#1f1235] px-6 py-4 rounded-2xl border-2 border-[#FFB800]/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <span className="text-6xl md:text-7xl font-black text-[#FFB800] tabular-nums text-glow" style={{ fontFamily: 'Impact, sans-serif' }}>{formatTime(timeLeft.hours)}</span>
            <p className="text-xs text-white/60 font-bold mt-1 uppercase tracking-wider">Hours</p>
          </div>
          <span className="text-5xl md:text-6xl font-black text-[#FFB800] animate-pulse">:</span>
          <div className="bg-gradient-to-b from-[#2d1b4e] to-[#1f1235] px-6 py-4 rounded-2xl border-2 border-[#FFB800]/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <span className="text-6xl md:text-7xl font-black text-[#FFB800] tabular-nums text-glow" style={{ fontFamily: 'Impact, sans-serif' }}>{formatTime(timeLeft.minutes)}</span>
            <p className="text-xs text-white/60 font-bold mt-1 uppercase tracking-wider">Mins</p>
          </div>
          <span className="text-5xl md:text-6xl font-black text-[#FFB800] animate-pulse">:</span>
          <div className="bg-gradient-to-b from-[#2d1b4e] to-[#1f1235] px-6 py-4 rounded-2xl border-2 border-[#FFB800]/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <span className="text-6xl md:text-7xl font-black text-[#FFB800] tabular-nums text-glow" style={{ fontFamily: 'Impact, sans-serif' }}>{formatTime(timeLeft.seconds)}</span>
            <p className="text-xs text-white/60 font-bold mt-1 uppercase tracking-wider">Secs</p>
          </div>
        </div>
        
        {/* Progress bar with glow */}
        <div className="w-full max-w-2xl mx-auto bg-[#1f1235] rounded-full h-3 mb-4 overflow-hidden border border-purple-500/30 shadow-inner">
          <div className="bg-gradient-to-r from-[#FFB800] via-[#FFA500] to-[#FFB800] h-3 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(255,184,0,0.8)] animate-pulse" style={{ width: '60%' }}></div>
        </div>
        
        <p className="text-white/80 text-sm font-bold tracking-wider" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.1em' }}>
          📅 OCT 14, 2025 - 11:00 PM [UTC]
        </p>
      </div>

      {/* Current Round Info - Separate card */}
      <div className="bg-gradient-to-b from-[#2d1b4e] to-[#1f1235] backdrop-blur-xl rounded-2xl px-6 py-5 border-2 border-purple-700/40 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <Clock className="text-[#FFB800] animate-pulse" size={24} strokeWidth={2.5} />
            <h3 className="text-xl font-black text-white uppercase tracking-wider" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.1em' }}>
              CURRENT ROUND
            </h3>
          </div>
          <button className="text-white/60 hover:text-white transition-colors text-2xl leading-none transform hover:scale-110">✕</button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-gradient-to-b from-[#3d2654] to-[#2a1a3e] rounded-xl p-5 text-center border border-purple-500/30 transform hover:scale-105 transition-all duration-300 hover:border-[#FFB800]/50 group">
            <div className="flex items-center justify-center gap-2 mb-3">
              <TrendingUp className="text-[#FFB800] group-hover:scale-110 transition-transform" size={18} strokeWidth={2.5} />
              <span className="text-white/70 text-xs font-black uppercase tracking-wider" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.1em' }}>Prize Pool</span>
            </div>
            <p className="text-3xl font-black text-white group-hover:text-[#FFB800] transition-colors" style={{ fontFamily: 'Impact, sans-serif' }}>
              $ {roundData.prizePool.toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-b from-[#3d2654] to-[#2a1a3e] rounded-xl p-5 text-center border border-purple-500/30 transform hover:scale-105 transition-all duration-300 hover:border-[#FFB800]/50 group">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="text-[#FFB800] group-hover:scale-110 transition-transform" size={18} strokeWidth={2.5} />
              <span className="text-white/70 text-xs font-black uppercase tracking-wider" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.1em' }}>Total Tickets</span>
            </div>
            <p className="text-3xl font-black text-white group-hover:text-[#FFB800] transition-colors" style={{ fontFamily: 'Impact, sans-serif' }}>
              {roundData.totalTickets}
            </p>
          </div>
          <div className="bg-gradient-to-b from-[#3d2654] to-[#2a1a3e] rounded-xl p-5 text-center border border-purple-500/30 transform hover:scale-105 transition-all duration-300 hover:border-[#FFB800]/50 group">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Calendar className="text-[#FFB800] group-hover:scale-110 transition-transform" size={18} strokeWidth={2.5} />
              <span className="text-white/70 text-xs font-black uppercase tracking-wider" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.1em' }}>Draw Date</span>
            </div>
            <p className="text-xl font-black text-white group-hover:text-[#FFB800] transition-colors" style={{ fontFamily: 'Impact, sans-serif' }}>
              10/17/2025
            </p>
            <p className="text-xs text-white/60 mt-1 font-bold">10:59:59 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
