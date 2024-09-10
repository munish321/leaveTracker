import { Router } from "express";
import signup from "../controllers/signup.js";
import {login} from "../controllers/login.js";
import {auth,loggedInUser,updateUser} from "../controllers/auth.js";
import {authMiddleWare} from "../middleware/authentication.js";
const router = Router()
// auth routes
router.post('/signup', signup)
router.post('/login', login)
router.post('/auth', auth)
router.get('/user',authMiddleWare, loggedInUser)
router.put('/user',authMiddleWare, updateUser)

export default router;