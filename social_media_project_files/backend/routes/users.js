import express from "express";
import {getUser,getUserFriends,addRemoveFriend} from "../controllers/users.js";

const router = express.Router();

router.get("/:id",getUser);
router.get("/:id/friends",getUserFriends);

//update friends list
router.patch("/:id/:friendId", addRemoveFriend);
export default router;