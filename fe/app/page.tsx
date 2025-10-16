'use client';

import Navbar from '@/components/Navbar';
import { PrizeInfo } from '@/components/PrizeInfo';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Club, Diamond, Spade, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Decorative floating shapes */}
      <div className="decorative-shapes">
        <Heart className="floating-shape text-cyan-400 opacity-20" style={{ top: '10%', left: '5%', width: '40px', height: '40px', animationDelay: '0s' }} />
        <Club className="floating-shape text-cyan-400 opacity-20" style={{ top: '15%', right: '8%', width: '30px', height: '30px', animationDelay: '1s' }} />
        <Diamond className="floating-shape text-cyan-400 opacity-20" style={{ bottom: '20%', left: '10%', width: '35px', height: '35px', animationDelay: '2s' }} />
        <Spade className="floating-shape text-cyan-400 opacity-20" style={{ bottom: '30%', right: '15%', width: '30px', height: '30px', animationDelay: '1.5s' }} />
        <Heart className="floating-shape text-cyan-400 opacity-20" style={{ top: '60%', left: '20%', width: '25px', height: '25px', animationDelay: '3s' }} />
        <Club className="floating-shape text-cyan-400 opacity-20" style={{ top: '40%', right: '5%', width: '28px', height: '28px', animationDelay: '2.5s' }} />
        <div className="floating-shape" style={{ top: '25%', left: '15%', width: '20px', height: '20px', background: 'cyan', opacity: 0.2, borderRadius: '50%', animationDelay: '1.8s' }}></div>
        <div className="floating-shape" style={{ top: '70%', right: '25%', width: '15px', height: '15px', background: 'cyan', opacity: 0.2, borderRadius: '50%', animationDelay: '2.2s' }}></div>
      </div>

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <h2 className="text-6xl md:text-8xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.02em' }}>
            <span className="text-white italic" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.3)' }}>WIN BIG, </span>
            <span className="text-[#FFB800] italic" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.3)' }}>GIVE BACK</span>
          </h2>
          <p className="text-white/90 text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-medium">
            Pick your lucky numbers and support a charity of your choice.
          </p>
          
          {/* Mascot with enhanced styling */}
          <div className="flex justify-center mb-12 relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 transform hover:scale-105 transition-transform duration-500">
              {/* Glow effect behind mascot */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFB800]/20 via-purple-500/20 to-[#FFB800]/20 rounded-full blur-3xl animate-pulse"></div>
              <Image 
                src="/main.png" 
                alt="Lucky Mascot" 
                width={384} 
                height={384} 
                className="object-contain drop-shadow-2xl relative z-10" 
                style={{ filter: 'drop-shadow(0 15px 40px rgba(255,184,0,0.4)) drop-shadow(0 0 60px rgba(168,85,247,0.3))' }}
              />
            </div>
          </div>

          <Link href="/raffles">
            <button className="bg-gradient-to-r from-[#FFB800] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-[#1a0f2e] font-black py-6 px-16 rounded-full text-3xl transition-all transform hover:scale-110 shadow-2xl inline-flex items-center gap-3 hover:shadow-[#FFB800]/70 border-4 border-[#FFB800]/40 btn-pulse relative overflow-hidden group" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
              <span className="absolute inset-0 shimmer"></span>
              <span className="relative z-10">JOIN THE STAKES</span>
            </button>
          </Link>
        </div>

        {/* Prize Tiers */}
        <div className="mb-16">
          <h3 className="text-5xl md:text-6xl font-bold text-center mb-12" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.02em' }}>
            <span className="text-white italic" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>PRIZE </span>
            <span className="text-[#FFB800] italic" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>POOLS</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <PrizeInfo />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          <div className="card-hover bg-gradient-to-b from-[#2d1b4e] to-[#1f1235] rounded-3xl p-10 text-center border-2 border-purple-700/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/0 via-purple-500/10 to-[#FFB800]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <div className="text-8xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">🔒</div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-wide group-hover:text-[#FFB800] transition-colors duration-300" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
                SECURE & FAIR
              </h3>
              <p className="text-white/80 text-base leading-relaxed font-medium">
                Built on Stacks blockchain with verifiable smart contracts and transparent draws
              </p>
            </div>
          </div>
          <div className="card-hover bg-gradient-to-b from-[#2d1b4e] to-[#1f1235] rounded-3xl p-10 text-center border-2 border-purple-700/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/0 via-purple-500/10 to-[#FFB800]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <div className="text-8xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">❤️</div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-wide group-hover:text-[#FFB800] transition-colors duration-300" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
                GIVE BACK
              </h3>
              <p className="text-white/80 text-base leading-relaxed font-medium">
                10% of prize pools go to charities chosen by winners. Play and make a difference
              </p>
            </div>
          </div>
          <div className="card-hover bg-gradient-to-b from-[#2d1b4e] to-[#1f1235] rounded-3xl p-10 text-center border-2 border-purple-700/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/0 via-purple-500/10 to-[#FFB800]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <div className="text-8xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">💰</div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-wide group-hover:text-[#FFB800] transition-colors duration-300" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
                BIG PRIZES
              </h3>
              <p className="text-white/80 text-base leading-relaxed font-medium">
                Win up to $1,000,000 in crypto prizes across multiple lottery tiers
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-b from-[#2d1b4e] to-[#1f1235] rounded-3xl p-16 text-center border border-purple-700/50 relative overflow-hidden max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.02em' }}>
              <span className="text-white italic" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>READY TO </span>
              <span className="text-[#FFB800] italic" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>PLAY?</span>
            </h3>
            <p className="text-white/90 text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-medium">
              Connect your wallet and start playing now. Each ticket is only 1 STX!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/raffles">
                <button className="bg-gradient-to-r from-[#FFB800] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-[#1a0f2e] font-black py-5 px-14 rounded-full text-xl transition-all transform hover:scale-110 shadow-2xl hover:shadow-[#FFB800]/70 border-2 border-[#FFB800]/40 relative overflow-hidden group" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
                  <span className="absolute inset-0 shimmer"></span>
                  <span className="relative z-10">PLAY NOW</span>
                </button>
              </Link>
              <Link href="/help">
                <button className="bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white font-black py-5 px-14 rounded-full text-xl transition-all transform hover:scale-110 shadow-2xl border-2 border-purple-500/50 hover:shadow-purple-500/50" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
                  LEARN MORE
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
