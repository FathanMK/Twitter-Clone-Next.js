import { Router } from "express";

import User from "./User.routes";
import Tweet from "./Tweet.routes";

const v1 = "/api/v1";
const router = Router();

router.use(v1, User);
router.use(v1, Tweet);

export default router;
