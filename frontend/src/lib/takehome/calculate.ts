/**
 * Simplified gross-salary -> take-home calculator for a single filer with no
 * dependents and no deductions beyond the standard basic/salary deductions.
 * Based on 2024/2025-era national rates. Intended as an estimate, not a
 * payroll-accurate figure — surfaced to users with a disclaimer.
 */

export type TakeHomeBreakdown = {
  grossAnnualYen: number
  salaryIncomeDeductionYen: number
  socialInsurance: {
    healthInsuranceYen: number
    nursingCareInsuranceYen: number
    pensionYen: number
    employmentInsuranceYen: number
    totalYen: number
  }
  incomeTaxYen: number
  residentTaxYen: number
  takeHomeAnnualYen: number
  takeHomeMonthlyYen: number
}

const PENSION_MONTHLY_CAP_YEN = 650_000
const HEALTH_INSURANCE_MONTHLY_CAP_YEN = 1_390_000

function salaryIncomeDeduction(grossAnnualYen: number): number {
  const g = grossAnnualYen
  if (g <= 1_625_000) return Math.min(g, 550_000)
  if (g <= 1_800_000) return g * 0.4 - 100_000
  if (g <= 3_600_000) return g * 0.3 + 80_000
  if (g <= 6_600_000) return g * 0.2 + 440_000
  if (g <= 8_500_000) return g * 0.1 + 1_100_000
  return 1_950_000
}

function socialInsurance(grossAnnualYen: number, age: number) {
  const monthlyRemuneration = grossAnnualYen / 12

  const healthBase = Math.min(monthlyRemuneration, HEALTH_INSURANCE_MONTHLY_CAP_YEN)
  const healthInsuranceMonthly = healthBase * (0.0998 / 2)
  const nursingCareMonthly = age >= 40 ? healthBase * (0.0164 / 2) : 0

  const pensionBase = Math.min(monthlyRemuneration, PENSION_MONTHLY_CAP_YEN)
  const pensionMonthly = pensionBase * (0.183 / 2)

  const employmentInsuranceYen = grossAnnualYen * 0.006

  const healthInsuranceYen = Math.round(healthInsuranceMonthly * 12)
  const nursingCareInsuranceYen = Math.round(nursingCareMonthly * 12)
  const pensionYen = Math.round(pensionMonthly * 12)

  return {
    healthInsuranceYen,
    nursingCareInsuranceYen,
    pensionYen,
    employmentInsuranceYen: Math.round(employmentInsuranceYen),
    totalYen: healthInsuranceYen + nursingCareInsuranceYen + pensionYen + Math.round(employmentInsuranceYen),
  }
}

const INCOME_TAX_BRACKETS = [
  { upTo: 1_950_000, rate: 0.05, deduction: 0 },
  { upTo: 3_300_000, rate: 0.1, deduction: 97_500 },
  { upTo: 6_950_000, rate: 0.2, deduction: 427_500 },
  { upTo: 9_000_000, rate: 0.23, deduction: 636_000 },
  { upTo: 18_000_000, rate: 0.33, deduction: 1_536_000 },
  { upTo: 40_000_000, rate: 0.4, deduction: 2_796_000 },
  { upTo: Infinity, rate: 0.45, deduction: 4_796_000 },
]

function incomeTax(taxableIncomeYen: number): number {
  if (taxableIncomeYen <= 0) return 0
  const bracket = INCOME_TAX_BRACKETS.find((b) => taxableIncomeYen <= b.upTo)!
  const base = Math.max(0, taxableIncomeYen * bracket.rate - bracket.deduction)
  // 復興特別所得税 2.1% surtax on the national income tax amount.
  return Math.round(base * 1.021)
}

function residentTax(taxableIncomeYen: number): number {
  if (taxableIncomeYen <= 0) return 5_000 // 均等割 (per-capita portion) still applies
  return Math.round(taxableIncomeYen * 0.1) + 5_000
}

// 年代バンドごとの代表年齢。社会保険料(40歳以上の介護保険等)の算出に使う。
const AGE_BAND_REPRESENTATIVE_AGE: Record<string, number> = {
  "20-24": 22,
  "25-29": 27,
  "30-34": 32,
  "35-39": 37,
  "40-44": 42,
  "45-49": 47,
  "50+": 53,
}

// 年代を特定しない「全体平均」向けの代表年齢。
export const OVERALL_REPRESENTATIVE_AGE = 35

export function representativeAgeForBand(ageBand: string | null): number {
  if (!ageBand) return OVERALL_REPRESENTATIVE_AGE
  return AGE_BAND_REPRESENTATIVE_AGE[ageBand] ?? OVERALL_REPRESENTATIVE_AGE
}

export function calculateTakeHome(grossAnnualYen: number, age = 30): TakeHomeBreakdown {
  const salaryIncomeDeductionYen = Math.round(salaryIncomeDeduction(grossAnnualYen))
  const si = socialInsurance(grossAnnualYen, age)

  const taxableIncomeNational = Math.max(0, grossAnnualYen - salaryIncomeDeductionYen - si.totalYen - 480_000)
  const taxableIncomeResident = Math.max(0, grossAnnualYen - salaryIncomeDeductionYen - si.totalYen - 430_000)

  const incomeTaxYen = incomeTax(taxableIncomeNational)
  const residentTaxYen = residentTax(taxableIncomeResident)

  const takeHomeAnnualYen = grossAnnualYen - si.totalYen - incomeTaxYen - residentTaxYen
  const takeHomeMonthlyYen = Math.round(takeHomeAnnualYen / 12)

  return {
    grossAnnualYen,
    salaryIncomeDeductionYen,
    socialInsurance: si,
    incomeTaxYen,
    residentTaxYen,
    takeHomeAnnualYen,
    takeHomeMonthlyYen,
  }
}
