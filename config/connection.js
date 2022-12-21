

// mongoose.connect(
//     process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thoughtsDB',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// );



const { connect, connection} = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;