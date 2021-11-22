import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';
import app from '../../api/server';

describe('Health Route', () => {
  describe('given has been request', () => {
    it('when customer is created then should show it on list', async () => {
      expect.hasAssertions();
      const res = await supertest(app)
        .get('/health');

      expect(res.statusCode).toEqual(StatusCodes.OK);
      expect(res.body.message).toEqual('Server status ok!');
    });
  });
});
