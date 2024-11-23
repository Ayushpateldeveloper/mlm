import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DevicePhoneMobileIcon, 
  QrCodeIcon, 
  CloudArrowDownIcon,
  StarIcon,
  ShieldCheckIcon,
  BoltIcon
} from '@heroicons/react/24/solid';
import GooglePlayBadge from '../assets/google-play-badge-logo-svgrepo-com.svg';
const MobileAppDownload = () => {
  const [activeTab, setActiveTab] = useState('features');

  const appFeatures = [
    {
      icon: CloudArrowDownIcon,
      title: 'Instant Bill Payments',
      description: 'Pay all your utility bills with just a few taps, anytime, anywhere.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Transactions',
      description: 'Bank-grade encryption ensures your financial data remains completely protected.'
    },
    {
      icon: BoltIcon,
      title: 'Quick Service',
      description: 'Instant bill processing and real-time service updates at your fingertips.'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* App Details Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <DevicePhoneMobileIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                UtilityPro Mobile
              </h2>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your all-in-one utility management companion. Simplify bill payments, track services, and stay informed.
            </p>

            {/* Feature Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                {['features', 'download', 'support'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      activeTab === tab 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {activeTab === 'features' && (
                <div className="space-y-4">
                  {appFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'download' && (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.utilitypro.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:scale-105 transition-transform duration-300"
                    >
                      <img 
                        src={GooglePlayBadge} 
                        alt="Download on Google Play" 
                        width={300}
                        height={300}
                        className="h-32 w-auto object-contain"
                      />
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    <span>4.7 (25,000+ Reviews)</span>
                  </div>
                </div>
              )}

              {activeTab === 'support' && (
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Need help? Our support team is available 24/7.
                  </p>
                  <div className="flex space-x-4">
                    <a 
                      href="mailto:support@utilitypro.com"
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                    >
                      Email Support
                    </a>
                    <a 
                      href="tel:+1-800-UTILITY"
                      className="px-4 py-2 bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
                    >
                      Call Support
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile App Preview */}
          <div className="flex justify-center items-center relative">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-700 p-4 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-blue-500 dark:bg-blue-700 opacity-10 rounded-3xl"></div>
                
                {/* Mock Mobile Screen */}
                <div className="w-64 h-[500px] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg relative">
                  {/* Mock Status Bar */}
                  <div className="absolute top-0 left-0 right-0 flex justify-between p-2 bg-gray-200 dark:bg-gray-900">
                    <span className="text-xs">9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-4 h-2 bg-gray-400 rounded"></div>
                      <div className="w-4 h-2 bg-gray-400 rounded"></div>
                      <div className="w-4 h-2 bg-gray-400 rounded"></div>
                    </div>
                  </div>

                  {/* Mock App Content */}
                  <div className="absolute top-10 left-0 right-0 bottom-0 p-4">
                    <div className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-md">
                      <div className="flex items-center space-x-3 mb-4">
                        <DevicePhoneMobileIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Utility Dashboard
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                          <p className="text-sm text-blue-600 dark:text-blue-300">
                            Electricity Bill
                          </p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            $85.40
                          </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg">
                          <p className="text-sm text-green-600 dark:text-green-300">
                            Water Bill
                          </p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            $42.75
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileAppDownload;
