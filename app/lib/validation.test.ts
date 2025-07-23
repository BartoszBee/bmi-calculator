import { describe, it, expect } from "vitest";
import { bmiSchema } from "./validation";

describe("bmiSchema", () => {
  it("powinien przejść walidację dla poprawnych danych", () => {
    const result = bmiSchema.safeParse({ weight: "80", height: "180" });
    expect(result.success).toBe(true);
  });

  it("powinien zwrócić błąd dla pustych pól", () => {
    const result = bmiSchema.safeParse({ weight: "", height: "" });
    expect(result.success).toBe(false);
  });

  it("powinien zwrócić błąd dla zbyt małej wagi", () => {
    const result = bmiSchema.safeParse({ weight: "5", height: "170" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/Minimalna waga/i);
  });

  it("powinien zwrócić błąd dla zbyt dużego wzrostu", () => {
    const result = bmiSchema.safeParse({ weight: "80", height: "300" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/Maksymalny wzrost/i);
  });

  it("powinien zwrócić błąd dla nie-numericznej wartości", () => {
    const result = bmiSchema.safeParse({ weight: "abc", height: "xyz" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/liczbą/i);
  });
});
