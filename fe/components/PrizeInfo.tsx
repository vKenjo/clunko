'use client';

import Image from 'next/image';

export function PrizeInfo() {
  const prizes = [
    {
      name: 'MAJOR',
      amount: '$ 100 000',
      description: '4 DIGIT LOTTERY',
      color: 'from-yellow-400 to-orange-500',
      icon: '/4digit-prize.png',
      currency: 'aeUSDC'
    },
    {
      name: 'MEGA',
      amount: '$ 1 000 000',
      description: '6 DIGIT LOTTERY',
      color: 'from-blue-400 to-purple-500',
      icon: '/6digit-prize.png',
      currency: 'STX'
    },
    {
      name: 'GRAND',
      amount: '$ 500 000',
      description: '5 DIGIT LOTTERY',
      color: 'from-red-500 to-pink-500',
      icon: '/5digit-prize.png',
      currency: 'sBTC coin'
    }
  ];

  return (
    <>
      {prizes.map((prize, index) => (
        <div
          key={index}
          className="card-hover bg-gradient-to-b from-[#2d1b4e] to-[#1f1235] rounded-3xl p-8 text-center border-2 border-purple-700/50 relative overflow-hidden group"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFB800]/0 via-[#FFB800]/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
          
          <div className="relative z-10">
            {/* Icon with enhanced effects */}
            <div className="flex justify-center mb-6">
              <div className="relative w-40 h-40 transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                {/* Glow ring behind icon */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFB800]/30 to-purple-500/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <Image 
                  src={prize.icon} 
                  alt={prize.name} 
                  width={160} 
                  height={160} 
                  className="object-contain drop-shadow-2xl relative z-10" 
                  style={{ filter: 'drop-shadow(0 10px 30px rgba(255,184,0,0.5))' }}
                />
              </div>
            </div>
            
            {/* Prize Amount with glow */}
            <p className="text-5xl md:text-6xl font-black text-white mb-3 group-hover:text-glow transition-all duration-300" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.02em' }}>
              {prize.amount}
            </p>
            
            {/* Currency */}
            <p className="text-lg text-[#FFB800] font-black mb-4 tracking-wider" style={{ fontFamily: 'Impact, sans-serif' }}>
              {prize.currency}
            </p>
            
            {/* Divider with glow */}
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-4 group-hover:via-[#FFB800]/70 group-hover:shadow-[0_0_10px_rgba(255,184,0,0.5)] transition-all duration-300"></div>
            
            {/* Description */}
            <p className="text-sm text-white/90 font-bold tracking-widest uppercase" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.1em' }}>
              {prize.description}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}