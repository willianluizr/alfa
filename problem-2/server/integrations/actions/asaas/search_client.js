const axios = require('axios');
const BaseIntegration = require('../../baseIntegration');

class SearchClientIntegration extends BaseIntegration {
  constructor() {
    super('https://sandbox.asaas.com/api');
  }

  async executeRequest({
    method,
    path,
    headers,
    params
  }) {
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

  async searchClient(query) {
    const method = 'GET';
    const path = '/v3/customers';
    const headers = {
      "accept": "application/json",
      "Content-Type": "application/json",
      "access_token": "token"
    };
    const params = {
      name: query
    };

    return this.executeRequest({
      method,
      path,
      headers,
      params
    });
  }
}

module.exports = SearchClientIntegration;