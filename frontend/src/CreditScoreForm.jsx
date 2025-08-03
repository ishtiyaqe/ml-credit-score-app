import React, { useState } from "react";
import { motion } from 'framer-motion';
import { TrendingUp, CreditCard } from 'lucide-react';
import defaultUserFeedback from './defaultUserFeedback'



export default function CreditScoreForm({ onSubmit }) {
  const [formData, setFormData] = useState(defaultUserFeedback);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Allow empty string (so user can clear input) but convert to number otherwise
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? '' : Number(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit(formData);
    }
  };

  // Organize fields into logical groups for better UX
  const fieldGroups = [
    {
      title: 'Wallet Information',
      icon: '🔗',
      fields: ['borrow_block_number', 'borrow_timestamp', 'first_tx_timestamp', 'last_tx_timestamp', 'wallet_age']
    },
    {
      title: 'Transaction Activity',
      icon: '💸',
      fields: ['incoming_tx_count', 'outgoing_tx_count', 'net_incoming_tx_count', 'total_gas_paid_eth', 'avg_gas_paid_per_tx_eth']
    },
    {
      title: 'Risk Metrics',
      icon: '⚠️',
      fields: ['risky_tx_count', 'risky_unique_contract_count', 'risky_first_tx_timestamp', 'risky_last_tx_timestamp', 'risky_sum_outgoing_amount_eth']
    },
    {
      title: 'Balance & Amounts',
      icon: '💰',
      fields: ['outgoing_tx_sum_eth', 'incoming_tx_sum_eth', 'outgoing_tx_avg_eth', 'incoming_tx_avg_eth', 'max_eth_ever', 'min_eth_ever', 'total_balance_eth']
    },
    {
      title: 'Lending & Borrowing',
      icon: '🏦',
      fields: ['total_collateral_eth', 'total_available_borrows_eth', 'borrow_amount_sum_eth', 'borrow_count', 'repay_amount_sum_eth', 'repay_count', 'borrow_repay_diff_eth']
    },
    {
      title: 'DeFi Activity',
      icon: '🔄',
      fields: ['deposit_count', 'deposit_amount_sum_eth', 'withdraw_amount_sum_eth', 'liquidation_count', 'liquidation_amount_sum_eth', 'unique_borrow_protocol_count', 'unique_lending_protocol_count']
    },
    {
      title: 'Market Indicators',
      icon: '📈',
      fields: ['market_adx', 'market_atr', 'market_cci', 'market_macd', 'market_rsi', 'market_max_drawdown_365d', 'outgoing_incoming_ratio']
    }
  ];

  // Helper function to format field names
  const formatFieldName = (fieldName) => {
    return fieldName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/Eth/g, 'ETH')
      .replace(/Tx/g, 'Transaction')
      .replace(/Avg/g, 'Average')
      .replace(/Sum/g, 'Total');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
          <CreditCard className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">DeFi Credit Score Analysis</h2>
          <p className="text-gray-600 text-sm">Blockchain wallet and DeFi protocol interaction data</p>
        </div>
      </div>

      <div className="space-y-8">
        {fieldGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: groupIndex * 0.1, duration: 0.5 }}
            className="bg-white/5 rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">{group.icon}</span>
              {group.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.fields.map((fieldName) => (
                <div key={fieldName} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {formatFieldName(fieldName)}
                  </label>
                  <input
                    name={fieldName}
                    type="number"
                    step="any"
                    value={formData[fieldName]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white/70 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all text-sm text-black font-medium placeholder-gray-500"
                    placeholder={`Enter ${formatFieldName(fieldName).toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        <TrendingUp className="w-5 h-5" />
        Analyze DeFi Credit Score
      </motion.button>
    </motion.form>
  );
};

