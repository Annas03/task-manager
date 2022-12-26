const mongoose = require('mongoose');

const connectionString = "mongodb+srv://annas:Compaqla2306x@testing.9d946js.mongodb.net/?retryWrites=true&w=majority"

const ConnectDB = (url) => {

    mongoose.set('strictQuery', true);
    return(
    mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("Connected"))
    .catch((error)=>console.log(error)))
}

module.exports = {ConnectDB, connectionString}
