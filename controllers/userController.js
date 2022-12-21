const {User} = require('../models');
const { findById } = require('../models/User');

module.exports = {
    //Create a user 
    createUser(req, res) {
        User.create(req.body).then((newUser) => res.json(newUser)).catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

//update User
updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId }, 
        { $set: req.body }, 
        { runValidators: true, new: true }
    ).then((updatedUser) => !updatedUser ? res.status(404).json({message: 'No user with this id!' }) : res.json(updatedUser))
    .catch((err) => {
        console.log(err); 
        return res.status(500).json(err);
    });
},

// Add a friend 
addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId}, 
        { $addToSet: {friends: req.params.friendId}}, {new: true}
    ).then((updatedUser)=> !updatedUser ? res.status(404).json({message: 'No user with this id!' }) : res.json(updatedUser))
    .catch((err) => {
        console.log(err); 
        return res.status(500).json(err);
    });
}, 

//read all users
readAllUsers(req, res){
    User.find({}).then((allUsers) => !allUsers ? res.status(404).json({message: 'No users!' }) : res.json(allUsers))
    .catch((err) => {
        console.log(err); 
        return res.status(500).json(err);})
},

//find one user by _id
findById(req, res){
    User.findOne(
        {_id: req.params.userId}
    ).then((singleUser) => !singleUser ? res.status(404).json({message: 'No user with this Id!' }) : res.json(singleUser))
    .catch((err) => {
        console.log(err); 
        return res.status(500).json(err);})
}, 

deleteUser(req, res){
    User.deleteOne(
        {_id: req.params.userId}
    ).then((singleUser) => !singleUser ? res.status(404).json({message: 'No user with this Id!' }) : res.json(singleUser))
    .catch((err) => {
        console.log(err); 
        return res.status(500).json(err);})
}
}