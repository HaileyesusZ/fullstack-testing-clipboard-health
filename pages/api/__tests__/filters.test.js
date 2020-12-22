import { createMocks } from 'node-mocks-http';
import handleJobs from '../jobs';

describe('/api/jobs', () => {
  test('filters jobs based on keyword', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        keyword: 'Mammoth Hospital',
      },
    });

    await handleJobs(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    if (data && data.length) {
      expect(data[0].name).toBe('Mammoth Hospital');
    }
  });

  test('filters jobs based on filter', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        filter: 'Part-time',
      },
    });

    await handleJobs(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    if (data && data.length) {
      const jobItems = data[0].items;
      if (jobItems && jobItems.length) {
        expect(jobItems[0].job_type).toBe('Part-time');
      }
    }
  });
});
