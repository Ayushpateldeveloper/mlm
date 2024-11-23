import React from 'react';
import { motion } from 'framer-motion';
import { RocketLaunchIcon } from '@heroicons/react/24/solid';

const CTASection = () => {
  return (
    <section className="bg-blue-600 dark:bg-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold mb-6">
            Ready to Simplify Your Utility Management?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied users who've transformed their service experience. 
            Start your journey to hassle-free utility payments today.
          </p>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors flex items-center"
            >
              <RocketLaunchIcon className="h-6 w-6 mr-2" />
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Right Content - Floating Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex justify-center items-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-white/20 p-8 rounded-2xl">
              <div className="grid grid-cols-3 gap-4">
                {[...Array(9)].map((_, index) => (
                  <div 
                    key={index} 
                    className="w-16 h-16 bg-white/30 rounded-lg animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
