const pool = require('../config/database');

const ModuleModel = {
    getAllModules: async () => {
        const query = 'SELECT * FROM MODULE';
        const result = await pool.query(query);
        return result.rows;
    },
};

module.exports = ModuleModel;
