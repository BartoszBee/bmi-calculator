import { z } from "zod";

export const bmiSchema = z.object({
  weight: z
    .string()
    .min(1, "Podaj wagę")
    .refine((val) => !isNaN(+val), { message: "Waga musi być liczbą" })
    .transform((val) => +val)
    .pipe(z.number().min(10, "Minimalna waga to 10 kg").max(300, "Maksymalna waga to 300 kg")),

  height: z
    .string()
    .min(1, "Podaj wzrost")
    .refine((val) => !isNaN(+val), { message: "Wzrost musi być liczbą" })
    .transform((val) => +val)
    .pipe(z.number().min(50, "Minimalny wzrost to 50 cm").max(250, "Maksymalny wzrost to 250 cm")),
});

export type BMIFormData = z.infer<typeof bmiSchema>;
