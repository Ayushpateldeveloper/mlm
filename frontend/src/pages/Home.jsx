import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import DifferenceSection from '../components/DifferenceSection';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import BenefitsSection from '../components/BenefitsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ServicesSection from '../components/ServicesSection';
import MobileAppDownload from '../components/MobileAppDownload';

const Home = () => {
  return (
    <div className="min-h-screen mt-16 bg-gray-50 dark:bg-gray-900">
      {/* <Navbar /> */}
      
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <HowItWorksSection />
      <MobileAppDownload />
      
      <Footer />
    </div>
  );
};

export default Home;