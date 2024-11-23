import React from 'react';
import { motion } from 'framer-motion';
import { 
  BoltIcon, 
  CreditCardIcon, 
  DevicePhoneMobileIcon,
  SparklesIcon,
  ChartBarIcon
} from '@heroicons/react/24/solid';

// Import all available avatar images
import avatar1 from '../assets/13bc37d5-dd6b-460a-b339-5fb0e06e6454.jpg';
import avatar2 from '../assets/360_F_761356733_9CS91hVomGiiwYBOJavKTsVYHciVezT8.jpg';
import avatar3 from '../assets/images.jpg';
import avatar4 from '../assets/man-profile-portrait-confident-look-avatar-face-user-side-view-young-attractive-guy-isolated-neutral-background-circle-249867939.webp';
import avatar5 from '../assets/portrait-beautiful-young-business-woman-glasses-white-suit_1142-50980.avif';
import avatar6 from '../assets/smiling-young-man-illustration_1308-173524.avif';

// Hero section image
import heroImage from '../assets/mobile-recharge-api_tgsiv4.webp';

// import heroImage from '../assets/mobile-recharge-api_tgsiv4.webp';

const HeroSection = () => {
  const userImages = [
    avatar1, avatar2, avatar3, avatar4, avatar5, avatar6
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative">
        {/* Left Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 z-10 relative pr-8"
        >
          <motion.div 
            variants={itemVariants}
            className="flex items-center space-x-3"
          >
            <SparklesIcon className="h-8 w-8 text-blue-500" />
            <span className="text-blue-600 font-semibold tracking-wide uppercase">
              Revolutionize Your Payments
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl leading-tight"
          >
            Seamless <span className="text-blue-600">Utility</span> Payments
            <br />
            <span className="text-gray-600 dark:text-gray-300 text-3xl">
              All Services, One Platform
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            Simplify your life with instant mobile recharges, bill payments, and more. Experience the future of digital services.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mt-8 space-y-4"
          >
            {[
              { 
                icon: DevicePhoneMobileIcon, 
                text: 'Instant Mobile Recharge', 
                color: 'text-green-500' 
              },
              { 
                icon: CreditCardIcon, 
                text: 'Secure Bill Payments', 
                color: 'text-purple-500' 
              },
              { 
                icon: BoltIcon, 
                text: 'Lightning Fast Transactions', 
                color: 'text-yellow-500' 
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                  {feature.text}
                </span>
              </div>
            ))}
          </motion.div>
          
          {/* User Testimonial Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex items-center"
          >
            <div className="flex -space-x-3">
              {userImages.slice(0, 5).map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`User ${index + 1}`} 
                  className="h-12 w-12 rounded-full border-3 border-white object-cover shadow-md" 
                />
              ))}
            </div>
            <div className="ml-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Trusted by 50,000+ Users
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Rated 4.8/5 ★★★★☆
              </p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Right Image with Floating Elements */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative md:block hidden pl-8"
        >
          {/* Main Image */}
          <div className="relative">
            <motion.img 
              src={heroImage} 
              alt="Mobile Recharge Services" 
              className="w-full max-w-md h-auto object-contain z-10 relative" 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          </div>

          {/* Floating Stats Cards */}
          <motion.div 
            variants={floatingVariants}
            animate="float"
            className="absolute top-0 -right-10 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-xl flex items-center z-20"
          >
            <ChartBarIcon className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                500+
              </p>
              <p className="text-xs text-gray-500">
                Services Available
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={floatingVariants}
            animate="float"
            className="absolute bottom-10 -left-10 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-xl flex items-center z-20"
          >
            <BoltIcon className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                3 Sec
              </p>
              <p className="text-xs text-gray-500">
                Average Transaction
              </p>
            </div>
          </motion.div>

          {/* Decorative Floating Circles */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-10 -left-10 w-48 h-48 bg-blue-100 dark:bg-blue-900 rounded-full opacity-30 blur-2xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              delay: 1,
              ease: "easeInOut"
            }}
            className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-100 dark:bg-purple-900 rounded-full opacity-30 blur-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
