// mock-data.ts
import { Bonus } from "./type";

// Mock bonuses data
export const mockBonuses: Bonus[] = [
  {
    id: "1",
    number: 1,
    name: 'Бонус 1% от 100 м²',
    condition: 10,
    measurementUnit: 'шт',
    operator: '=',
    bonusValue: 1,
    bonusUnit: '%',
    period: 'за 1 день',
    endDate: "2025-02-12T00:00:00.000Z"
  },
  {
    id: "2",
    number: 2,
    name: 'Бонус 1% от 100 м²',
    condition: 100,
    measurementUnit: 'м²',
    operator: '>',
    bonusValue: 1,
    bonusUnit: '%',
    period: 'за месяц',
    endDate: "2025-02-12T00:00:00.000Z"
  },
  {
    id: "3",
    number: 3,
    name: 'Бонус 1% от 100 м²',
    condition: 200,
    measurementUnit: 'м²',
    operator: '>',
    bonusValue: 2,
    bonusUnit: '%',
    period: 'за месяц',
    endDate: "2025-02-12T00:00:00.000Z"
  },
  {
    id: "4",
    number: 4,
    name: 'Бонус 1% от 100 м²',
    condition: 300,
    measurementUnit: 'м²',
    operator: '>',
    bonusValue: 3,
    bonusUnit: '%',
    period: 'за месяц',
    endDate: "2025-02-12T00:00:00.000Z"
  },
  {
    id: "5",
    number: 5,
    name: 'Бонус 1% от 100 м²',
    condition: 400,
    measurementUnit: 'м²',
    operator: '>',
    bonusValue: 4,
    bonusUnit: '%',
    period: 'за месяц',
    endDate: "2025-02-12T00:00:00.000Z"
  }
];

// Constants for form selections
export const OPERATORS = [
  { id: '=', name: 'Равно (=)' },
  { id: '>', name: 'Больше (>)' },
  { id: '<', name: 'Меньше (<)' },
  { id: '>=', name: 'Больше или равно (>=)' },
  { id: '<=', name: 'Меньше или равно (<=)' }
];

export const MEASUREMENT_UNITS = [
  { id: 'шт', name: 'шт' },
  { id: 'м²', name: 'м²' },
  { id: 'кг', name: 'кг' },
  { id: '%', name: '%' }
];

export const BONUS_UNITS = [
  { id: '%', name: '%' },
  { id: '$', name: '$' }
];

export const PERIODS = [
  { id: 'за 1 день', name: 'за 1 день' },
  { id: 'за месяц', name: 'за месяц' },
  { id: 'за квартал', name: 'за квартал' },
  { id: 'за год', name: 'за год' }
];