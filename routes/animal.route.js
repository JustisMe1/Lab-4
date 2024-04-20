const router = require('express').Router();

const {
	homeView,
    animalsView,
    editAnimalView,
} = require('../controllers/animal.controller');

// Home/Index 
router.get('/', homeView);

// All Animals
router.get('/all-animals', animalsView);

// Edit Animals
router.get('/edit-animal', editAnimalView);

module.exports = router;