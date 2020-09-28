const mongoose = require('mongoose');

const ConnectDB = async () => {
     try{
          await mongoose.connect(process.env.MONGO_URI, {
               useNewUrlParser: true,
               useFindAndModify: false,
               useCreateIndex: true,
               useUnifiedTopology: true
          })
          console.log('DB Connected');
     }catch(err){
          console.log(err.message);
     }
}
module.exports = ConnectDB