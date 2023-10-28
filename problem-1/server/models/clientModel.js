const pool = require('../config/database');

const ClientModel = {
    getAllClients: async () => {
        const query = 'SELECT * FROM CLIENT';
        const result = await pool.query(query);
        return result.rows;
    },
};

module.exports = ClientModel;
