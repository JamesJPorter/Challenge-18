const router = require('express').Router();

const {createThought, getAllThoughts, getThoughtById, deleteThoughtById, updateThoughtById, createReaction, deleteReaction} = require('../../controllers/thoughtController');

//create thought
router.route('/').post(createThought);

//get all thoughts
router.route('/allthoughts').get(getAllThoughts);

// get thought by id
router.route('/:thoughtId').get(getThoughtById);

//delete thoughts by id
router.route('/delete/:thoughtId').delete(deleteThoughtById);

//update thought by id
router.route('/update/:thoughtId').put(updateThoughtById);

// //reaction create and delete
router.route('/:thoughtId/reactions').put(createReaction).delete(deleteReaction)
// router.route('/:thoughtId/reactions').post(createReaction).delete(removeReaction)


module.exports = router;