"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const faqs = [
  {
    question: "Hoe maak ik een reservering?",
    answer:
      "Je kunt een offerte aanvragen via ons online boekingsformulier op de website. Vul gewoon het formulier in met de details van jouw evenement, selecteer de items die je nodig hebt, en we nemen binnen 24 uur contact met je op om de beschikbaarheid en prijzen te bevestigen.",
  },
  {
    question: "Wat is de huurperiode?",
    answer:
      "Onze standaard huurperiode is ophalen op vrijdagavond en terugbrengen op zondagavond. Dit geeft je het volledige weekend voor jouw evenement. Andere regelingen kunnen worden besproken op basis van beschikbaarheid.",
  },
  {
    question: "Bezorgen en halen jullie op?",
    answer:
      "Nee, we bieden geen bezorg- of ophaalservice aan. Klanten moeten alle materiaal persoonlijk ophalen en terugbrengen op onze locatie. Zorg ervoor dat je over geschikt vervoer beschikt voor de items die je huurt.",
  },
  {
    question: "Is een borg vereist?",
    answer:
      "Voor bepaalde waardevolle items kan een waarborgsom vereist zijn. Het borgbedrag en de voorwaarden worden gecommuniceerd wanneer je jouw offerte ontvangt. De borg is volledig terugbetaalbaar bij terugkeer van het materiaal in goede staat.",
  },
  {
    question: "Wat gebeurt er als materiaal beschadigd is?",
    answer:
      "Normale slijtage is te verwachten. Als materiaal echter beschadigd is door misbruik of nalatigheid, worden de reparatie- of vervangingskosten afgetrokken van de waarborgsom. Raadpleeg onze Algemene Voorwaarden voor gedetailleerde informatie.",
  },
  {
    question: "Kan ik mijn reservering annuleren?",
    answer:
      "Ja, annuleringen worden geaccepteerd. Neem zo snel mogelijk contact met ons op. Annuleringsvoorwaarden variëren afhankelijk van hoe ver van tevoren je annuleert. Zie onze Algemene Voorwaarden voor specifieke annuleringsbeleid.",
  },
  {
    question: "Voor welke evenementen zijn jullie geschikt?",
    answer:
      "We specialiseren ons in evenementen met 10-100 gasten. Dit omvat thuis- en tuinfeesten, verjaardagen, jubilea, communies, babyshowers en kleine bedrijfsbijeenkomsten.",
  },
  {
    question: "Hoe ver van tevoren moet ik boeken?",
    answer:
      "We raden aan om minstens 2-3 weken van tevoren te boeken, vooral tijdens het hoogseizoen (lente en zomer). We doen echter ons best om last-minute verzoeken te honoreren wanneer mogelijk.",
  },
  {
    question: "Welke betaalmethoden accepteren jullie?",
    answer:
      "We accepteren overschrijvingen en contante betalingen. De betalingsvoorwaarden worden vermeld in jouw offerte. Meestal is een aanbetaling vereist om jouw boeking te bevestigen, met het resterende bedrag verschuldigd voor of bij ophalen.",
  },
  {
    question: "Geven jullie opzetinstructies?",
    answer:
      "Basis opzetinstructies worden bij alle materiaal geleverd. Voor tenten en complexere opstellingen kunnen we tegen een meerprijs opzetassistentie bieden. Vermeld dit in jouw boekingsverzoek.",
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
            Veelgestelde Vragen
          </span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Vind antwoorden op veelgestelde vragen over onze feestverhuur
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
          Nog vragen? We helpen je graag!
        </p>
        <motion.a
          href="/contact"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Neem Contact Op
        </motion.a>
      </motion.div>
    </div>
  );
}

