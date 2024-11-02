import { Router } from "express";
import { leaveRequest,getLeaveByApprover,getCurrentUserLeaves,updateLeaveBalance,remaingLeaves } from "../controllers/leave.js";
const router = Router();

router.post('/leave',leaveRequest)

router.get('/leave/approver/:approverId',getLeaveByApprover)
router.get('/leave/currentUser/:userId',getCurrentUserLeaves)
router.post('/leave-balance',updateLeaveBalance)
router.get('/leave/remaining/:userId',remaingLeaves)
router.get('/leave',leaveRequest)

export default router;