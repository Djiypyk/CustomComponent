import userController from '../controlles/user-controller'
import { body } from 'express-validator'
const Router = require('express').Router

const router = new Router()

router.post(
	'/registration',
	// body('email').isEmail,
	// body('password').isLength({ min: 4, max: 32 }),
	userController.registration,
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUser)

export default router
