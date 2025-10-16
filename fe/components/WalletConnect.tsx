'use client';

import { useState, useEffect } from 'react';
import { authenticate } from '@stacks/connect';
import { Wallet, LogOut } from 'lucide-react';
import { userSession } from '@/lib/stacks-session';

function WalletConnect() {
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  const connectWallet = async () => {
    try {
      await authenticate({
        onFinish: () => {
          setUserData(userSession.loadUserData());
          window.location.reload();
        },
        onCancel: (error) => {
          console.log('User cancelled authentication:', error);
        },
        userSession,
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    userSession.signUserOut();
    setUserData(null);
    window.location.reload();
  };

  if (!mounted) {
    return (
      <button
        disabled
        className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  if (userData) {
    const address = userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet;
    const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

    return (
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 px-4 py-2 rounded-full border border-purple-500/30 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: 'Impact, sans-serif' }}>{shortAddress}</span>
          </div>
        </div>
        <button
          onClick={disconnectWallet}
          className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full transition-all duration-300 flex items-center gap-2 font-bold text-sm transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
          style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.03em' }}
        >
          <LogOut size={16} />
          DISCONNECT
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      className="px-7 py-3 bg-gradient-to-r from-[#FFB800] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-[#1a0f2e] rounded-full transition-all duration-300 flex items-center gap-2 font-black text-sm transform hover:scale-110 shadow-2xl hover:shadow-[#FFB800]/60 border-2 border-[#FFB800]/30"
      style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}
    >
      <Wallet size={18} strokeWidth={3} />
      CONNECT WALLET
    </button>
  );
}

export default WalletConnect;
