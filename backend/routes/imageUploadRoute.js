import { Router } from "express";
import { imageUpload,getUpdatedImage } from "../controllers/imageUploadCtrl.js";
import {parseForm} from "../middleware/uploadMiddleware.js";
import {authMiddleWare} from "../middleware/authentication.js";
// import {uploadBucket} from "../middleware/uploadBucket.js";
const router = Router();
// router.use(uploadBucket);
router.use(authMiddleWare);
router.use(parseForm);
router.post('/upload', imageUpload)
router.get('/files/:id',getUpdatedImage)
export default router;