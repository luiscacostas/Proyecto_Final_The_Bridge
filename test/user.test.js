import * as chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js'; 

chai.use(chaiHttp);
const { expect } = chai;

describe('Users API', () => {
  describe('GET /users', () => {
    it('should get all users', (done) => {
      chai.request(app)
        .get('/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /users', () => {
    it('should create a new user', (done) => {
      const user = {
        email: 'test@example.com',
        password: 'password123'
      };
      chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('email').eql('test@example.com');
          done();
        });
    });
  });
});