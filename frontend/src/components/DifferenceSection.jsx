import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  BoltIcon, 
  GlobeAltIcon,
  SparklesIcon
} from '@heroicons/react/24/solid';

const differencePoints = [
  {
    icon: ShieldCheckIcon,
    title: "Unmatched Security",
    description: "Bank-grade encryption and multi-factor authentication to protect your data and transactions.",
    color: "text-blue-500"
  },
  {
    icon: BoltIcon,
    title: "Instant Processing",
    description: "Lightning-fast transactions with 99.9% uptime and instant confirmation for all services.",
    color: "text-yellow-500"
  },
  {
    icon: GlobeAltIcon,
    title: "Comprehensive Coverage",
    description: "500+ services across multiple utility categories, all accessible from a single platform.",
    color: "text-green-500"
  },
  {
    icon: SparklesIcon,
    title: "Seamless Experience",
    description: "Intuitive UI/UX designed for maximum user comfort and minimal friction.",
    color: "text-purple-500"
  }
];

const DifferenceSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Why We're Different
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Revolutionizing utility management with cutting-edge technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differencePoints.map((point, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 transform hover:scale-105 transition-transform shadow-md"
            >
              <div className={`mb-4 ${point.color}`}>
                <point.icon className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {point.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;
