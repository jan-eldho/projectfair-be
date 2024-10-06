// 1) Import express
const express = require('express');

// 2) Use express.Router without 'new'
const router = express.Router();

const userController = require('../Controllers/userController');
const projectController = require('../Controllers/projectController');
const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const multerConfig = require('../Middlewares/multerMiddleware');

// 3) Define routes for different paths

// User routes
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/getuserdetails', userController.getUserdetail);

// Project routes
router.post('/project/addproject', jwtMiddleware, multerConfig.single('projectImage'), projectController.addProject);
router.get('/project/homeproject', projectController.getHomeproject);
router.get('/project/allproject', jwtMiddleware, projectController.getAllproject);
router.get('/project/userproject', jwtMiddleware, projectController.getUserproject);
router.put('/project/editproject/:id',jwtMiddleware, multerConfig.single('projectImage'),projectController.editUserProject)
router.delete('/project/deleteproject/:id',jwtMiddleware, projectController.deleteUserProject)

// 4) Export router
module.exports = router;
