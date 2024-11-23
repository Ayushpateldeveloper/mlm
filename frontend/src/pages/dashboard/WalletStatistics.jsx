import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon }) => {
    return (
        <motion.div 
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 flex items-center justify-between"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{title}</h3>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
            {icon}
        </motion.div>
    );
};

const WalletStatistics = ({ userData, onAddFunds, onWithdrawFunds }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <StatCard 
                title="Fund Wallet" 
                value={`₹${
                    userData?.walletBalance?.toLocaleString() || 
                    userData?.fundWallet?.toLocaleString() || 
                    userData?.totalDeposits?.toLocaleString() || 
                    '0'
                }`} 
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0-9.75V6a.75.75 0 00.75.75h.75m-1.5 1.5h.375A1.125 1.125 0 005.25 6V4.875c0-.621.504-1.125 1.125-1.125H20.25M12 7.5v8.25h8.25" />
                    </svg>
                }
            />
        </div>
    );
};

export default WalletStatistics;
