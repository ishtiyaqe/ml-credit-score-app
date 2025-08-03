import React, {useEffect } from 'react';
import { Star } from 'lucide-react';
import { useMotionValue, useSpring, motion} from "framer-motion";

const ScoreMeter = ({ score }) => {
  // const needleRef = useRef(null);
  const animatedX = useMotionValue(0);
  const springX = useSpring(animatedX, {
    stiffness: 60,
    damping: 12,
    mass: 0.8,
  });

  useEffect(() => {
    const targetX = (score / 100) * 100; // As percent
    animatedX.set(targetX);
  }, [score, animatedX]);

  const getScoreInfo = (score) => {
    if (score >= 80)
      return {
        category: "Excellent",
        color: "from-green-400 via-emerald-500 to-green-600",
      };
    if (score >= 70)
      return {
        category: "Good",
        color: "from-blue-400 via-blue-500 to-blue-600",
      };
    if (score >= 60)
      return {
        category: "Fair",
        color: "from-yellow-400 via-orange-400 to-orange-500",
      };
    return {
      category: "Poor",
      color: "from-red-400 via-red-500 to-red-600",
      bgColor: "bg-red-500/30",
    };
  };

  const scoreInfo = getScoreInfo(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="relative bg-white/10 backdrop-blur-lg rounded-xl px-6 py-8 border border-white/20 shadow-md">
        {/* Meter Track */}
        <div className="relative w-full h-6 rounded-full bg-white/10 overflow-hidden mb-6">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${scoreInfo.color}`}
            style={{ width: `${score}%` }}
          ></div>

          {/* Needle (animated) */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-[2px] h-10 bg-white shadow-md"
            style={{
              left: springX,
            }}
          />
        </div>

        {/* Markers */}
        <div className="flex justify-between text-sm text-gray-600 px-1 mb-4">
          {[0, 20, 40, 60, 80, 100].map((val) => (
            <span key={val}>{val}%</span>
          ))}
        </div>

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className={`text-4xl font-bold bg-gradient-to-r ${scoreInfo.color} bg-clip-text text-transparent`}>
            {Math.round(score)}%
          </div>
          <div className="text-md font-semibold text-gray-600 mb-2">
            {scoreInfo.category}
          </div>

          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(score / 20) ? "text-yellow-400 fill-current" : "text-gray-400"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScoreMeter;

