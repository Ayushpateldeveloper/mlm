import React from 'react';
import Confetti from 'react-confetti';

const ConfettiModal = ({ 
    isOpen, 
    onClose, 
    message = 'Congratulations!', 
    subMessage = 'Your transaction was successful' 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                numberOfPieces={200}
                recycle={false}
                onConfettiComplete={() => {
                    setTimeout(onClose, 1000);
                }}
            />
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-md mx-auto relative z-50">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {message}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {subMessage}
                </p>
                <button 
                    onClick={onClose}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ConfettiModal;
