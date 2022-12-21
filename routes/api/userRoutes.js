const router = require('express').Router();

const { createUser } = require('../../controllers/userController');

router.route('/').post(createUser);

router.route('/:userId').put(updateUser);

// /api/users/:userId/friends/:friendId
router.route('/api/users/:userId/friends/:friendId').post(addFriend);


module.exports = router;