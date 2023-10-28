const dayjs = require('dayjs');
const { Schema, model }= require('mongoose');
const reactionSchema=require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxlength:280
        },
        createdAt:{
            type: Date,
            default: ()=>Date.now(),
            get: function(date){
                return dayjs(date).format('MM/DD/YYYY')
            }    
        },
        username: {
            type:String,
            required:true,
        },
        reactions:[reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function(){
        if (this.reactions){
            return this.reactions.length
        }else{
            return []
        }
    });

    const Thought = model('thought', thoughtSchema)
    module.exports = Thought;