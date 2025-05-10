import express from "express";
import {getFeedPosts,getUserPosts,likePost} from "../controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);

/* UPDATE */
router.patch("/:id/like", likePost);

export default  router;