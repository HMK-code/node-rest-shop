const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String} ,
    price: { type: Number}
});

 module.exports = mongoose.model('Product', productSchema);

/*  module.exports = async (arg1, arg2, arg3) => {

    await mongo().then(async mongoose => {
        try{
            console.log('Connected to mongo!!');
            await command.execute(client, message, args);
        }
        finally{
            mongoose.connection.close();
        }
    });
}; */