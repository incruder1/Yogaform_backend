import express from "express";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddlewares.js";
import {list,addProperty,updateProperty,deleteProperty} from "../controllers/property.js"

//router object
const router = express.Router();

router.get("/list-property",list);

router.post("/add",addProperty);

router.put("/:id",updateProperty)
// requireSignIn,isAdmin
router.delete("/:id",deleteProperty);
export default router;