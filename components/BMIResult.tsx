"use client";

import { motion } from "framer-motion";

type BMIResultProps = {
  bmi: number;
};

export default function BMIResult({ bmi }: BMIResultProps) {
  let category = "";
  let color = "";

  if (bmi < 18.5) {
    category = "Niedowaga";
    color = "text-yellow-500";
  } else if (bmi < 25) {
    category = "Wartość prawidłowa";
    color = "text-green-600";
  } else if (bmi < 30) {
    category = "Nadwaga";
    color = "text-orange-500";
  } else {
    category = "Otyłość";
    color = "text-red-600";
  }

  return (
    <motion.div
      key={bmi} // resetuje animację
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-6 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-center shadow-lg max-w-md mx-auto"
    >
      <p className="text-xl font-semibold text-zinc-800 dark:text-white mb-2">
        Twoje BMI:
      </p>
      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-3">
        {bmi.toFixed(2)}
      </p>
      <p className={`text-lg font-medium ${color}`}>{category}</p>
    </motion.div>
  );
}
