const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Ticket
router.get('/search', ticketController.getTicketsByMonthAndYear);
router.get('/search/:idOrTitle', ticketController.getTicketByIdOrTitle);
router.get('/grouped-by-client', ticketController.getTicketsByClient);
router.get('/grouped', ticketController.getTicketsByClientAndModule);
router.get('/', ticketController.getAllTickets);
router.post('/', ticketController.createTicket);
router.delete('/:id', ticketController.deleteTicketById);


module.exports = router;
