import { Router } from "express";
import { getAllUsers, activateUser, deactivateUser } from "../controllers/userController.js";
const router = Router();

router.get('/users', getAllUsers)
router.put('/activate/:id', activateUser)
router.put('/deactivate/:id', deactivateUser)

export default router;