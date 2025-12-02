import { useState } from 'react';
import { SlotWheel } from './components/SlotWheel';
import { CelebrationOverlay } from './components/CelebrationOverlay';
import { Trophy, Sparkles, Gift } from 'lucide-react';

const PRIZES = [
  { id: '100000', name: 'Grand Prize - Luxury Trip', color: 'from-purple-500 to-pink-500', icon: '🏆' },
  { id: '250000', name: 'Premium Electronics', color: 'from-blue-500 to-cyan-500', icon: '💎' },
  { id: '350000', name: 'Shopping Voucher $500', color: 'from-green-500 to-emerald-500', icon: '🎁' },
  { id: '450000', name: 'Weekend Getaway', color: 'from-orange-500 to-yellow-500', icon: '✨' },
  { id: '550000', name: 'Premium Gadget Bundle', color: 'from-red-500 to-pink-500', icon: '🎮' },
  { id: '650000', name: 'Spa & Wellness Package', color: 'from-teal-500 to-blue-500', icon: '🌟' },
  { id: '750000', name: 'Gourmet Dining Experience', color: 'from-amber-500 to-orange-500', icon: '🍾' },
  { id: '850000', name: 'Tech Accessories Set', color: 'from-indigo-500 to-purple-500', icon: '⚡' },
];

export default function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string[]>(['-', '-', '-', '-', '-', '-']);
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentPrize, setCurrentPrize] = useState<typeof PRIZES[0] | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowCelebration(false);
    
    // Select random prize
    const prize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
    const newResult = prize.id.split('');
    
    setResult(newResult);
    setCurrentPrize(prize);
    
    // Show celebration after spin completes (3.5 seconds spin + 0.5s delay)
    setTimeout(() => {
      setIsSpinning(false);
      setTimeout(() => {
        setShowCelebration(true);
      }, 500);
    }, 3500);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col overflow-hidden relative">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)`
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-md px-8 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Gift className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-white mb-1">Prize Wheel</h1>
              <p className="text-sm text-purple-200">Spin to win amazing rewards!</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-xl backdrop-blur-sm">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-yellow-300">8 Prizes Available</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-6 relative z-10">
        <div className="max-w-5xl w-full space-y-8">
          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full w-fit mx-auto backdrop-blur-md">
            <Sparkles className={`w-4 h-4 text-yellow-400 ${isSpinning ? 'animate-spin' : ''}`} />
            <span className="text-sm text-white">
              {isSpinning ? 'Spinning for your prize...' : 'Ready to spin!'}
            </span>
          </div>

          {/* Slot Wheel */}
          <SlotWheel isSpinning={isSpinning} result={result} />

          {/* Spin Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="group relative px-16 py-5 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50 hover:scale-110 disabled:scale-100 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative flex items-center gap-3 text-lg">
                <Sparkles className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
                {isSpinning ? 'Spinning...' : 'SPIN NOW!'}
              </span>
            </button>
          </div>

          {/* Prize Preview */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h2 className="text-white">Your Prize Code</h2>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                {result.map((digit, index) => (
                  <div
                    key={index}
                    className={`w-14 h-16 bg-gradient-to-br from-white/10 to-white/5 border-2 ${
                      !isSpinning && digit !== '-'
                        ? 'border-yellow-400 shadow-lg shadow-yellow-400/30'
                        : 'border-white/20'
                    } rounded-xl flex items-center justify-center transition-all duration-300`}
                  >
                    <span className={`text-3xl font-mono ${
                      !isSpinning && digit !== '-' ? 'text-yellow-400' : 'text-white/40'
                    }`}>
                      {digit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Overlay */}
      {showCelebration && currentPrize && (
        <CelebrationOverlay 
          prize={currentPrize} 
          onClose={() => setShowCelebration(false)}
        />
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-md px-8 py-4">
        <div className="max-w-5xl mx-auto text-center text-xs text-purple-200">
          Good luck! 🍀 May fortune smile upon you today
        </div>
      </footer>
    </div>
  );
}
