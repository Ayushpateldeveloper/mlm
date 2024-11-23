import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PlusIcon } from '@heroicons/react/24/solid';
import axios from '../api/axios';
import ConfettiModal from '../components/ConfettiModal';

// Wallet Statistics Component
const WalletStatistics = ({ userData, onAddFunds, onWithdrawFunds }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
                title="Fund Wallet" 
                value={`₹${userData?.walletBalance?.toLocaleString() || userData?.fundWallet?.toLocaleString() || '0'}`} 
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 6v3" />
                    </svg>
                }
            />
            <StatCard 
                title="Income Wallet" 
                value={`₹${userData?.incomeWallet?.toLocaleString() || '0'}`} 
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.038-.775-1.038-2.041 0-2.816.552-.439 1.277-.659 2.003-.659.725 0 1.45.22 2.003.659l.879.659" />
                    </svg>
                }
            />
            <StatCard 
                title="Cashback Wallet" 
                value={`₹${userData?.cashbackWallet?.toLocaleString() || '0'}`} 
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-purple-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0-9.75V6a.75.75 0 00.75.75h.75m-1.5 1.5h-.375A1.125 1.125 0 005.25 6V4.875c0-.621.504-1.125 1.125-1.125H20.25M12 7.5v8.25h8.25" />
                    </svg>
                }
            />
        </div>
    );
};

// Network Statistics Component
const NetworkStatistics = ({ userData }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Total Referrals
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userData?.referralCount || 0}
                </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Active Team Members
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userData?.activeTeamMembers || 0}
                </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Weekly Growth
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userData?.weeklyGrowth || 0}%
                </p>
            </div>
        </div>
    );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 
                        transition-all duration-300 
                        hover:shadow-lg 
                        border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 
                                  uppercase tracking-wider mb-1">
                        {title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {value}
                    </p>
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                    {icon}
                </div>
            </div>
        </div>
    );
};

// Transaction History Component
const TransactionHistory = ({ transactions }) => {
    // Comprehensive debug logging for transactions
    useEffect(() => {
        console.group('Transaction History Debug');
        console.log('Raw Transactions Input:', transactions);
        
        // Check different possible transaction sources
        console.log('Transactions Sources:', {
            directTransactions: transactions,
            transactionsLength: transactions?.length,
            firstTransaction: transactions?.[0],
            transactionKeys: transactions ? Object.keys(transactions) : 'N/A'
        });

        // Detailed type and structure checking
        if (transactions) {
            try {
                console.log('Transaction Type:', typeof transactions);
                console.log('Is Array:', Array.isArray(transactions));
                console.log('Has Length:', transactions.length);
                
                // Attempt to log first transaction details
                if (transactions.length > 0) {
                    const firstTx = transactions[0];
                    console.log('First Transaction Details:', {
                        id: firstTx.id,
                        type: firstTx.type,
                        amount: firstTx.amount,
                        date: firstTx.date
                    });
                }
            } catch (error) {
                console.error('Error processing transactions:', error);
            }
        } else {
            console.warn('No transactions provided to TransactionHistory');
        }
        
        console.groupEnd();
    }, [transactions]);

    // Prepare transactions for rendering
    const processedTransactions = useMemo(() => {
        // Defensive check for transactions
        if (!transactions) {
            console.warn('No transactions found');
            return [];
        }

        // Handle different transaction array formats
        const txnArray = Array.isArray(transactions) 
            ? transactions 
            : (transactions.data?.transactions || transactions.transactions || []);

        console.log('Processed Transactions Preparation:', {
            inputType: typeof transactions,
            isArray: Array.isArray(transactions),
            txnArrayLength: txnArray.length
        });

        return txnArray.map(transaction => {
            // Create a date in Indian time zone
            const transactionDate = transaction.date 
                ? new Date(transaction.date)
                : new Date(transaction.createdAt || Date.now());
            
            const indianDate = new Date(transactionDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

            return {
                ...transaction,
                // Normalize transaction type
                type: transaction.type === 'DEPOSIT' ? 'credit' : 
                      transaction.type === 'WITHDRAWAL' ? 'debit' : 
                      (transaction.type || 'unknown').toLowerCase(),
                // Ensure date is in Indian time
                date: indianDate.toISOString(),
                createdAt: indianDate.toISOString(),
                // Add display-friendly time
                displayTime: indianDate.toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'Asia/Kolkata'
                }),
                // Add fallback description if not present
                description: transaction.description || 
                             (transaction.type === 'DEPOSIT' ? 'Deposit' : 
                              transaction.type === 'WITHDRAWAL' ? 'Withdrawal' : 
                              'Transaction')
            };
        });
    }, [transactions]);

    // Group transactions by date
    const groupedTransactions = useMemo(() => {
        if (!processedTransactions || processedTransactions.length === 0) {
            console.warn('No processed transactions found');
            return {};
        }

        console.log('Grouping Processed Transactions:', processedTransactions);

        const groups = {};
        processedTransactions.forEach(transaction => {
            // Ensure we have a valid date in Indian time zone
            const transactionDate = transaction.date 
                ? new Date(transaction.date)
                : new Date(transaction.createdAt || Date.now());
            
            // Convert to Indian time zone
            const indianDate = new Date(transactionDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
            
            const formattedDate = indianDate.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Kolkata'
            });

            if (!groups[formattedDate]) groups[formattedDate] = [];
            groups[formattedDate].push({
                ...transaction,
                // Store the full Indian date-time for precise tracking
                formattedDate: indianDate.toISOString(),
                // Add Indian time-specific formatting
                displayTime: indianDate.toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'Asia/Kolkata'
                })
            });
        });

        console.log('Grouped Transactions Result:', groups);
        return groups;
    }, [processedTransactions]);

    // Fallback if no transactions
    if (!processedTransactions || processedTransactions.length === 0) {
        console.warn('No transactions to display');
        return (
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400">No transactions yet</p>
            </div>
        );
    }

    const getTransactionColorClasses = (type) => {
        switch(type) {
          case 'credit':
            return 'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
          case 'debit':
            return 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300';
          default:
            return 'bg-gray-50 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
      };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Transaction History
            </h2>
            
            <div className="space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                {Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
                    <div key={date} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">{date}</h3>
                        {dayTransactions.map((transaction, index) => {
                            // Debug logging for each transaction
                            console.log('Rendering transaction:', {
                                id: transaction._id || transaction.id,
                                type: transaction.type,
                                amount: transaction.amount,
                                date: transaction.formattedDate
                            });

                            return (
                                <motion.div 
                                    key={transaction._id || transaction.id || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex items-center p-4 rounded-lg mb-2 transition-all duration-300 hover:shadow-md ${getTransactionColorClasses(transaction.type)}`}
                                >
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                                                    {transaction.description || transaction.type}
                                                </h4>
                                                {transaction.notes && (
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                        {transaction.notes}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-bold ${
                                                    transaction.type === 'credit' 
                                                        ? 'text-green-600 dark:text-green-400' 
                                                        : 'text-red-600 dark:text-red-400'
                                                }`}>
                                                    {new Intl.NumberFormat('en-IN', {
                                                        style: 'currency',
                                                        currency: 'INR'
                                                    }).format(transaction.amount || 0)}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {transaction.displayTime}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Add Funds Modal
const AddFundsModal = ({ 
    isOpen, 
    onClose, 
    user, 
    onAddFunds,
    updateUserData
}) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [notes, setNotes] = useState('');

    const handleAddFunds = async () => {
        // Validate amount
        const numAmount = parseFloat(amount);
        
        // Basic validation
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        try {
            // Ensure Razorpay key is available
            const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID;
            if (!razorpayKey) {
                throw new Error('Razorpay Key ID is not defined');
            }

            // Razorpay payment integration
            const options = {
                key: razorpayKey,
                amount: numAmount * 100, // Amount in paise
                currency: 'INR',
                name: 'UtilityPro MLM',
                description: 'Fund Wallet Deposit',
                handler: async (response) => {
                    try {
                        // Call onAddFunds with amount, Razorpay response, and optional notes
                        await onAddFunds(numAmount, response, notes);

                        // Optimistically update user data
                        if (updateUserData) {
                            updateUserData(prevUserData => ({
                                ...prevUserData,
                                walletBalance: (prevUserData.walletBalance || 0) + numAmount,
                                fundWallet: (prevUserData.fundWallet || 0) + numAmount
                            }));
                        }

                        // Close modal
                        onClose();
                    } catch (err) {
                        console.error('Failed to add funds', err);
                        setError('Failed to add funds. Please try again.');
                    }
                },
                prefill: {
                    name: user?.username || 'UtilityPro User',
                    email: user?.email || 'user@example.com',
                    contact: user?.phone || ''
                },
                notes: {
                    user_id: user?.id || 'unknown',
                    wallet_type: 'fund'
                },
                theme: {
                    color: '#3399cc'
                }
            };

            // Open Razorpay payment window
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error('Razorpay error', err);
            setError(`Payment gateway error: ${err.message}`);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-full max-w-md mx-auto my-14">
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg dark:bg-gray-800 outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Add Funds to Wallet
                        </h3>
                        <button 
                            className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-gray-400 bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                            onClick={onClose}
                        >
                            ×
                        </button>
                    </div>
                    
                    <div className="relative flex-auto p-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Current Fund Wallet Balance: 
                                <span className="font-bold ml-2 text-green-600">
                                    {new Intl.NumberFormat('en-IN', {
                                        style: 'currency',
                                        currency: 'INR'
                                    }).format(user?.walletBalance || 0)}
                                </span>
                            </label>
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount to add"
                                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Notes (Optional)
                            </label>
                            <textarea 
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add a note about this deposit (optional)"
                                maxLength={500}
                                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                                rows={3}
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {notes.length}/500 characters
                            </p>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm mb-4">{error}</p>
                        )}

                        <div className="flex justify-end space-x-2">
                            <button 
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleAddFunds}
                                className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Withdraw Funds Modal
const WithdrawFundsModal = ({ isOpen, onClose, onWithdraw, userData }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [withdrawalMethod, setWithdrawalMethod] = useState('bank');

    const handleWithdraw = async () => {
        // Validate amount
        const numAmount = parseFloat(amount);
        
        // Basic validation
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        if (numAmount > (userData?.incomeWalletBalance || 0)) {
            setError('Insufficient income wallet balance');
            return;
        }

        try {
            await onWithdraw(numAmount, withdrawalMethod);
            setAmount('');
            setError('');
            onClose();
        } catch (err) {
            console.error('Failed to withdraw funds', err);
            setError(err.message || 'Withdrawal failed');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-96">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Withdraw from Income Wallet
                </h2>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Available Income Wallet Balance: 
                        <span className="font-bold ml-2 text-green-600">
                            {new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'INR'
                            }).format(userData?.incomeWalletBalance || 0)}
                        </span>
                    </label>
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                            setError('');
                        }}
                        placeholder="Enter withdrawal amount"
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Withdrawal Method
                    </label>
                    <select 
                        value={withdrawalMethod}
                        onChange={(e) => setWithdrawalMethod(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                    >
                        <option value="bank">Bank Transfer</option>
                        <option value="upi">UPI</option>
                    </select>
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <div className="flex justify-between space-x-4">
                    <button 
                        onClick={onClose}
                        className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white py-2 rounded-md"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleWithdraw}
                        className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Withdraw
                    </button>
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const { user, isAuthenticated, isLoading, logout, setUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);
    const [isWithdrawFundsModalOpen, setIsWithdrawFundsModalOpen] = useState(false);
    const [isConfettiModalOpen, setIsConfettiModalOpen] = useState(false);
    const [confettiMessage, setConfettiMessage] = useState({
        message: 'Congratulations!',
        subMessage: 'Your transaction was successful'
    });

    // Fetch user data including transactions
    const fetchUserData = async () => {
        try {
            setLoading(true);
            
            // Fetch user profile and transactions
            const [profileResponse, transactionsResponse] = await Promise.all([
                axios.get('/auth/profile'),
                axios.get('/transactions/history')
            ]);

            console.log('User Profile Response:', {
                data: profileResponse.data,
                status: profileResponse.status
            });

            console.log('Transactions Response:', {
                data: transactionsResponse.data,
                status: transactionsResponse.status
            });

            // Update user data with both profile and transaction information
            setUserData({
                ...profileResponse.data,
                transactions: transactionsResponse.data.transactions || [],
                walletBalance: transactionsResponse.data.walletBalance || 0,
                totalDeposits: transactionsResponse.data.totalDeposits || 0
            });

            // Log final user data for debugging
            console.log('Final User Data:', {
                transactions: transactionsResponse.data.transactions?.length,
                walletBalance: transactionsResponse.data.walletBalance,
                totalDeposits: transactionsResponse.data.totalDeposits
            });

        } catch (error) {
            console.error('Dashboard data fetch error:', {
                message: error.message,
                response: error.response,
                config: error.config
            });

            // Handle specific error scenarios
            if (error.response?.status === 401) {
                // Token might be expired, logout user
                logout();
            } else {
                // Set error state to display to user
                setError('Failed to load dashboard data. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    // If still checking authentication, show loading
    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p>Restoring session...</p>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const handleAddFunds = async (amount, response, notes) => {
        try {
            // Validate amount
            const numAmount = parseFloat(amount);
            if (isNaN(numAmount) || numAmount <= 0) {
                throw new Error('Invalid amount. Please enter a positive number.');
            }

            const { 
                razorpay_payment_id: razorpayPaymentId,
                razorpay_order_id: razorpayOrderId,
                razorpay_signature: razorpaySignature 
            } = response;

            // Send transaction to backend
            const { data } = await axios.post(`${axios.defaults.baseURL}/transactions/add`, {
                amount: numAmount,
                razorpayPaymentId: razorpayPaymentId,
                orderId: razorpayOrderId,
                signature: razorpaySignature,
                walletType: 'fund', // Specify wallet type
                description: 'Fund Wallet Deposit via Razorpay',
                notes
            });

            // Update user data after successful transaction
            setUserData(prevData => ({
                ...prevData,
                fundWalletBalance: data.updatedBalance,
                transactions: [data.transaction, ...(prevData.transactions || [])]
            }));

            // Trigger confetti modal
            setConfettiMessage({
                message: 'Funds Added Successfully!',
                subMessage: `You added ${new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR'
                }).format(numAmount)} to your fund wallet`
            });
            setIsConfettiModalOpen(true);

        } catch (error) {
            console.error('Error adding funds:', error);
            // Handle error (show error message, etc.)
            setError(error.response?.data?.message || 'Failed to add funds');
        }
    };

    const handleWithdraw = async (amount, withdrawalMethod) => {
        try {
            // Validate amount
            const numAmount = parseFloat(amount);
            if (isNaN(numAmount) || numAmount <= 0) {
                throw new Error('Invalid amount. Please enter a positive number.');
            }

            // Ensure sufficient wallet balance
            if (numAmount > (userData?.incomeWalletBalance || 0)) {
                throw new Error('Insufficient income wallet balance');
            }

            const response = await axios.post('/transactions/withdraw', {
                amount: numAmount,
                withdrawalMethod
            });

            // Update user data after successful transaction
            setUserData(prevData => ({
                ...prevData,
                incomeWalletBalance: response.data.updatedBalance,
                transactions: [
                    {
                        type: 'WITHDRAWAL',
                        amount: numAmount,
                        createdAt: new Date().toISOString()
                    },
                    ...(prevData?.transactions || [])
                ]
            }));

            // Optional: Show success notification
            alert(`Successfully withdrew ₹${numAmount} from your wallet`);
            setIsWithdrawFundsModalOpen(false);

            return response.data;
        } catch (error) {
            console.error('Failed to withdraw funds:', {
                message: error.message,
                response: error.response,
                config: error.config
            });

            // Detailed error handling
            if (error.response) {
                const errorMessage = error.response.data?.message || 
                                     error.response.data?.error || 
                                     'Failed to withdraw funds';
                
                switch (error.response.status) {
                    case 401:
                        alert('Session expired. Please log in again.');
                        break;
                    case 400:
                        alert(errorMessage);
                        break;
                    case 409:
                        alert('This transaction has already been processed.');
                        break;
                    case 500:
                        alert('Server error. Please try again later.');
                        break;
                    default:
                        alert(errorMessage);
                }
            } else if (error.request) {
                alert('Network error. Please check your connection and try again.');
            } else {
                alert(error.message || 'An unexpected error occurred. Please try again.');
            }

            throw error;  // Re-throw to allow caller to handle if needed
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mt-16 p-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="container mx-auto space-y-6"
            >
                {/* Page Header */}
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <div className="text-center sm:text-left w-full sm:w-auto mb-4 sm:mb-0">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            Dashboard
                        </h1>
                        <p className="text-lg sm:text-base text-gray-600 dark:text-gray-300">
                            Welcome back, {userData?.username || 'User'}!
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto px-4 sm:px-0">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 sm:px-6 sm:py-2 rounded-lg flex items-center justify-center w-full sm:w-auto text-lg sm:text-base font-medium shadow-md"
                            onClick={() => setIsAddFundsModalOpen(true)}
                        >
                            <PlusIcon className="h-6 w-6 sm:h-5 sm:w-5 mr-2" />
                            Add Funds
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 sm:px-6 sm:py-2 rounded-lg flex items-center justify-center w-full sm:w-auto text-lg sm:text-base font-medium shadow-md"
                            onClick={() => setIsWithdrawFundsModalOpen(true)}
                        >
                            <PlusIcon className="h-6 w-6 sm:h-5 sm:w-5 mr-2 rotate-45" />
                            Withdraw Funds
                        </motion.button>
                    </div>
                </div>

                {/* Wallet Statistics */}
                <WalletStatistics 
                    userData={userData} 
                    onAddFunds={() => setIsAddFundsModalOpen(true)} 
                    onWithdrawFunds={() => setIsWithdrawFundsModalOpen(true)} 
                />

                {/* Network Statistics */}
                <NetworkStatistics userData={userData} />

                {/* Transactions and Performance */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Transaction History */}
                    <TransactionHistory 
                        transactions={userData?.transactions} 
                    />

                    {/* Performance Metrics */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            Performance
                        </h2>
                        <div className="space-y-4">
                            <StatCard 
                                title="Monthly Earnings" 
                                value={new Intl.NumberFormat('en-IN', {
                                    style: 'currency',
                                    currency: 'INR'
                                }).format(userData?.monthlyEarnings || 0)} 
                                icon="💹"
                            />
                            <StatCard 
                                title="Referral Bonus" 
                                value={new Intl.NumberFormat('en-IN', {
                                    style: 'currency',
                                    currency: 'INR'
                                }).format(userData?.totalReferralBonus || 0)} 
                                icon="🤝"
                            />
                            <StatCard 
                                title="Weekly Growth" 
                                value={`${userData?.weeklyGrowth || 0}%`} 
                                icon="📊"
                            />
                        </div>
                    </div>
                </div>
                <AddFundsModal 
                    isOpen={isAddFundsModalOpen}
                    onClose={() => setIsAddFundsModalOpen(false)}
                    onAddFunds={handleAddFunds}
                    user={userData}
                    updateUserData={setUserData}
                />
                <WithdrawFundsModal 
                    isOpen={isWithdrawFundsModalOpen}
                    onClose={() => setIsWithdrawFundsModalOpen(false)}
                    onWithdraw={handleWithdraw}
                    userData={userData}
                />
                <ConfettiModal 
                    isOpen={isConfettiModalOpen}
                    onClose={() => setIsConfettiModalOpen(false)}
                    message={confettiMessage.message}
                    subMessage={confettiMessage.subMessage}
                />
            </motion.div>
        </div>
    );
};

export default Dashboard;
