import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SlotWheelProps {
  isSpinning: boolean;
  result: string[];
}

export function SlotWheel({ isSpinning, result }: SlotWheelProps) {
  const [displayDigits, setDisplayDigits] = useState<string[]>(['-', '-', '-', '-', '-', '-']);
  const [stoppedSlots, setStoppedSlots] = useState<boolean[]>([false, false, false, false, false, false]);

  useEffect(() => {
    if (isSpinning) {
      // Reset all slots
      setStoppedSlots([false, false, false, false, false, false]);
      
      // Start rolling all slots
      const intervals: NodeJS.Timeout[] = [];
      
      result.forEach((_, slotIndex) => {
        const interval = setInterval(() => {
          setDisplayDigits(prev => {
            const newDigits = [...prev];
            if (!stoppedSlots[slotIndex]) {
              newDigits[slotIndex] = Math.floor(Math.random() * 10).toString();
            }
            return newDigits;
          });
        }, 80);
        intervals.push(interval);
        
        // Stop each slot in sequence
        setTimeout(() => {
          clearInterval(interval);
          setStoppedSlots(prev => {
            const newStopped = [...prev];
            newStopped[slotIndex] = true;
            return newStopped;
          });
          setDisplayDigits(prev => {
            const newDigits = [...prev];
            newDigits[slotIndex] = result[slotIndex];
            return newDigits;
          });
        }, 500 + slotIndex * 500);
      });

      return () => {
        intervals.forEach(interval => clearInterval(interval));
      };
    }
  }, [isSpinning, result]);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Wheel Container */}
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 via-pink-500/30 to-purple-500/30 blur-3xl animate-pulse" />
        
        {/* Main Wheel Frame */}
        <div className="relative bg-gradient-to-br from-purple-900/80 to-pink-900/80 border-2 border-white/20 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
          {/* Inner glow */}
          <div className="absolute inset-4 bg-gradient-to-br from-yellow-400/10 to-pink-500/10 rounded-2xl pointer-events-none" />
          
          <div className="relative flex items-center justify-center gap-4">
            {displayDigits.map((digit, index) => (
              <SlotColumn
                key={index}
                digit={digit}
                isSpinning={isSpinning && !stoppedSlots[index]}
                hasStopped={stoppedSlots[index]}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Decorative corner sparkles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 -left-4"
        >
          <Sparkles className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 -right-4"
        >
          <Sparkles className="w-8 h-8 text-pink-400 drop-shadow-lg" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-4 -left-4"
        >
          <Sparkles className="w-8 h-8 text-purple-400 drop-shadow-lg" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-4 -right-4"
        >
          <Sparkles className="w-8 h-8 text-cyan-400 drop-shadow-lg" />
        </motion.div>
      </div>
    </div>
  );
}

interface SlotColumnProps {
  digit: string;
  isSpinning: boolean;
  hasStopped: boolean;
  index: number;
}

function SlotColumn({ digit, isSpinning, hasStopped, index }: SlotColumnProps) {
  const colors = [
    'from-red-500 to-pink-500',
    'from-orange-500 to-yellow-500',
    'from-green-500 to-emerald-500',
    'from-cyan-500 to-blue-500',
    'from-blue-500 to-indigo-500',
    'from-purple-500 to-pink-500'
  ];

  const glowColors = [
    'shadow-red-500/40',
    'shadow-orange-500/40',
    'shadow-green-500/40',
    'shadow-cyan-500/40',
    'shadow-blue-500/40',
    'shadow-purple-500/40'
  ];

  return (
    <div className="relative">
      {/* Slot frame with rainbow gradient */}
      <div className={`relative w-20 h-28 bg-gradient-to-br ${
        hasStopped ? colors[index] : 'from-gray-700 to-gray-800'
      } rounded-2xl overflow-hidden transition-all duration-500 shadow-xl ${
        hasStopped ? `${glowColors[index]} border-2 border-white/50` : 'border-2 border-white/20'
      }`}>
        {/* Shine effect */}
        {hasStopped && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
          />
        )}
        
        {/* Digit Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${index}-${digit}`}
              initial={{ y: isSpinning ? -40 : 0, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: isSpinning ? 40 : 0, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15, type: "spring" }}
              className="text-5xl text-white drop-shadow-lg"
              style={{ fontFamily: 'monospace' }}
            >
              {digit}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Top gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
        
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Stop burst effect */}
      {hasStopped && (
        <>
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 border-4 border-white rounded-2xl pointer-events-none"
          />
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute inset-0 border-2 border-yellow-400 rounded-2xl pointer-events-none"
          />
        </>
      )}

      {/* Spinning particles */}
      {isSpinning && !hasStopped && (
        <>
          <motion.div
            animate={{ 
              y: [-10, 10],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 0.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full"
          />
          <motion.div
            animate={{ 
              rotate: 360,
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 -right-3 w-1.5 h-1.5 bg-pink-400 rounded-full"
          />
        </>
      )}
    </div>
  );
}
