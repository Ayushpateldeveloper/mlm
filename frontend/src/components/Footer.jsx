import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  MapPinIcon,
  PhoneIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid';
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram 
} from 'react-icons/fa';

const FooterSection = ({ title, links }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-5 pb-2 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link 
              to={link.path} 
              className="text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Bill Payment', path: '/bill-payment' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Our Services',
      links: [
        { name: 'Electricity Bill', path: '/services/electricity' },
        { name: 'Water Bill', path: '/services/water' },
        { name: 'Mobile Recharge', path: '/services/mobile' },
        { name: 'Internet', path: '/services/internet' },
        { name: 'Gas Bill', path: '/services/gas' },
        { name: 'DTH Recharge', path: '/services/dth' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/support/help' },
        { name: 'FAQs', path: '/support/faqs' },
        { name: 'Contact Support', path: '/support/contact' },
        { name: 'Feedback', path: '/support/feedback' },
        { name: 'Report Issue', path: '/support/report' }
      ]
    }
  ];

  const socialLinks = [
    { 
      icon: FaFacebook, 
      href: 'https://facebook.com/utilitypro',
      color: 'text-blue-600 hover:text-blue-800' 
    },
    { 
      icon: FaTwitter, 
      href: 'https://twitter.com/utilitypro',
      color: 'text-sky-500 hover:text-sky-700' 
    },
    { 
      icon: FaLinkedin, 
      href: 'https://linkedin.com/company/utilitypro',
      color: 'text-blue-700 hover:text-blue-900' 
    },
    { 
      icon: FaInstagram, 
      href: 'https://instagram.com/utilitypro',
      color: 'text-pink-600 hover:text-pink-800' 
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Company Intro and Stay Connected */}
        <div className="md:col-span-1 space-y-6">
          <div className="flex items-center mb-4">
            <img 
              src="/logo.svg" 
              alt="UtilityPro Logo" 
              className="h-12 mr-3" 
            />
            <span className="text-3xl font-bold text-blue-600">UtilityPro</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Revolutionizing utility management through innovative digital solutions. 
            Simplify, pay, and track your utility services with ease and convenience.
          </p>
          
          {/* Contact Info */}
          <div className="space-y-4 text-base">
            <div className="flex items-center space-x-3">
              <PhoneIcon className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 dark:text-gray-300">support@utilitypro.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPinIcon className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 dark:text-gray-300">123 Tech Lane, Silicon Valley</span>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-5">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-all duration-300 transform hover:-translate-y-1 ${social.color}`}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-1">
          <FooterSection 
            title={footerSections[0].title} 
            links={footerSections[0].links} 
          />
        </div>

        {/* Our Services */}
        <div className="md:col-span-1">
          <FooterSection 
            title={footerSections[1].title} 
            links={footerSections[1].links} 
          />
        </div>

        {/* Support */}
        <div className="md:col-span-1">
          <FooterSection 
            title={footerSections[2].title} 
            links={footerSections[2].links} 
          />
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-6 text-center">
        <p className="text-base text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} UtilityPro. All Rights Reserved. 
          <span className="ml-4 text-sm">
            Designed with &hearts; by UtilityPro Team
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
