'use strict'
const express = require('express');
const { user } = require('../models/index');
const { home } = require('../models/index');
const router = express.Router();
const bcrypt = require('bcrypt');
const basicAuth = require('../auth/middleware/basickauth');
const barearAuth = require('../auth/middleware/barear');
const acl = require('../auth/middleware/acl');

router.post('/signUp', async (req, res) => {
    try {
        
        req.body.password = await bcrypt.hash(req.body.password, 5)
        
        let record = await user.create(req.body);
        res.status(201).json(record);
    } catch (error) {
        throw new Error(error.message)
    }
})

router.post('/signin', basicAuth, (req, res) => {
    res.status(200).send(req.user);
})

router.get('/getallhome', barearAuth, acl('read'), async (req, res) => {
    try {
        let recordId = await home.findAll();
        res.status(200).send(recordId);
    } catch (error) {
        throw new Error(error.message)
    }
})

router.get('/getmyhome', barearAuth, acl('read'), async (req, res) => {
    const id = req.user.id
    let getRecords = await home.findAll({ where: { ownerId: id } });
    res.status(201).json(getRecords);
})

router.post('/addhome', barearAuth, acl('create'), async (req, res) => {
    try {
        req.body.ownerId = req.user.id
        let record = await home.create(req.body);
        res.status(201).json(record);
    } catch (error) {
        throw new Error(error.message)
    }
})





router.put('/updatehome/:id', barearAuth, acl('update'), async (req, res) => {
    console.log(req.body);
    let recordObj = req.body
    let id = req.params.id
    let recordId = await home.findOne({ where: { id } })
    let updateRecord = await recordId.update(recordObj);
    res.status(201).json(updateRecord);
})

router.get('/getallusers',  async (req, res) => {
    try {
        let recordId = await user.findAll({ })
        res.status(200).send(recordId);
    } catch (error) {
        throw new Error(error.message)
    }
})



module.exports = router