const { response } = require("express");
const bcrypt = require('bcrypt');
const {model} = require('mongoose');
const { Animal } = require("../models/Animal");

/**/
exports.homeView = (req, res) => {
    res.render('index', {
        pageTitle: 'Lab 4 - HomePage',
    })
}

/**/
exports.animalsView = (req, res) => {
    res.render('all-animals', {
        pageTitle: 'Lab 4 - All Animals',
    })
}

/**/
exports.editAnimalView = (req, res) => {
    res.render('edit-animal', {
        pageTitle: 'Lab 4 - Edit Animal',
    })
}