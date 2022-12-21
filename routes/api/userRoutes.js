const router = require('express').Router();

const { createUser, updateUser, addFriend, readAllUsers, findById, deleteUser } = require('../../controllers/userController');

//create single user
router.route('/').post(createUser);

//update single user
router.route('/:userId').put(updateUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend);

//read all users
router.route('/readAll').get(readAllUsers);

//read a single user
router.route('/:userId').get(findById);

//delete user by Id
router.route('/delete/:userId').delete(deleteUser);


module.exports = router;