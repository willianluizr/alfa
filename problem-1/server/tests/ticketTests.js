const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('API de Tickets', () => {
    let server; 
    before((done) => {
        server = app.listen(3000, () => {
            console.log('Servidor de teste iniciado na porta 3000');
            done();
        });
    });

    it('Deve criar um novo ticket', async function () {        
        const res = await chai.request(server)
            .post('/api/tickets')
            .send({
                title: 'Título do Ticket',
                fk_id_client: 1,
                opening_date: '2023-10-26',
                closing_date: '2023-10-27',
                fk_id_module: 1,
            });
        console.log('Teste de criação de ticket concluído.');
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.equal('Título do Ticket');
    });

    it('Deve obter todos os tickets', async function () {
        const res = await chai.request(server)
            .get('/api/tickets');
        console.log('Teste de obtenção de todos os tickets concluído.');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('tickets');
        expect(res.body.tickets).to.be.an('array');
    });
    
    after((done) => {
        server.close(() => {
            console.log('Servidor de teste encerrado na porta 3000.');
            done();
        });
    });
});
