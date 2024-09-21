import { Router } from "express";
import { imageUpload,getUpdatedImage } from "../controllers/imageUploadCtrl.js";
import {parseForm} from "../middleware/uploadMiddleware.js";
import {authMiddleWare} from "../middleware/authentication.js";
const router = Router();
router.post('/upload',authMiddleWare,parseForm, imageUpload)
router.get('/image/:id',getUpdatedImage)
export default router;