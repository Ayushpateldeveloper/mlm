import React from 'react';
import Footer from '../components/Footer';

const Services = () => {
  const servicesList = [
    {
      title: 'Electricity Bill Payment',
      description: 'Pay your electricity bills quickly and securely with multiple providers.',
      icon: '⚡'
    },
    {
      title: 'Water Bill Payment',
      description: 'Manage and pay your water bills hassle-free.',
      icon: '💧'
    },
    {
      title: 'Mobile Recharge',
      description: 'Recharge your mobile prepaid and postpaid connections instantly.',
      icon: '📱'
    },
    {
      title: 'DTH Recharge',
      description: 'Recharge your DTH connection with ease.',
      icon: '📺'
    },
    {
      title: 'Gas Bill Payment',
      description: 'Pay your gas bills conveniently online.',
      icon: '🔥'
    },
    {
      title: 'Internet Bill Payment',
      description: 'Pay your broadband and internet bills seamlessly.',
      icon: '🔔'
    }
  ];

  return (
    <div className="min-h-screen mt-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            UtilityPro offers comprehensive solutions to manage and pay your utility bills efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105"
            >
              <div className="text-5xl mb-4 text-center">{service.icon}</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-4">
                {service.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Services;
