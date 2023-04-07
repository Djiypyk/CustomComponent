import userController from '../controlles/user-controller'

const Router = require('express').Router

const router = new Router()

router.post('/registartion', userController.registarion)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUser)

export default router
