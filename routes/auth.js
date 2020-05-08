const router = require("express").Router();
const { signUp, login } = require("../controllers/auth");
const { signUpt, logint} = require("../controllers/authtutor");
const Category = require('../controllers/category');
const Subjects = require('../controllers/subject');

router.get("/",  (req, res) => {
    res.send("This is Kelvins Online Tutor app");
});

//student signup
router.post('/signup', signUp);

//student login
router.post('/login', login);
//student find all subjects


//find category by students
router.get('/signup/allcategory', Category.find);

//find category by tutor
router.get('/signup/login/allcategory', Category.find);

//tutor signup
router.post('/signup/tutor', signUpt);
//tutor login
router.post('/signup/login', logint);

//tutor create category
router.post('/signup/login/createcategory', Category.create);

//tutor creates subjects by category id
router.post('/signup/login/createsubject/:id', Subjects.create);



module.exports = router;