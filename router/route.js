const express = require('express')

const router = express.Router()

const { createNews, 
    findAllNews, 
    FindSingleNews, 
    editNews, 
    deleteNews } = require("../controller/newsController");


router.post('/api/createnews', createNews)
router.get('/api/allnews', findAllNews)
router.get('/api/singlenews/:id', FindSingleNews)
router.put('/api/edit/:id', editNews)
router.delete('/api/delete/:id', deleteNews)

module.exports = router