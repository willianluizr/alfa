const assert = require('assert');
const {
  server
} = require('../app');
const axios = require('axios');

describe('API Forkify', () => {
  it('Deve obter uma receita de (pizza)', function (done) {
    axios.get('http://localhost:3000/api/forkify/search?recipe=pizza')
      .then((response) => {
        assert(response.status === 200);
        assert(response.data.recipes.length > 0);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  after((done) => {
    server.close(() => {
      done();
    });
  });
});