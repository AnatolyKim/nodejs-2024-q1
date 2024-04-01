import axios from 'axios';
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from './public-holidays.service';
import { PublicHoliday } from '../types';
import { shortenPublicHoliday } from '../helpers';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

describe('Public Holidays Service Unit Tests', () => {
  let spy: jest.SpyInstance;
  const mockData: PublicHoliday[] = [
    {
      date: '2024-01-01',
      localName: 'Neujahr',
      name: 'New Year\'s Day',
      countryCode: 'DE',
      fixed: true,
      global: true,
      counties: null,
      launchYear: 1700,
      types: ['National holiday']
    },
    {
      date: '2024-10-03',
      localName: 'Tag der Deutschen Einheit',
      name: 'Day of German Unity',
      countryCode: 'DE',
      fixed: true,
      global: false,
      counties: null,
      launchYear: 1990,
      types: ['National holiday']
    }
  ];

  beforeEach(() => {
    spy = jest.spyOn(axios, 'get');
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('should get list of public holidays', async () => {
    spy.mockResolvedValueOnce({ data: mockData });

    const result = await getListOfPublicHolidays(2024, 'DE');

    expect(result).toEqual(mockData.map(holiday => shortenPublicHoliday(holiday)));
    expect(spy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/2024/DE`);
  });

  it('should return empty array when getListOfPublicHolidays fails', async () => {
    spy.mockRejectedValueOnce(new Error('Error'));

    const result = await getListOfPublicHolidays(2024, 'DE');

    expect(result).toEqual([]);
  });


  it('should check if today is a public holiday', async () => {
    spy.mockResolvedValueOnce({ status: 200 });
    const result = await checkIfTodayIsPublicHoliday('DE');
    
    expect(result).toBe(true);
    expect(spy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/DE`);
  });

  it('should return false when checkIfTodayIsPublicHoliday fails', async () => {
    spy.mockRejectedValueOnce(new Error('Error'));
    const result = await checkIfTodayIsPublicHoliday('DE');

    expect(result).toBe(false);
  });

  it('should get next public holidays', async () => {
    spy.mockResolvedValueOnce({ data: mockData });

    const result = await getNextPublicHolidays('DE');

    expect(result).toEqual(mockData.map(holiday => shortenPublicHoliday(holiday)));
    expect(spy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/DE`);
  });

  it('should return empty array when getNextPublicHolidays fails', async () => {
    spy.mockRejectedValueOnce(new Error('Error'));
    const result = await getNextPublicHolidays('DE');

    expect(result).toEqual([]);
  });
});

describe('Public Holidays Service Integration Tests', () => {
  it('should get list of public holidays', async () => {
    const year = new Date().getFullYear();
    const country = 'DE';
    const result = await getListOfPublicHolidays(year, country);

    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toHaveProperty('date');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('localName');
  });

  it('should check if today is a public holiday', async () => {
    const country = 'DE';
    const result = await checkIfTodayIsPublicHoliday(country);

    expect(typeof result).toBe('boolean');
  });

  it('should get next public holidays', async () => {
    const country = 'DE';
    const result = await getNextPublicHolidays(country);

    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toHaveProperty('date');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('localName');
  });
});