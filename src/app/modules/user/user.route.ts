import express from 'express'
import { UserControllers } from './user.controller'
const router = express.Router()

router.get('/', UserControllers.getAllUserController)
router.post('/', UserControllers.createUser)
router.get('/:userId', UserControllers.getSingleUserByUserIdController)
router.put('/:userId', UserControllers.updateUserController)
router.delete('/:userId', UserControllers.updateUserController)

export const UserRoutes = router
