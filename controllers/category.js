const Category = require('../models/category');

module.exports = {
    create : async (req, res) =>{
        const { name } = req.body;
        const user = await Category.create({
            name
        })

        return res.send(user)
    },

    find : async (req, res) => {
        const user = await Category.find()
        return res.send(user)
    },
    subjectsBycategory : async (req, res) => {
       const { id } = req.params;
       const user = await Category.findById(id).populate('posts');

        res.send(user.posts);
    }
}