const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

// Schema to create Post model
const thoughtSchema = new Schema(
{
    thoughtText:{
        type: String,
        require: true,
        minLength: 1,
        maxLength: 128,
    },
    
    reactions:[reactionSchema],

    createdAt:       {
        type: Date,
        default: Date.now,
        //get: (date) => timeSince(date),
    },
    username:{
        type: String,
        required: true,
    },
},
    {   timestamps:true,
        toJSON: {
            getters:true,
            virtuals: true,
        },
        id: false,
    },

);

// Create a virtual property `commentCount` that gets the amount of comments per post
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Initialize our thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;