const express = require('express');
const router = express.Router();

const csv = require('csv-parser')
const fs = require('fs')

const Editor = require('../models/Editor');
const Exhibitor = require('../models/Exhibitor');
const Game = require('../models/Game');
const GameType = require('../models/GameType');
const Contact = require('../models/Contact');

const path = "/Users/alexiaognard/Desktop/Projets/awi-api"
/* GET editeurs listing from csv file */
router.get('/editors', async (req, res) => {
    var results = [];
    const editors = [];
    fs.createReadStream(`${path}/data/editeurs.csv`)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        
        results.forEach(r => {
            const tab = r["idEditeur;libelleEditeur;editeurOnly;exposantOnly"].split(';');
            const name = tab[1];
            if (tab[2] === "1"){
                editors.push({editorName: name})
            }
        })
        /*
        editors.forEach(e => {
            const newEditor = new Editor(e).save();
        })
        */
       
        
        return res.json(editors);
    });

});

/* GET exhibitors listing from csv file */
router.get('/exhibitors', async (req, res) => {
    var results = [];
    const exhibitors = [];
    fs.createReadStream(`${path}/data/editeurs.csv`)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        
        results.forEach(r => {
            const tab = r["idEditeur;libelleEditeur;editeurOnly;exposantOnly"].split(';');
            const name = tab[1];
            if (tab[2] !== "1"){
                exhibitors.push({exhibitorName: name})
            }
            
        })
        /*
        exhibitors.forEach(e => {
                Editor.findOne({editorName: e.exhibitorName})
                .then(ed => {
                    const exhib = new Exhibitor({exhibitorName: e.exhibitorName, exhibitorEditor: ed._id})
                    exhib.save();
                },
                err => console.log("err =" + err))
        })
        */
        
        return res.json(exhibitors);
    });

});

/* GET contacts listing from csv file */
router.get('/contacts', async (req, res) => {
    var results = [];
    const contacts = [];
    fs.createReadStream(`${path}/data/contact.csv`)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
       
        
        results.forEach(r => {
            const tab = r['idContact;estPrincipalContact;nomContact;prenomContact;mailContact;telephoneContact;telBureau;fonction;rueContact;villeContact;cpContact;idEditeur;idEditeur;libelleEditeur'].split(';');

            var contact = { 
                contactMain : (tab[1] === "0" ? false : true), 
                contactLastname : tab[2], 
                contactFirstname : tab[3], 
                contactFunction : tab[7], 
            }
            if (tab[4].length > 0){
                contact = {...contact, contactMail: tab[4]}
            }
            if (tab[5].length > 0){
                contact = {...contact, contactMobilePhone: tab[5]}
            }
            if (tab[6].length > 0){
                contact = {...contact, contactPhone: tab[6]}
            }
            
            const newContact = new Contact(contact)
            newContact.save();
            console.log(newContact._id)
            contact = { ...contact, expo: tab[tab.length-1]}
            contacts.push(contact)
            
        })
        
        
        contacts.forEach(c => {
            Exhibitor.findOne({exhibitorName: c.expo})
            .then(exhib => {
                if (exhib && exhib._id){
                    const exhibUpadted = {...exhib, exhibitorContact: exhib.exhibitorContact.push((contacts.find(cont => cont.expo === exhib.exhibitorName) || []).map(c => c._id).flat())}
                    console.log(exhibUpadted);
                }
            },
            err => console.log("err =" + err))
        })
        
        return res.json(contacts);
    });

});

module.exports = router;