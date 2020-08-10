const express = require('express');

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*').from('accounts')
        .then(accounts => {
            res.status(200).json({ data: accounts });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({ error: error.message });
        });
});

router.post('/', (req, res) => {
    const account = req.body;
    
    db('accounts').insert(account).returning('id')
        .then(ids => {
            res.status(201).json({ added: ids });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({ error: error.message });
        });
});

router.get('/:id',(req, res) => {
    const accountId = req.params.id;

    db.select('*').from('accounts').where({ id: accountId })
        .then(account => {
            res.status(200).json(account);
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({ error: error.message });
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    const accountId = req.params.id;

    db('accounts').where({ id: accountId }).update(changes)
        .then(thing => {
            if(thing){
                res.status(200).json({ message: "Sucess" });
            }
            else{
                res.status(404).json({ message: "ID not found"});
            }
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({ error: error.message });
        });
});

router.delete('/:id', (req, res) => {
    const accountId = req.params.id;

    db('accounts').where({ id: accountId }).del()
        .then(thing => {
            if(thing){
                res.status(200).json({ message: 'Sucessfully removed' });
            }
            else{
                res.status(404).json({ message: 'ID not found' });
            }
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({ error: error.message });
        });
});

module.exports = router;