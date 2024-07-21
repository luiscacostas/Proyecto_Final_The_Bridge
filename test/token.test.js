import * as chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Tokens API', () => {
  describe('GET /tokens', () => {
    it('should get all tokens', (done) => {
      chai.request(app)
        .get('/tokens')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /tokens', () => {
    it('should create a new token', (done) => {
      const token = {
        name: 'Test Token',
        latitude: 40.73061,
        longitude: -73.935242
      };
      chai.request(app)
        .post('/tokens')
        .send(token)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name').eql('Test Token');
          done();
        });
    });
  });
});
