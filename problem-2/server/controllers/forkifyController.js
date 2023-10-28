const SearchRecipeIntegration = require('../integrations/actions/forkify/search_recipe');
const searchRecipeIntegration = new SearchRecipeIntegration();

exports.searchRecipe = async (req, res) => {
  try {
    const { recipe } = req.query;

    if (!recipe) {
      return res.status(400).json({
        error: 'O parâmetro "recipe" está faltando'
      });
    }
    const response = await searchRecipeIntegration.searchRecipe(recipe);
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

