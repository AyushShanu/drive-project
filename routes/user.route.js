const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const user = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register',
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 }),

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "invalid data"
            })
        }
        const { email, username, password } = req.body;
        const hashpassword = await bcrypt.hash(password,10)
        const newUser = await user.create({
             email, 
             username,
             password:hashpassword
             });
        res.json({newUser}); 
    });

    router.get('/login', (req, res) => {
        res.render('login');
    });

    router.post('/login',
        body('username').trim().isLength({ min: 5 }),
        body('password').trim().isLength({min:5}),
        async(req,res) => {


            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    error:errors.array(),
                    message:"Inavalid Message"
                })
            }

            const {username,password} = req.body;

            const sameUser = await user.findOne({
                username:username,
            })

            if(!sameUser){
                return res.status(400).json({
                    message:"username or password is incorrect"
                })
            }

            const isMatch = await bcrypt.compare(password,sameUser.password)

            if(!isMatch){
                return res.status(400).json({
                    message:"username or password is incoorect"
                })
            }

                const token = jwt.sign({
                    userId:sameUser._id,
                    email:sameUser.email,
                    username:sameUser.username
                },
                process.env.JWT_SECRET
            )

            res.cookie('token',token)
            res.send("logged in")
        }


    )

module.exports = router;