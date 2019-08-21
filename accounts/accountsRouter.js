const express = require('express');

const knex = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await knex('accounts');
        console.log(accounts);
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: "Error getting accounts"});
    }
});

module.exports = router;