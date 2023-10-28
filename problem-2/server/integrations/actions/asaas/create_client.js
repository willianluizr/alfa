const axios = require('axios');
const BaseIntegration = require('../../baseIntegration');

class CreateClientIntegration extends BaseIntegration {
  constructor() {
    super('https://sandbox.asaas.com/api');
  }

  async executeRequest({
    method,
    path,
    headers,
    data
  }) {
    try {
      const response = await axios.request({
        method,
        url: this.baseUrl + path,
        headers,
        data,
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

  async createClient(data) {
    const method = 'POST';
    const path = '/v3/customers';
    const headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'access_token': 'token'
    };

    return this.executeRequest({
      method,
      path,
      headers,
      data,
    });
  }
}

module.exports = CreateClientIntegration;
