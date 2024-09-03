import { Router } from "express";
import {getRoles,createRole,deleteRole} from "../controllers/roleController.js";
const router = Router();

router.get('/roles', getRoles)
router.post('/roles', createRole)
router.delete('/roles/:id', deleteRole)

export default router;