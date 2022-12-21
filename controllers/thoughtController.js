const {User, Thought} = require('../models')

module.exports = {
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
   }

}