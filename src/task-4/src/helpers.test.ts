import { shortenPublicHoliday, validateInput } from './helpers';
import { SUPPORTED_COUNTRIES } from './config';
import { PublicHoliday, PublicHolidayShort } from './types';

describe('Helpers Unit Tests', () => {
  it('should validate correct input', () => {
    const input = { year: new Date().getFullYear(), country: SUPPORTED_COUNTRIES[0] };
    expect(validateInput(input)).toBe(true);
  });

  it('should throw error for unsupported country', () => {
    const input = { year: new Date().getFullYear(), country: 'unsupported country' };
    expect(() => validateInput(input)).toThrowError(/Country provided is not supported/);
  });

  it('should throw error for incorrect year', () => {
    const input = { year: new Date().getFullYear() - 1, country: SUPPORTED_COUNTRIES[0] };
    expect(() => validateInput(input)).toThrowError(/Year provided not the current/);
  });

  it('should shorten public holiday', () => {
    const holiday: PublicHoliday = {
      date: '2022-01-01',
      localName: 'Neujahr',
      name: 'New Year\'s Day',
      countryCode: 'DE',
      fixed: true,
      global: true,
      counties: null,
      launchYear: 1700,
      types: ['National holiday']
    };

    const expectedShortHoliday: PublicHolidayShort = {
      date: '2022-01-01',
      localName: 'Neujahr',
      name: 'New Year\'s Day',
    };

    expect(shortenPublicHoliday(holiday)).toEqual(expectedShortHoliday);
  });
});