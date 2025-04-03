const express = require('express')

const router = express.Router()

const { createNews, 
    findAllNews, 
    FindSingleNews, 
    editNews, 
    deleteNews } = require("../controller/newsController");
const { createUser, 
        getAllUser, 
        signUserIn,
        verifyOtp,
        resendEmailVerification} = require('../controller/usersController');

router.post('/api/createnews', createNews)
router.get('/api/allnews', findAllNews)
router.get('/api/singlenews/:id', FindSingleNews)
router.put('/api/edit/:id', editNews)
router.delete('/api/delete/:id', deleteNews)


router.post('/api/createuser', createUser)
router.post('/api/sign-in', signUserIn)
router.get('/api/alluser', getAllUser)

router.post('/api/verifyotp', verifyOtp)
router.post('/api/resendotp', resendEmailVerification)


module.exports = router