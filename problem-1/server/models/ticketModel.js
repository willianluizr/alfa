const pool = require('../config/database');

const TicketModel = {
    createTicket: async (title, fk_id_client, opening_date, closing_date, fk_id_module) => {
        const query = 'INSERT INTO TICKET (TITLE, FK_ID_CLIENT, OPENING_DATE, CLOSING_DATE, FK_ID_MODULE) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [title, fk_id_client, opening_date, closing_date, fk_id_module];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getTicketsByMonthAndYear: async (month, year) => {
        const query = 'SELECT * FROM TICKET WHERE EXTRACT(MONTH FROM OPENING_DATE) = $1 AND EXTRACT(YEAR FROM OPENING_DATE) = $2';
        const values = [month, year];
        const result = await pool.query(query, values);
        return result.rows;
    },

    getTicketsByClient: async () => {
        const query = 'SELECT CLIENT.NAME AS CLIENT_NAME, COUNT(*) as TOTAL_TICKETS FROM TICKET INNER JOIN CLIENT ON TICKET.FK_ID_CLIENT = CLIENT.ID GROUP BY CLIENT.NAME';
        const result = await pool.query(query);
        return result.rows;
    },

    getAllTickets: async () => {
        const query = 'SELECT * FROM TICKET';
        const result = await pool.query(query);
        return result.rows;
    },

    getTicketById: async (id) => {
        const query = 'SELECT * FROM TICKET WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            throw new Error('Ticket não encontrado.');
        }
        return result.rows[0];
    },

    getTicketsByTitle: async (title) => {
        const query = 'SELECT * FROM TICKET WHERE title = $1';
        const values = [title];
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            throw new Error('Nenhum ticket com esse título encontrado.');
        }
        return result.rows;
    },
    
    deleteTicketById: async (id) => {
        const query = 'DELETE FROM TICKET WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            throw new Error('Ticket não encontrado para exclusão.');
        }
        return result.rows[0];
    },
};

module.exports = TicketModel;
