'use client';

import Navbar from '@/components/Navbar';
import { RoundInfo } from '@/components/RoundInfo';
import { TicketPurchase } from '@/components/TicketPurchase';
import { DevnetTicketPurchase } from '@/components/DevnetTicketPurchase';
import { MyTickets } from '@/components/MyTickets';
import { Heart, Club, Diamond, Spade } from 'lucide-react';

// Use devnet component only in development
const IS_DEVNET = process.env.NEXT_PUBLIC_NETWORK === 'devnet';

export default function RafflesPage() {
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
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Timer Section */}
        <div className="mb-6">
          <RoundInfo />
        </div>

        {/* Single Column Layout */}
        <div className="space-y-6">
          {/* Ticket Purchase Section */}
          {IS_DEVNET ? <DevnetTicketPurchase /> : <TicketPurchase />}

          {/* My Tickets Section */}
          <MyTickets />
        </div>
      </main>
    </div>
  );
}
