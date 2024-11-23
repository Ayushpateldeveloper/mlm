import React from 'react';
import { motion } from 'framer-motion';
import { 
    UserIcon, 
    DocumentIcon, 
    CreditCardIcon 
} from '@heroicons/react/24/solid';

const HowItWorksSection = () => {
    const steps = [
        {
            title: "Create Account",
            description: "Quick and easy registration with minimal details",
            icon: UserIcon
        },
        {
            title: "Choose Service",
            description: "Browse and select from 500+ services across categories",
            icon: DocumentIcon
        },
        {
            title: "Make Payment",
            description: "Secure, instant transactions with multiple payment options",
            icon: CreditCardIcon
        }
    ];

    return (
        <section className="container mx-auto px-4 py-16">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    How It Works
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Simple steps to manage all your services
                </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.5, 
                            delay: index * 0.2 
                        }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center relative"
                    >
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            bg-primary-500 text-white w-16 h-16 rounded-full flex items-center justify-center
                            shadow-lg">
                            <step.icon className="h-8 w-8" />
                        </div>
                        <div className="pt-10">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {step.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorksSection;
