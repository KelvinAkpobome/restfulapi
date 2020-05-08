const mongoose  = require('mongoose');
const SubjectsSchema = new mongoose.Schema({
    name : {
        type: String,
       // required: '{PATH} is required!'
      },
    Category :{
    type:mongoose.Schema.Types.ObjectId, ref:'Category'
}

},{
    timestamps:true
})

module.exports = mongoose.model('Subject',SubjectsSchema);

