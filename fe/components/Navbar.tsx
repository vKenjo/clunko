'use client';

import WalletConnect from '@/components/WalletConnect';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#1a0f2e]/98 border-b border-purple-800/40 shadow-2xl">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Left side: Logo and Navigation */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 transform hover:scale-105 group">
              <div className="relative w-12 h-12 flex-shrink-0 transform group-hover:rotate-6 transition-transform duration-300">
                <Image 
                  src="/main.png" 
                  alt="CLUNKO" 
                  width={48} 
                  height={48} 
                  className="object-contain drop-shadow-[0_0_15px_rgba(255,184,0,0.6)]" 
                />
              </div>
              <h1 className="text-3xl font-bold text-[#FFB800] tracking-wide text-glow" style={{ fontFamily: 'Impact, sans-serif', fontStyle: 'italic', letterSpacing: '0.05em' }}>
                CLUNKO
              </h1>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link 
                href="/" 
                className={`font-bold text-base transition-all duration-300 relative group ${
                  isActive('/') 
                    ? 'text-[#FFB800] scale-110' 
                    : 'text-white/70 hover:text-white hover:scale-105'
                }`}
                style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}
              >
                HOME
                {isActive('/') && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFB800] to-transparent shadow-[0_0_10px_rgba(255,184,0,0.8)]"></span>
                )}
              </Link>
              <Link 
                href="/raffles" 
                className={`font-bold text-base transition-all duration-300 relative group ${
                  isActive('/raffles') 
                    ? 'text-[#FFB800] scale-110' 
                    : 'text-white/70 hover:text-white hover:scale-105'
                }`}
                style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}
              >
                RAFFLES
                {isActive('/raffles') && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFB800] to-transparent shadow-[0_0_10px_rgba(255,184,0,0.8)]"></span>
                )}
              </Link>
              <Link 
                href="/help" 
                className={`font-bold text-base transition-all duration-300 relative group ${
                  isActive('/help') 
                    ? 'text-[#FFB800] scale-110' 
                    : 'text-white/70 hover:text-white hover:scale-105'
                }`}
                style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}
              >
                HELP
                {isActive('/help') && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFB800] to-transparent shadow-[0_0_10px_rgba(255,184,0,0.8)]"></span>
                )}
              </Link>
            </nav>
          </div>

          {/* Right side: Wallet Connect */}
          <div className="flex items-center">
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
}
