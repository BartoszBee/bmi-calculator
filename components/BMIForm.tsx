"use client";

import { useState } from "react";
import { bmiSchema } from "@/app/lib/validation";
import { AlertCircle } from "lucide-react";

type BMIFormProps = {
  onCalculate: (bmi: number | null) => void;
};

export default function BMIForm({ onCalculate }: BMIFormProps) {
  const [formData, setFormData] = useState({ weight: "", height: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = bmiSchema.safeParse(formData);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Błąd walidacji";
      setError(firstError);
      onCalculate(null); 
      return;
    }

    const { weight, height } = parsed.data;
    const bmi = weight / ((height / 100) ** 2);
    onCalculate(bmi);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6 max-w-md mx-auto border border-zinc-200 dark:border-zinc-700"
    >
      <h2 className="text-xl font-bold mb-6 text-center text-zinc-800 dark:text-white">
        Oblicz swoje BMI
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Waga (kg)
        </label>
        <input
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="np. 80"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Wzrost (cm)
        </label>
        <input
          name="height"
          type="number"
          value={formData.height}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="np. 180"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/30 p-3 rounded-lg mb-4 border border-red-300 dark:border-red-700">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
      >
        Oblicz BMI
      </button>
    </form>
  );
}
