const express = require('express');
const router = express.Router();

const Contact = require('../models/Contact');
const Exhibitor = require('../models/Exhibitor');

/* GET contacts listing */
router.get('/list', async (req, res) => {

    try {
        const contacts = await Contact.find();
        return res.status(200).json(contacts);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET contacts by exhibitor id */
router.get('/exhibitor/:id', async (req, res) => {

    //todo: a tester

    try {
        const contacts = await Exhibitor.find({_id: req.params.id}, {exhibitorContact: 1})
            .populate('exhibitorContact');
        return res.status(200).json(contacts);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET contact by id */
router.get('/:id', async (req, res) => {

    try {
        const contact = await Contact.findById(req.params.id);
        return res.status(200).json(contact);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new contact */
router.post('/', async (req, res) => {

    const contact = new Contact({
        contactLastname: req.body.contactLastname,
        contactFirstname: req.body.contactFirstname,
        contactPhone: req.body.contactPhone,
        contactMobilePhone: req.body.contactMobilePhone,
        contactMail: req.body.contactMail,
        contactFunction: req.body.contactFunction,
        contactMain: req.body.contactMain
    });

    try {
        const savedContact = await contact.save();
        return res.status(200).json(savedContact);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH contact by id */
router.patch('/:id', async (req, res) => {

    try{
        await Contact.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedBilling = await Contact.findById(req.params.id);
        return res.status(200).json(updatedBilling);
    } catch (err) {
        return res.status(500).json({message: err.message ? err.message : err});
    }

});

/* DELETE contact by id */
router.delete('/:id', async (req, res) => {

    try{
        let contact = await Contact.findById(req.params.id);

        if(!contact){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        await Contact.deleteOne(contact);
        return res.status(200).json(contact);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

module.exports = router;