const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');
const crypto = require('crypto');

// Add new transaction
router.post('/add', authMiddleware, async (req, res) => {
    console.log('Received add transaction request:', {
        userId: req.user.id,
        body: req.body
    });

    try {
        const { 
            amount, 
            razorpayPaymentId, 
            razorpaySignature,
            description 
        } = req.body;

        // Validate input
        if (!amount || amount <= 0) {
            console.log('Invalid amount provided:', amount);
            return res.status(400).json({ 
                message: 'Invalid amount' 
            });
        }

        // Optional: Razorpay signature verification
        if (razorpayPaymentId && razorpaySignature) {
            const razorpaySecretKey = process.env.RAZORPAY_SECRET_KEY;
            
            // Construct the signature payload
            const payload = `${razorpayPaymentId}|${amount}`;
            
            // Generate HMAC signature
            const expectedSignature = crypto
                .createHmac('sha256', razorpaySecretKey)
                .update(payload)
                .digest('hex');

            // Compare signatures
            if (expectedSignature !== razorpaySignature) {
                console.log('Invalid Razorpay signature');
                return res.status(400).json({
                    message: 'Invalid payment signature'
                });
            }
        }

        // Check if transaction with this Razorpay Payment ID already exists
        if (razorpayPaymentId) {
            const existingTransaction = await Transaction.findOne({ 
                razorpayPaymentId: razorpayPaymentId 
            });

            if (existingTransaction) {
                console.log('Duplicate transaction detected:', razorpayPaymentId);
                return res.status(409).json({
                    message: 'Transaction already processed',
                    error: 'Duplicate transaction'
                });
            }
        }

        console.log('Creating new transaction record...');
        // Create new transaction
        const newTransaction = new Transaction({
            user: req.user.id,
            type: 'DEPOSIT',
            amount: amount,
            status: 'COMPLETED',
            paymentMethod: 'RAZORPAY',
            razorpayPaymentId: req.body.razorpayPaymentId, 
            description: description || 'Wallet Deposit',
            notes: req.body.notes || '',
            metadata: {
                paymentGateway: 'Razorpay',
                orderId: req.body.orderId,
                signature: req.body.signature,
                razorpayPaymentId: req.body.razorpayPaymentId
            }
        });

        // Save transaction
        console.log('Saving transaction to database...');
        await newTransaction.save();
        console.log('Transaction saved successfully:', newTransaction._id);

        // Update user wallet balance
        console.log('Updating user wallet balance...');
        const user = await User.findById(req.user.id);
        const previousBalance = user.walletBalance || 0;
        const previousDeposits = user.totalDeposits || 0;
        
        user.walletBalance = previousBalance + amount;
        user.totalDeposits = previousDeposits + amount;
        
        console.log('Wallet update details:', {
            userId: user._id,
            previousBalance,
            newBalance: user.walletBalance,
            previousDeposits,
            newTotalDeposits: user.totalDeposits
        });

        await user.save();
        console.log('User wallet updated successfully');

        console.log('Transaction added successfully:', {
            transactionId: newTransaction._id,
            amount: amount,
            userId: req.user.id
        });

        res.status(201).json({
            message: 'Transaction added successfully',
            transaction: newTransaction,
            updatedBalance: user.walletBalance,
            totalDeposits: user.totalDeposits
        });
    } catch (error) {
        console.error('Transaction error:', {
            error: error.message,
            stack: error.stack,
            name: error.name
        });
        
        // Handle specific MongoDB duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({ 
                message: 'Transaction already processed', 
                error: 'Duplicate transaction key' 
            });
        }

        // Handle other specific error types
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: 'Invalid transaction data', 
                error: error.message 
            });
        }

        // Generic server error
        res.status(500).json({ 
            message: 'Server error during transaction', 
            error: error.message 
        });
    }
});

// Get user transactions
router.get('/history', authMiddleware, async (req, res) => {
    console.log('Fetching transaction history for user:', req.user.id);
    
    try {
        console.log('Querying transactions...');
        const transactions = await Transaction.find({ 
            user: req.user.id 
        })
        .sort({ createdAt: -1 })
        .lean();

        console.log(`Found ${transactions.length} transactions`);

        // Format transactions to match frontend expectations
        console.log('Formatting transaction data...');
        const formattedTransactions = transactions.map(t => ({
            id: t._id,
            type: t.type,
            amount: t.amount,
            date: new Date(t.createdAt).toISOString().split('T')[0],
            status: t.status,
            notes: t.notes || '', // Include notes in transaction history
            description: t.description || ''
        }));

        console.log('Fetching user wallet data...');
        const user = await User.findById(req.user.id).select('walletBalance totalDeposits').lean();

        console.log('Sending response with wallet data:', {
            walletBalance: user.walletBalance,
            totalDeposits: user.totalDeposits,
            transactionCount: formattedTransactions.length
        });

        res.status(200).json({
            transactions: formattedTransactions,
            walletBalance: user.walletBalance || 0,
            totalDeposits: user.totalDeposits || 0
        });
    } catch (error) {
        console.error('Transaction history error:', {
            error: error.message,
            stack: error.stack,
            userId: req.user.id
        });
        res.status(500).json({ 
            message: 'Error fetching transaction history',
            error: error.message
        });
    }
});

module.exports = router;
