import React from 'react';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen mt-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            About UtilityPro
          </h1>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                UtilityPro aims to simplify utility bill management by providing a seamless, 
                secure, and user-friendly platform that helps individuals and businesses 
                track, pay, and manage their utility expenses efficiently.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Why Choose Us
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Secure and encrypted bill payments</li>
                <li>Real-time expense tracking</li>
                <li>Multiple utility providers supported</li>
                <li>User-friendly interface</li>
                <li>24/7 customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Our Team
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Founded by a team of financial technology experts, UtilityPro is committed 
                to making bill management as simple and stress-free as possible. We leverage 
                cutting-edge technology to provide innovative solutions for our users.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
