const controller = require('../controller/homeController');
const apicontroller = require('../controller/apiController');
const {checkUser,checkPremistion} = require('../middleware/JWTAction');


const express = require('express')
const router = express.Router()



const initRouters = (app) => {
    
    
    router.get('/', controller.getHome)
    router.post('/create-user', controller.postCreateUser)
    router.post('/user/:id', controller.postDeleteUser)
    router.get('/update/:id', controller.getUpdateUser)
    router.post('/update-user', controller.postUpdateUser)

    router.post('/api/register', apicontroller.postRegister)
    router.post('/api/login',apicontroller.postLogin)
    
    router.get('/api/users',checkUser, checkPremistion,apicontroller.getAllUsers)
    router.post('/api/users',checkUser,checkPremistion, apicontroller.postPageUsers)
    router.post('/api/users/create',checkUser,checkPremistion,apicontroller.postCreateUser)
    router.delete('/api/users/delete',checkUser,checkPremistion, apicontroller.deleteUser)
    router.put('/api/users/update',checkUser,checkPremistion, apicontroller.putUpdateUser)

    router.get('/api/get/user',checkUser, apicontroller.getUser)


    router.get('/api/groups',checkUser,checkPremistion,apicontroller.getAllGroups)
    
    router.get('/api/roles',checkUser,checkPremistion,apicontroller.getAllRoles)
    router.post('/api/roles/create',checkUser,checkPremistion,apicontroller.postCreateRole)
    router.delete('/api/roles/delete',checkUser,checkPremistion,apicontroller.deleteRole)
    router.get('/api/roles-group/:id',checkUser,checkPremistion,apicontroller.getRoleWithGroup)

    app.use('/', router);

}

module.exports = initRouters