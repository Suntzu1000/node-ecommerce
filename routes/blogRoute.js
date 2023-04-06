const express = require('express')
const { authMiddlewares, isAdmin } = require('../middlewares/authMiddlewares')
const { createBlog, updateBlog } = require('../controller/blogCtrl')
const router = express.Router()

router.post('/', authMiddlewares, isAdmin, createBlog)
router.put('/:id', authMiddlewares, isAdmin, updateBlog)

module.exports = router