const Subject = require('../models/subject');
const Category = require('../models/category');


module.exports = {
    create : async (req, res) => {

        user = req.params;
        id = user.id;
        const name = req.body;
        const post = await Subject.create({
            name,
            user:id
        });
        await post.save();

        const categoryById = await Category.findById(id);

        categoryById.posts.push(post);
        await categoryById.save();

        return res.send(categoryById);
    },
    categoryBysubjects : async (req,res)=>{
        const { id } = req.params;
        const categoryBysubjects = await Subjects.findById(id).populate('user');
        res.send(categoryBysubjects);
    }
}
