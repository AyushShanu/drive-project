const express = require('express')
const router = express.Router()
const fileModel = require('../models/file.model')
const authMiddleware = require('../middlewares/auth')

const upload = require('../config/multer')

router.get('/home', authMiddleware, async (req, res) => {

    const userFile = await fileModel.find({
        user: req.user.userId
    })
    console.log(userFile)

    
    res.render('home',{
        files:userFile,
    })
})


    router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {

        const newFile = await fileModel.create({
            path: req.file.path,
            originalname: req.file.originalname,
            user:req.user.userId
        })
        res.json({newFile})

});


router.get('/download/:path',authMiddleware, async (req, res) => {
    const userloggedInID = req.user.userId
    const path = req.params.path

    const file = await fileModel.findOne({
        user: userloggedInID,
        path: path
    })
    if (!file) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    


})
module.exports = router