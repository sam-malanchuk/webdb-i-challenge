const express = require('express');

const knex = require('./data/dbConfig.js');

const AccountsRouter = require('./accounts/accountsRouter.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.send('<h3>Use the /api/accounts endpoint to make requests.</h3>');
});

server.get('/accounts', async (req, res) => {
    try {
        const count = await knex('accounts').count({ Accounts: 'id' });
        if(count) {
            res.json(count);
        } else {
            res.json({ message: "There are no accounts" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to count cities" });
    }
});

module.exports = server;