import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, CreditCard, AlertCircle, Loader2, CheckCircle2, Star, Zap } from 'lucide-react';
import CreditScoreForm from './CreditScoreForm'
import ScoreMeter from './ScoreMeter'






// Enhanced Processing Popup Component with random engaging messages
const ProcessingPopup = ({ isVisible }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  
  const engagingMessages = React.useMemo(() => [
    "🔍 Analyzing your blockchain footprint...",
    "⛓️ Decoding smart contract interactions...",
    "💰 Evaluating DeFi protocol engagement...",
    "📊 Crunching on-chain data patterns...",
    "🛡️ Assessing transaction risk profiles...",
    "🔄 Processing liquidity pool activities...",
    "📈 Studying your trading behaviors...",
    "🎯 Calculating creditworthiness scores...",
    "✨ Almost there, finalizing results...",
    "🚀 Preparing your personalized report...",
    "💎 Validating wallet authenticity...",
    "🔮 Predicting future credit potential...",
    "⚡ Lightning-fast blockchain analysis...",
    "🌟 Your credit story is unfolding..."
  ], []);

  // 🔁 This persists across re-renders
  let previousMessage = useRef('');

  useEffect(() => {
    let intervalId;

    const getRandomMessage = () => {
      let msg;
      do {
        msg = engagingMessages[Math.floor(Math.random() * engagingMessages.length)];
      } while (msg === previousMessage.current);
      previousMessage.current = msg;
      return msg;
    };

    if (isVisible) {
      setCurrentMessage(getRandomMessage());

      intervalId = setInterval(() => {
        setCurrentMessage(getRandomMessage());
      }, 35000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white h-screen backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl max-w-md w-full mx-4"
        >
          {/* Animated logo/icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Zap className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>

          {/* Main engaging message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="text-xl font-bold text-gray-800 mb-4">
              Analyzing Your DeFi Profile
            </div>
            <div className="text-lg text-gray-700 mb-6">
              {currentMessage}
            </div>
          </motion.div>

          {/* Animated dots loader */}
          <div className="flex justify-center space-x-2 mb-6">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200/50 rounded-full h-3 mb-6 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            />
          </div>

          {/* Bottom text */}
          <div className="text-center">
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sm text-gray-600 font-medium"
            >
              Hang tight! We're working our magic... ✨
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


// Main App Component
export default function App() {
  
  const [prediction, setPrediction] = useState(null);
  const [sscor, setSscor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setPrediction(null);
    setSscor(null);

    // Convert all fields to number (empty string to 0)
    const processedData = {};
    Object.entries(data).forEach(([key, val]) => {
      processedData[key] = val === '' ? 0 : Number(val);
    });

    try {
      const response = await fetch('http://localhost:8000/api/predict/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const responseData = await response.json();
      setPrediction(responseData.prediction);
      setSscor(responseData.probability);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-indigo-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Credit Score Prediction
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get an instant prediction of your credit score using advanced machine learning algorithms
          </p>
        </motion.div>

         {/* Results */}
        <AnimatePresence>
          {prediction !== null && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <h2 className="text-2xl font-bold text-gray-800">Your Credit Score</h2>
                </div>
                <p className="text-gray-600">Based on the information you provided</p>
              </div>
              <ScoreMeter score={prediction} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-red-50 backdrop-blur-lg rounded-3xl p-6 border border-red-200 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">Prediction Error</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <CreditScoreForm onSubmit={handleSubmit} />

        {/* Processing Popup */}
        <ProcessingPopup isVisible={loading} />

        {/* Loading State - Simplified since we have the popup */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 text-center"
            >
              <div className="text-lg font-semibold text-gray-700">Processing in background...</div>
            </motion.div>
          )}
        </AnimatePresence>

       
      </div>
    </div>
  );
}