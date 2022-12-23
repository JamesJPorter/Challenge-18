const {User, Thought, reactionSchema} = require('../models')

module.exports = {

   //create thoughts 
   async createThought(req, res){
    try {
        const newThought = await Thought.create(req.body);
        const updatedUser = await User.findOneAndUpdate(
            {_id: req.body.userId},
            {$push: {thoughts: newThought._id}},
            {new: true}
        )
        if(!updatedUser){
            return res.status(404).json({message: 'No user with this id!'});
        }
        res.json(newThought)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
   }, 

   //get all thoughts
   async getAllThoughts(req, res){
    try {
        const allThoughts = await Thought.find({})
        if(!allThoughts){
            return res.status(404).json({message: 'No thoughts to find'})
        }
        res.json(allThoughts)
    } catch (err){
        console.log(err);
        res.status(500).json(error);
    }
   }, 

   //get thoughts by id
   async getThoughtById(req, res){
    try {
        const thought = await Thought.findOne(
            {_id: req.params.thoughtId}
        )
        if(!thought){
            return res.status(404).json({message: 'No thoughts to find'})
        }
        res.json(thought)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'No thought to find at this id'})
    }
   }, 

   //update a thought by id
   async updateThoughtById(req, res){
    try{
        const updatedThought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId}, 
            {$set: req.body}, 
            {new: true}
        )
        if(!updatedThought){
            return res.status(404).json({message: 'No thought to update'})
        }
        res.json(updatedThought)
    }catch(err){
        res.status(500).json({message: 'No thought to udpate'})
    }
   }, 

   //delete a thought by id
   async deleteThoughtById(req, res){
    try{
        const deleteThought = await Thought.findOneAndDelete(
            {_id: req.params.thoughtId}
        )
        res.json(deleteThought)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'No thought to delete at this id'})
    }
   }, 

   //create a reaction stored in a single thought's reactions array field
   async createReaction(req, res){
    try{
        const newReaction = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId}, 
            {reactions: req.body}, 
            {new: true}
        )
        if(!newReaction){
            return res.status(404).json({message: 'No thought to update'})
        }
        res.json(newReaction)
    }catch(err){
        console.log("TEST")
        res.status(500).json({message: 'Cannot create reaction'})
    }
   }, 
   
   async deleteReaction(req, res){
    try{
        const deletedReaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: req.body } }, { new: true })
        if(!deletedReaction){
            return res.status(404).json({message: 'no reaction to delete'})
        }
        res.json(deletedReaction)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'could not delete reaction'})
    }
   }

}


// User.findOneAndUpdate(
//     { _id: req.params.userId }, 
//     { $set: req.body }, 
//     { runValidators: true, new: true }
// ).then((updatedUser) => !updatedUser ? res.status(404).json({message: 'No user with this id!' }) : res.json(updatedUser))
// .catch((err) => {
//     console.log(err); 
//     return res.status(500).json(err);
// });


// readAllUsers(req, res){
//     User.find({}).then((allUsers) => !allUsers ? res.status(404).json({message: 'No users!' }) : res.json(allUsers))
//     .catch((err) => {
//         console.log(err); 
//         return res.status(500).json(err);})
// },