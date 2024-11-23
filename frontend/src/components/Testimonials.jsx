import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

// Import avatar images
import avatar1 from '../assets/13bc37d5-dd6b-460a-b339-5fb0e06e6454.jpg';
import avatar2 from '../assets/360_F_761356733_9CS91hVomGiiwYBOJavKTsVYHciVezT8.jpg';
import avatar3 from '../assets/images.jpg';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    avatar: avatar1,
    quote: "This platform has revolutionized how I manage my utility payments. It's so intuitive and saves me hours every month!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Freelance Professional",
    avatar: avatar2,
    quote: "The instant recharge and bill payment features are a game-changer. Everything is so seamless and quick.",
    rating: 4
  },
  {
    name: "Emily Rodriguez",
    role: "Digital Entrepreneur",
    avatar: avatar3,
    quote: "I love how I can manage multiple utility services from a single platform. It's convenience redefined!",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Real experiences from people who've transformed their utility management
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4" 
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="italic text-gray-700 dark:text-gray-300 mb-4">
                "{testimonial.quote}"
              </p>
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
