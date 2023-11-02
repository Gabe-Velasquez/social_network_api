const { connection, connect } = require('mongoose');
const stringConnection = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social_network_db'

connect(stringConnection);

module.exports=connection;