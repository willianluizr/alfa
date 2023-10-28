const axios = require('axios');

class BaseIntegration {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async makeGetRequest(endpoint, params) {
    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        params: params,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Falha na solicitação para ${endpoint}: ${error.message}`);
    }
  }

}

module.exports = BaseIntegration;
