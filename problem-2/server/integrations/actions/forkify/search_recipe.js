const axios = require('axios');
const BaseIntegration = require('../../baseIntegration');

class SearchRecipeIntegration extends BaseIntegration {
  constructor() {
    super('https://forkify-api.herokuapp.com/api/');
  }

  async executeRequest({ method, path, headers, params }) {
    try {
      const response = await axios.request({
        method,
        url: this.baseUrl + path,
        headers,
        params,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Erro na solicitação à API personalizada');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      throw error;
    }
  }

  async searchRecipe(query) {
    const method = 'GET';
    const path = '/search';
    const headers = {
    };
    const params = { q: query };

    return this.executeRequest({ method, path, headers, params });
  }
}

module.exports = SearchRecipeIntegration;
