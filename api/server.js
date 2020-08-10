const express = require("express");

const AccountRouter = require('../routes/account-router.js');

const server = express();

server.use(express.json());

server.use('/accounts', AccountRouter);

server.get('/', (req, res) => {
    res.status(200).json(`<h2>Please navigate to /accounts</h2>`);
});

module.exports = server;
