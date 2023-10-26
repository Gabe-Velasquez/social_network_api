const dayjs=require('dayjs');
const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionID:{
            type:Types.ObjectId,
            default:()=>new Types.ObjectId(),
            },
        reactionBody:{
            type:String,
            required: true,
            maxlength:280,
        },
        username:{
            type: String,
            required:true,
        },
        createdAt:{
            type:Date,
            default: Date.now,
            get:function(date){
                return dayjs(date).format('MM/DD//YYY');
            }
        }
    },
    {
        toJSON:{
            getters:true
        },
    }
);

module.exports=reactionSchema