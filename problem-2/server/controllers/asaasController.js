const SearchClientIntegration = require('../integrations/actions/asaas/search_client');
const searchClientIntegration = new SearchClientIntegration();

const CreateClientIntegration = require('../integrations/actions/asaas/create_client');
const createClientIntegration = new CreateClientIntegration();

exports.searchClient = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        error: 'O parâmetro "name" está faltando'
      });
    }
    const response = await searchClientIntegration.searchClient(name);
    res.json(response);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({
        error: 'Erro ao consultar a API externa'
      });
    }
  }
};

exports.createClient = async (req, res) => {
  try {
    const { name, cpfCnpj } = req.body;

    if (!name || !cpfCnpj) {
      return res.status(400).json({
        error: 'Campos "name" e "cpfCnpj" são obrigatórios'
      });
    }

    const response = await createClientIntegration.createClient({ name, cpfCnpj });
    res.json(response);
  } catch (error) {
    console.error('Erro na solicitação à API externa:', error);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({
        error: 'Erro ao criar o cliente na API externa'
      });
    }
  }  
};
