import { Router } from "express";
import { leaveRequest } from "../controllers/leave.js";
const router = Router();

router.post('/leave/:userId',leaveRequest)

export default router;