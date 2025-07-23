"use client";

import { useState } from "react";
import BMIForm from "@/components/BMIForm";
import BMIResult from "@/components/BMIResult";

export default function BMICalculatorPage() {
  const [bmi, setBmi] = useState<number | null>(null);

  return (
    <main className="p-6 min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <h1 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-8">
        Kalkulator BMI
      </h1>
      <BMIForm onCalculate={setBmi} />
      {bmi !== null && <BMIResult bmi={bmi} />}
    </main>
  );
}
