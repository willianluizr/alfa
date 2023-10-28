const TicketModel = require('../models/ticketModel');
const ClientModel = require('../models/clientModel');
const ModuleModel = require('../models/moduleModel');

exports.createTicket = async (req, res) => {
    try {
        const { title, fk_id_client, opening_date, closing_date, fk_id_module } = req.body;
        const newTicket = await TicketModel.createTicket(title, fk_id_client, opening_date, closing_date, fk_id_module);
        res.status(201).json(newTicket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o ticket' });
    }
};

exports.getTicketsByMonthAndYear = async (req, res) => {
    const { month, year } = req.query;
    try {
        const tickets = await TicketModel.getTicketsByMonthAndYear(month, year);
        const count = tickets.length;
        res.json({ count, tickets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar os tickets' });
    }
};

exports.getTicketsByClient = async (req, res) => {
    try {
        const clientData = await TicketModel.getTicketsByClient();
        res.json(clientData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar dados agrupados por cliente' });
    }
};

exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await TicketModel.getAllTickets();
        const count = tickets.length;
        res.json({ count, tickets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar os tickets' });
    }
};

exports.getTicketByIdOrTitle = async (req, res) => {
    const idOrTitle = req.params.idOrTitle;
    try {
        if (!isNaN(idOrTitle)) {
            const ticket = await TicketModel.getTicketById(idOrTitle);
            res.json(ticket);
        } else {
            const tickets = await TicketModel.getTicketsByTitle(idOrTitle);
            res.json(tickets);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar os tickets' });
    }
};

exports.deleteTicketById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTicket = await TicketModel.deleteTicketById(id);

        if (deletedTicket) {
            res.status(200).json({ message: 'Ticket excluído com sucesso' });
        } else {
            res.status(404).json({ error: 'Ticket não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o ticket' });
    }
};

exports.getTicketsByClientAndModule = async (req, res) => {
    try {
        const tickets = await TicketModel.getAllTickets();

        const clients = await ClientModel.getAllClients();
        const clientMap = createIdToNameMap(clients);

        const modules = await ModuleModel.getAllModules();
        const moduleMap = createIdToNameMap(modules);

        const groupedByClient = groupTicketsByClient(tickets, clientMap);
        const groupedByModule = groupTicketsByModule(tickets, moduleMap);

        res.json({ groupedByClient, groupedByModule });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar os dados agrupados' });
    }
};

function createIdToNameMap(data) {
    const map = {};
    for (const item of data) {
        map[item.id] = item.name;
    }
    return map;
}

function groupTicketsByClient(tickets, clientMap) {
    const grouped = {};
    for (const ticket of tickets) {
        const clientId = ticket.fk_id_client;
        const clientName = clientMap[clientId] || clientId.toString();
        if (!grouped[clientName]) {
            grouped[clientName] = [];
        }
        grouped[clientName].push(ticket);
    }
    return grouped;
}

function groupTicketsByModule(tickets, moduleMap) {
    const grouped = {};
    for (const ticket of tickets) {
        const moduleId = ticket.fk_id_module;
        const moduleName = moduleMap[moduleId] || moduleId.toString();
        if (!grouped[moduleName]) {
            grouped[moduleName] = [];
        }
        grouped[moduleName].push(ticket);
    }
    return grouped;
}
