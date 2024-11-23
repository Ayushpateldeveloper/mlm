import React from 'react';
import { motion } from 'framer-motion';
import { 
    ScaleIcon, 
    BoltIcon, 
    ShieldCheckIcon, 
    CubeTransparentIcon 
} from '@heroicons/react/24/solid';

const BenefitsSection = () => {
    const benefits = [
        {
            icon: ScaleIcon,
            title: "Comprehensive Platform",
            description: "One platform for all your service needs - from mobile recharge to government services."
        },
        {
            icon: BoltIcon,
            title: "Instant Transactions",
            description: "Lightning-fast processing with secure, real-time payment confirmations."
        },
        {
            icon: ShieldCheckIcon,
            title: "Highest Security",
            description: "Bank-grade encryption and multi-factor authentication to protect your data."
        },
        {
            icon: CubeTransparentIcon,
            title: "Transparent Pricing",
            description: "No hidden charges. Clear, upfront pricing for all services."
        }
    ];

    return (
        <section className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-900">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    Why Choose Our Platform
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Experience unparalleled convenience and reliability
                </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={benefit.title}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                            duration: 0.5, 
                            delay: index * 0.2 
                        }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center hover:shadow-lg transition-all"
                    >
                        <benefit.icon className="h-16 w-16 mx-auto mb-4 text-primary-500" />
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                            {benefit.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {benefit.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsSection;
