import { Router } from "express";
import { leaveRequest } from "../controllers/leave.js";
const router = Router();

router.post('/leave',leaveRequest)

export default router;