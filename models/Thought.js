const { Schema, model} = require('mongoose');
const formatDate = requrie('../utils/formatDate');
const reactionSchema = require('./Reaction')

const userSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true, 
            minlength: 1,
            maxlength: 280
        }, 
        createdAt: {
            type: Date, 
            default: Date.now, 
            get: (timestamp) => formatDate(timestamp), 
        }, 
        username: {
            type: String, 
            required: true,
        },
        reactions: [reactionSchema],
    }, 
    {
        toJSON: {
            getters: true,
        },
    }
)

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})


const Thought = model('thought', thoughtSchema);

module.exports = Thought;