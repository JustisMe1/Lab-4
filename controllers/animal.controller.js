const { response } = require("express");
const bcrypt = require('bcrypt');
const {model} = require('mongoose');
const { Animal } = require("../models/Animal");

/*
Displays the home page
*/
exports.homeView = (req, res) => {
    res.render('index', {
        pageTitle: 'Lab 4 - HomePage'
    })
}

/*
Displays the page where a new animal can be added from
*/
exports.addAnimalsView = (req, res) => {
    Animal.findOne().sort({ID:-1}).limit(1).then(function(animal){
        let newID = animal.ID + 1;

        res.render('add-animal', {
            pageTitle: 'Lab 4 - Add Animal',
            ID:newID
        })
    })
}

/*
Adds the desired values to a new record in the database
*/
exports.addRecord = (req, res) => {
    let newRec = {
        ID: req.body.ID,
        Zoo: req.body.zoo,
        ScientificName: req.body.sctName,
        CommonName: req.body.comName,
        Gender: req.body.gender,
        DateOfBirth: req.body.dob.slice(0, 10),
        Age: req.body.age,
        CanTransport: req.body.canTransport
    };

    Animal.create(newRec).then(success => {
        if (success)
            res.render('rec-added', {
                message:"Record Added Successfully."
            })
        else
            res.render('rec-added', {
                message:"Record could not be added."
            })
    });
}

/*
Displays the page containing a list of all animals, view 10 at a time
*/
exports.animalsView = (req, res) => {
    let id = 1;
    let ids = [id, id+1, id+2, id+3, id+4, id+5, id+6, id+7, id+8, id+9];

    //Animal Rec 1
    Animal.find({"ID": {$in: ids}}).then(function(animalList){
        console.log(animalList);

        res.render('all-animals', {
            pageTitle: 'Lab 4 - All Animals',
            animals: animalList
        })
    })
}

/*
Displays the page containing a list of all animals, view 10 at a time
This allows for a user to advance to the next page in the list
*/
exports.animalsPostNext = (req, res) => {
    let id = JSON.parse(req.body.move).ID+10;
    let ids = [id, id+1, id+2, id+3, id+4, id+5, id+6, id+7, id+8, id+9];

    //Animal Rec 1
    Animal.find({"ID": {$in: ids}}).then(function(animalList){
        res.render('all-animals', {
            pageTitle: 'Lab 4 - All Animals',
            animals: animalList
        })
    })
}

/*
Displays the page containing a list of all animals, view 10 at a time
This allows for a user to advance to the next page in the list
*/
exports.animalsPostPrev = (req, res) => {
    let id = JSON.parse(req.body.move).ID - 10;
    if(id < 1)
        id = 1;

    let ids = [id, id+1, id+2, id+3, id+4, id+5, id+6, id+7, id+8, id+9];

    //Animal Rec 1
    Animal.find({"ID": {$in: ids}}).then(function(animalList){
        console.log(animalList);

        res.render('all-animals', {
            pageTitle: 'Lab 4 - All Animals',
            animals: animalList
        })
    })
}

/*
Displays the page for updating a single animal record
*/
exports.editAnimalView = (req, res) => {
    Animal.findOne({"ID": req.body.ID}).then(function(animal){
        if(animal)
        {
            res.render('edit-animal', {
                pageTitle: 'Lab 4 - Edit Animal',
                id: animal.ID,
                zoo: animal.Zoo,
                sctName: animal.ScientificName,
                comName: animal.CommonName,
                gender: animal.Gender,
                dob: animal.DateOfBirth.toISOString().slice(0, 10),
                age: animal.Age,
                canTransport: animal.CanTransport
            })
        }
    })
}

/*
Updates a record according to the Data input to the form
Takes you to the home page after 30 seconds
*/
exports.updateAnimal = (req, res, next) => {
    console.log(req.body);
    let newRec = {
        Zoo: req.body.zoo,
        ScientificName: req.body.sctName,
        CommonName: req.body.comName,
        Gender: req.body.gender,
        DateOfBirth: req.body.dob.slice(0, 10),
        Age: req.body.age,
        CanTransport: req.body.canTransport
    };

    Animal.findOneAndUpdate({"ID":req.body.id}, { $set: newRec }, {new:true}).then(doc => {
        if(doc)
            res.render('rec-updated', {
                message:"Record Updated Successfully"
            })
        else
            res.render('rec-updated', {
                message:"Record could not be updated."
            })
    })
}

/*
Deletes the given record
Takes you to the home page after 30 seconds
*/
exports.deleteAnimal = (req, res, next) => {
    Animal.findOneAndDelete({"ID":req.body.id}).then(deleted => {
        if(deleted)
            res.render('rec-deleted', {
                message:"Record Deleted Successfully"
            })
        else
            res.render('rec-deleted', {
                message:"Record could not be deleted."
            })
    });
}

module.exports = exports