const express = require('express');

const knex = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await knex('accounts');
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: "Error getting accounts"});
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const accounts = await knex('accounts').where({ id });
        const account = accounts[0];
        res.json(account);
    } catch (error) {
        res.status(500).json({ message: "Error getting account"});
    }
});

router.post('/', async (req, res) => {
    const accountData = req.body;

    try {
        const account = await knex('accounts').insert(accountData);
        if(account) {
            res.status(201).json({ message: "Account successfully created!" });
        } else {
            res.status(404).json({ message: "Account ID not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Account could not be created" });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const accountChanges = req.body;

    try {
        const changes = await knex('accounts').where({ id }).update(accountChanges);
        if(changes) {
            res.status(201).json({ message: "Account successfully updated!" });
        } else {
            res.status(404).json({ message: "Account ID not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating account" });
    }
});

module.exports = router;