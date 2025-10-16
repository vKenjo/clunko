'use client';

import Navbar from '@/components/Navbar';
import { Heart, Club, Diamond, Spade, HelpCircle, Wallet, Hash, Trophy, Shield, DollarSign } from 'lucide-react';

export default function HelpPage() {
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
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-br from-[#FFB800] to-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <HelpCircle className="w-14 h-14 text-[#1a0f2e]" strokeWidth={2.5} />
          </div>
          <h2 className="text-6xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.02em' }}>
            <span className="text-white italic" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>HELP & </span>
            <span className="text-[#FFB800] italic" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>SUPPORT</span>
          </h2>
          <p className="text-white/90 text-xl md:text-2xl font-medium">
            Everything you need to know about CLUNKO lottery
          </p>
        </div>

        {/* How to Play Section */}
        <div className="bg-gradient-to-b from-[#2d1b4e] to-[#1f1235] rounded-3xl p-12 shadow-2xl border border-purple-700/50 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-wide" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
              HOW TO PLAY
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFB800] to-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                  <Wallet className="text-[#1a0f2e]" size={36} strokeWidth={2.5} />
                </div>
                <div className="text-6xl font-bold text-[#FFB800] mb-4" style={{ fontFamily: 'Impact, sans-serif' }}>1</div>
                <h4 className="font-bold text-2xl mb-4 text-white tracking-wide" style={{ fontFamily: 'Impact, sans-serif' }}>Connect Wallet</h4>
                <p className="text-white/80 text-base leading-relaxed">
                  Connect your Stacks wallet to participate in the lottery. Make sure you have STX tokens for ticket purchases.
                </p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFB800] to-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                  <Hash className="text-[#1a0f2e]" size={36} strokeWidth={2.5} />
                </div>
                <div className="text-6xl font-bold text-[#FFB800] mb-4" style={{ fontFamily: 'Impact, sans-serif' }}>2</div>
                <h4 className="font-bold text-2xl mb-4 text-white tracking-wide" style={{ fontFamily: 'Impact, sans-serif' }}>Pick Numbers</h4>
                <p className="text-white/80 text-base leading-relaxed">
                  Choose 6 numbers from 1-59 or use Quick Pick for random selection. Optionally select a charity to support.
                </p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFB800] to-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="text-[#1a0f2e]" size={36} strokeWidth={2.5} />
                </div>
                <div className="text-6xl font-bold text-[#FFB800] mb-4" style={{ fontFamily: 'Impact, sans-serif' }}>3</div>
                <h4 className="font-bold text-2xl mb-4 text-white tracking-wide" style={{ fontFamily: 'Impact, sans-serif' }}>Win Prizes</h4>
                <p className="text-white/80 text-base leading-relaxed">
                  Match numbers to win prizes! The more numbers you match, the bigger your prize. Winners are automatically notified.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prize Structure */}
        <div className="bg-gradient-to-b from-[#2d1b4e] to-[#1f1235] rounded-3xl p-12 shadow-2xl border border-purple-700/50 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-wide" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
              PRIZE STRUCTURE
            </h3>
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-[#1a0f2e] to-[#2a1a3e] rounded-2xl p-8 border border-[#FFB800]/30 hover:border-[#FFB800]/60 transition-all duration-300 transform hover:scale-[1.02] shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-3xl font-bold text-[#FFB800] mb-3" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.02em' }}>6 Matches - MEGA JACKPOT</h4>
                    <p className="text-white/80 text-lg">Win up to $1,000,000 in STX</p>
                  </div>
                  <Trophy className="text-[#FFB800]" size={56} strokeWidth={2} />
                </div>
              </div>
              <div className="bg-gradient-to-r from-[#1a0f2e] to-[#2a1a3e] rounded-2xl p-8 border border-[#FFB800]/30 hover:border-[#FFB800]/60 transition-all duration-300 transform hover:scale-[1.02] shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-3xl font-bold text-[#FFB800] mb-3" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.02em' }}>5 Matches - GRAND PRIZE</h4>
                    <p className="text-white/80 text-lg">Win up to $500,000 in sBTC coin</p>
                  </div>
                  <Trophy className="text-[#FFB800]" size={56} strokeWidth={2} />
                </div>
              </div>
              <div className="bg-gradient-to-r from-[#1a0f2e] to-[#2a1a3e] rounded-2xl p-8 border border-[#FFB800]/30 hover:border-[#FFB800]/60 transition-all duration-300 transform hover:scale-[1.02] shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-3xl font-bold text-[#FFB800] mb-3" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.02em' }}>4 Matches - MAJOR PRIZE</h4>
                    <p className="text-white/80 text-lg">Win up to $100,000 in aeUSDC</p>
                  </div>
                  <Trophy className="text-[#FFB800]" size={56} strokeWidth={2} />
                </div>
              </div>
              <div className="bg-gradient-to-r from-[#1a0f2e] to-[#2a1a3e] rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-[1.02] shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.02em' }}>3 Matches - REFUND</h4>
                    <p className="text-white/80 text-lg">Ticket price + gas fees returned to your wallet</p>
                  </div>
                  <DollarSign className="text-white" size={56} strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-b from-[#2d1b4e] to-[#1f1235] rounded-3xl p-12 shadow-2xl border border-purple-700/50 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-wide" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
              FREQUENTLY ASKED QUESTIONS
            </h3>
            <div className="space-y-8">
              <div className="border-l-4 border-[#FFB800] pl-6 py-2 hover:border-[#FFA500] transition-colors">
                <h4 className="text-2xl font-bold text-[#FFB800] mb-3" style={{ fontFamily: 'Impact, sans-serif' }}>How much does a ticket cost?</h4>
                <p className="text-white/80 text-base leading-relaxed">
                  Each lottery ticket costs 1 STX. This includes all transaction fees on the Stacks blockchain.
                </p>
              </div>
              <div className="border-l-4 border-[#FFB800] pl-6 py-2 hover:border-[#FFA500] transition-colors">
                <h4 className="text-2xl font-bold text-[#FFB800] mb-3" style={{ fontFamily: 'Impact, sans-serif' }}>When are the draws held?</h4>
                <p className="text-white/80 text-base leading-relaxed">
                  Draws are held automatically when the countdown timer reaches zero. Check the active raffles page to see the next draw time.
                </p>
              </div>
              <div className="border-l-4 border-[#FFB800] pl-6 py-2 hover:border-[#FFA500] transition-colors">
                <h4 className="text-2xl font-bold text-[#FFB800] mb-3" style={{ fontFamily: 'Impact, sans-serif' }}>How do I claim my prize?</h4>
                <p className="text-white/80 text-base leading-relaxed">
                  Prizes are automatically distributed to your wallet address. No claim process needed - just wait for the transaction to complete!
                </p>
              </div>
              <div className="border-l-4 border-[#FFB800] pl-6 py-2 hover:border-[#FFA500] transition-colors">
                <h4 className="text-2xl font-bold text-[#FFB800] mb-3" style={{ fontFamily: 'Impact, sans-serif' }}>What happens to charity donations?</h4>
                <p className="text-white/80 text-base leading-relaxed">
                  10% of each prize pool goes to charities selected by winners. If you win and selected a charity, your chosen charity receives a donation.
                </p>
              </div>
              <div className="border-l-4 border-[#FFB800] pl-6 py-2 hover:border-[#FFA500] transition-colors">
                <h4 className="text-2xl font-bold text-[#FFB800] mb-3" style={{ fontFamily: 'Impact, sans-serif' }}>Is this fair and secure?</h4>
                <p className="text-white/80 text-base leading-relaxed">
                  Yes! CLUNKO runs on Stacks blockchain with verifiable smart contracts. All draws use cryptographically secure random number generation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-b from-[#2d1b4e] to-[#1f1235] rounded-3xl p-16 shadow-2xl border border-purple-700/50 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FFB800] to-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Shield className="w-12 h-12 text-[#1a0f2e]" strokeWidth={2.5} />
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
              NEED MORE HELP?
            </h3>
            <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
              Contact our support team or check out our documentation
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="px-12 py-5 bg-gradient-to-r from-[#FFB800] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-[#1a0f2e] rounded-full font-black text-xl transition-all transform hover:scale-110 shadow-2xl hover:shadow-[#FFB800]/70 border-2 border-[#FFB800]/40 relative overflow-hidden group" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
                <span className="absolute inset-0 shimmer"></span>
                <span className="relative z-10">CONTACT SUPPORT</span>
              </button>
              <button className="px-12 py-5 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white rounded-full font-black text-xl transition-all transform hover:scale-110 shadow-2xl border-2 border-purple-500/50 hover:shadow-purple-500/50" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>
                VIEW DOCUMENTATION
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
