import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Trophy, X, Sparkles, Star } from 'lucide-react';

interface Prize {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface CelebrationOverlayProps {
  prize: Prize;
  onClose: () => void;
}

export function CelebrationOverlay({ prize, onClose }: CelebrationOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      shape: 'circle' | 'square' | 'triangle';
    }> = [];

    const colors = [
      '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
      '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
      '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
      '#ec4899', '#f43f5e'
    ];

    // Create confetti particles
    for (let i = 0; i < 200; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        speedY: Math.random() * 4 + 2,
        speedX: Math.random() * 4 - 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle'
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((particle) => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        
        ctx.fillStyle = particle.color;
        
        if (particle.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.shape === 'square') {
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        } else {
          // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -particle.size / 2);
          ctx.lineTo(particle.size / 2, particle.size / 2);
          ctx.lineTo(-particle.size / 2, particle.size / 2);
          ctx.closePath();
          ctx.fill();
        }
        
        ctx.restore();

        // Update position
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.rotation += particle.rotationSpeed;

        // Reset if out of bounds
        if (particle.y > canvas.height) {
          particle.y = -20;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Celebration Card */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          damping: 20, 
          stiffness: 300,
          delay: 0.2 
        }}
        className="relative z-10 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${prize.color} opacity-30 blur-3xl rounded-3xl animate-pulse`} />
        
        <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {/* Animated stars background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  scale: 0, 
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  opacity: 0 
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="relative p-12 text-center space-y-6">
            {/* Trophy with pulse animation */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block"
            >
              <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${prize.color} rounded-full flex items-center justify-center shadow-2xl relative`}>
                <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                <Trophy className="w-12 h-12 text-white relative z-10" />
              </div>
            </motion.div>

            {/* Congratulations text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <h2 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                🎉 Congratulations! 🎉
              </h2>
              <p className="text-xl text-gray-600">You won</p>
            </motion.div>

            {/* Prize name */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className={`bg-gradient-to-br ${prize.color} p-6 rounded-2xl shadow-xl`}
            >
              <div className="text-5xl mb-3">{prize.icon}</div>
              <h3 className="text-2xl text-white drop-shadow-lg">
                {prize.name}
              </h3>
            </motion.div>

            {/* Prize code */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-2"
            >
              <p className="text-sm text-gray-500">Your winning code:</p>
              <div className="flex items-center justify-center gap-2">
                {prize.id.split('').map((digit, index) => (
                  <motion.div
                    key={index}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 360 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                    className={`w-12 h-14 bg-gradient-to-br ${prize.color} rounded-lg flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-2xl text-white">
                      {digit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sparkle decorations */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                </motion.div>
              ))}
            </div>

            {/* Close button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              onClick={onClose}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl transition-all hover:scale-105 shadow-lg"
            >
              Claim Your Prize
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
