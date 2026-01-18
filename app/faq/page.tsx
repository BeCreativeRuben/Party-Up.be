"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const faqs = [
  {
    question: "How do I make a reservation?",
    answer:
      "You can request a quote through our online booking form on the website. Simply fill out the form with your event details, select the items you need, and we'll get back to you within 24 hours to confirm availability and pricing.",
  },
  {
    question: "What is the rental period?",
    answer:
      "Our standard rental period is Friday evening pickup with Sunday evening return. This gives you the full weekend for your event. Other arrangements can be discussed based on availability.",
  },
  {
    question: "Do you deliver and pick up?",
    answer:
      "No, we do not offer delivery or pickup services. Customers are required to personally pick up and return all equipment at our location. Please ensure you have appropriate transportation for the items you're renting.",
  },
  {
    question: "Is a deposit required?",
    answer:
      "A security deposit may be required for certain high-value items. The deposit amount and terms will be communicated when you receive your quote. The deposit is fully refundable upon return of equipment in good condition.",
  },
  {
    question: "What happens if equipment is damaged?",
    answer:
      "Normal wear and tear is expected. However, if equipment is damaged due to misuse or negligence, repair or replacement costs will be deducted from the security deposit. Please refer to our Terms & Conditions for detailed information.",
  },
  {
    question: "Can I cancel my reservation?",
    answer:
      "Yes, cancellations are accepted. Please contact us as soon as possible. Cancellation terms vary based on how far in advance you cancel. Please see our Terms & Conditions for specific cancellation policies.",
  },
  {
    question: "What size events do you cater to?",
    answer:
      "We specialize in events with 10-100 guests. This includes home and garden parties, birthdays, anniversaries, communions, baby showers, and small company gatherings.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 2-3 weeks in advance, especially during peak season (spring and summer). However, we'll do our best to accommodate last-minute requests when possible.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers and cash payments. Payment terms will be detailed in your quote. Typically, a deposit is required to secure your booking, with the balance due before or upon delivery.",
  },
  {
    question: "Do you provide setup instructions?",
    answer:
      "Basic setup instructions are provided with all equipment. For tents and more complex setups, we can provide setup assistance for an additional fee. Please mention this in your booking request.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function FAQPage() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggleFAQ = (index: number) => {
    setOpenIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="text-center mb-12"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold text-gray-900 mb-3"
        >
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Find answers to common questions about our party rental services
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="space-y-4"
      >
        {faqs.map((faq, index) => {
          const isOpen = openIndices.has(index);
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-blue-50 transition-colors group"
                whileHover={{ backgroundColor: "rgba(239, 246, 255, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors pr-4">
                  {faq.question}
                </span>
                <motion.svg
                  className="w-5 h-5 text-gray-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 py-5 bg-gradient-to-b from-blue-50 to-white border-t border-blue-100"
                    >
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12 bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg p-8 text-center border border-blue-100 shadow-md"
      >
        <p className="text-gray-700 mb-4 text-lg">
          Still have questions? We&apos;re here to help!
        </p>
        <motion.a
          href="/contact"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </motion.a>
      </motion.div>
    </div>
  );
}

