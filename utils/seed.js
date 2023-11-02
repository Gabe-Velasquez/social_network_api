const connection = require('../config/connection');
const { User, Thought }=require('../models');

connection.on('error', (err)=>err);

connection.once('open', async()=>{
    let userCheck=await connection.db
    .listCollections({name:"user"})
    .toArray();
    if(userCheck.length){
        await connection.dropCollection('user')
    }
    let thoughtCheck = await connection.db
    .listCollections({name: "thought"}).toArray();
    if (thoughtCheck.length){
        await connection.dropCollection("thought");
    }
    await User.collection.insertMany([
        {
            username:'admin', 
            email:'admin@admin.com', 
            password:'password'
        },
        {
            username:'testUser1',
            email:'testUser1@gmail.com',
            password:'password'
        },
        {
            username:'testUser2',
            email:'testUser2@gmail.com',
            password:'password'
        },
    ]);

    await Thought.collection.insertMany([
        {
            thoughtText: 'This is the first test thought!',
            username: 'admin',
            reactions: [{
                reactionBody: 'First Reaction',
                username: 'testUser1'
            }]
        }
    ])
});