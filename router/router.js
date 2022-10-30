const express= require('express');
const auth_controller = require("../controller/auth_controller");
const isAuthenticated = require('../middleware/auth')
const router = express.Router();
 
router.post('/api/v1/register',auth_controller.register)
router.post('/api/v1/login',auth_controller.login)
router.get('/api/v1/logout',[isAuthenticated],auth_controller.logout)
router.get('/api/v1/verify',[isAuthenticated],auth_controller.verify)

router.post('/api/v1/addTask',[isAuthenticated],auth_controller.addTask)
router.post('/api/v1/deleteTask/:index',[isAuthenticated],auth_controller.deleteTask)
router.post('/api/v1/updateTask/:taskId',[isAuthenticated],auth_controller.updateTask)



module.exports=router