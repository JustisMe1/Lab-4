const router = require('express').Router();

const {
	homeView,
    addAnimalsView,
    addRecord,
    animalsView,
    animalsPostNext,
    animalsPostPrev,
    editAnimalView,
    updateAnimal,
    deleteAnimal
} = require('../controllers/animal.controller');

// Home/Index 
router.get('/', homeView);

// Add animal
router.get('/add-animal', addAnimalsView);
router.post('/add-animal', addRecord);

// All Animals
router.get('/all-animals', animalsView);
router.post('/all-animals-next', animalsPostNext);
router.post('/all-animals-prev', animalsPostPrev);

//All/Edit Buttons
router.post('/delete-animal', deleteAnimal);

//All Animals Buttons
router.post('/edit-animal', editAnimalView);

//Edit Animals Buttons
router.post('/update-animal', updateAnimal);

module.exports = router;