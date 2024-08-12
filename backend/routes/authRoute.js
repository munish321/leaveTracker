import { Router } from "express";
import signup from "../controllers/signup.js";
import {login} from "../controllers/login.js";
import {auth} from "../controllers/auth.js";
const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/auth', auth)
export default router;