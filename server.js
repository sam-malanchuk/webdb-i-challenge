const express = require('express');

const db = require('./data/dbConfig.js');

const AccountsRouter = require('./accounts/accountsRouter.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.send('<h3>Use the /api/accounts endpoint to make requests.</h3>');
});

module.exports = server;