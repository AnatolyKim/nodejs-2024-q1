import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

describe('GET /PublicHolidays/:year/:country', () => {
  it('responds with json', async () => {
    const year = new Date().getFullYear();
    const country = 'DE';
    const response = await request(PUBLIC_HOLIDAYS_API_URL)
      .get(`/PublicHolidays/${year}/${country}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('date');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('localName');
  });

  it('responds with validation failure', async () => {
    const year = 'invalid year';
    const country = 'US';

    await request(PUBLIC_HOLIDAYS_API_URL)
      .get(`/PublicHolidays/${year}/${country}`)
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('responds with country code unknown failure', async () => {
    const year = new Date().getFullYear();
    const country = 'Unsupported Country';

    await request(PUBLIC_HOLIDAYS_API_URL)
      .get(`/PublicHolidays/${year}/${country}`)
      .expect(404);
  });
});

describe('GET /api/v3/IsTodayPublicHoliday/:countryCode', () => {
  it('responds with today is public holiday or not', async () => {
    const country = 'DE';
    const response = await request(PUBLIC_HOLIDAYS_API_URL)
      .get(`/IsTodayPublicHoliday/${country}`)

    expect([200, 204]).toContain(response.status);
  });

  it('responds with country code unknown failure', async () => {
    const country = 'Unsupported Country';

    await request(PUBLIC_HOLIDAYS_API_URL)
      .get(`/IsTodayPublicHoliday/${country}`)
      .expect('Content-Type', /json/)
      .expect(404);
  });
});