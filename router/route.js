const express = require('express')

const router = express.Router()

const { createNews, 
    findAllNews, 
    FindSingleNews, 
    editNews, 
    deleteNews } = require("../controller/newsController");
const { createUser, 
        getAllUser } = require('../controller/usersController');


router.post('/api/createnews', createNews)
router.get('/api/allnews', findAllNews)
router.get('/api/singlenews/:id', FindSingleNews)
router.put('/api/edit/:id', editNews)
router.delete('/api/delete/:id', deleteNews)


router.post('/api/createuser', createUser)
router.get('/api/alluser', getAllUser)


module.exports = router