import React from 'react';
import { motion } from 'framer-motion';
import { 
    PhoneIcon, 
    ComputerDesktopIcon, 
    WifiIcon, 
    CreditCardIcon, 
    HomeIcon, 
    DocumentCheckIcon,
    BookOpenIcon,
    BeakerIcon,
    LightBulbIcon,
    PaperAirplaneIcon,
    TvIcon,
    DevicePhoneMobileIcon
} from '@heroicons/react/24/solid';

const serviceCategories = [
    {
        name: 'Mobile Services',
        icon: DevicePhoneMobileIcon,
        services: [
            'Prepaid Recharge',
            'Postpaid Bill Payment',
            'Mobile Data Plans',
            'International Roaming',
            'Number Portability'
        ]
    },
    {
        name: 'DTH & Entertainment',
        icon: TvIcon,
        services: [
            'DTH Recharge',
            'Cable TV Bill',
            'Digital TV Packages',
            'OTT Subscriptions',
            'Movie Ticket Booking'
        ]
    },
    {
        name: 'Internet & Connectivity',
        icon: WifiIcon,
        services: [
            'Broadband Plans',
            'Wifi Recharge',
            'Fiber Optic Services',
            'Internet Security',
            'Network Troubleshooting'
        ]
    },
    {
        name: 'Financial Services',
        icon: CreditCardIcon,
        services: [
            'Credit Card Bills',
            'Loan Repayments',
            'Insurance Premiums',
            'Investment Tracking',
            'Personal Finance Management'
        ]
    },
    {
        name: 'Travel & Booking',
        icon: PaperAirplaneIcon,
        services: [
            'Flight Tickets',
            'Train Reservations',
            'Hotel Bookings',
            'Bus Tickets',
            'Travel Insurance'
        ]
    },
    {
        name: 'Utility Bills',
        icon: HomeIcon,
        services: [
            'Electricity Bill',
            'Water Bill',
            'Gas Bill',
            'Municipal Taxes',
            'Property Maintenance'
        ]
    },
    {
        name: 'Government Services',
        icon: DocumentCheckIcon,
        services: [
            'Aadhar Services',
            'PAN Card',
            'Passport Renewal',
            'Income Tax Filing',
            'Digital Certificates'
        ]
    },
    {
        name: 'Education & Learning',
        icon: BookOpenIcon,
        services: [
            'Course Payments',
            'Exam Fees',
            'Library Subscriptions',
            'Online Learning Platforms',
            'Educational Loans'
        ]
    },
    {
        name: 'Healthcare',
        icon: BeakerIcon,
        services: [
            'Medical Insurance',
            'Hospital Bills',
            'Medicine Delivery',
            'Health Checkup Bookings',
            'Telemedicine Consultations'
        ]
    },
    {
        name: 'Startup & Business',
        icon: LightBulbIcon,
        services: [
            'Business Registration',
            'GST Payments',
            'Startup Funding',
            'Business Consultancy',
            'Legal Services'
        ]
    }
];

const ServiceCard = ({ category, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.5, 
                delay: index * 0.1 
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6"
        >
            <div className="flex items-center mb-4">
                <category.icon className="h-10 w-10 text-primary-500 mr-4" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{category.name}</h3>
            </div>
            <ul className="space-y-2">
                {category.services.map((service, idx) => (
                    <li 
                        key={idx} 
                        className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors"
                    >
                        {service}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

const ServicesSection = () => {
    return (
        <section className="container mx-auto px-4 py-16">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    Our Services
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Discover the wide range of services we offer
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceCategories.map((category, index) => (
                    <ServiceCard 
                        key={category.name} 
                        category={category} 
                        index={index} 
                    />
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;
