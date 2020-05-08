const mongoose  = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
    },
    subject : [
        {type: mongoose.Schema.Types.ObjectId,ref:''}
    ]
},{
    timestamps:true
})
module.exports = mongoose.model('Category',CategorySchema);