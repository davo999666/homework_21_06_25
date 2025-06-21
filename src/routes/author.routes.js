import express from "express";
import {findBookAuthors, removeByAuthors} from "../controller/author.controller.js";

const router = express.Router();

router.get("/authors/book/:isbn", findBookAuthors);
router.delete("/author/:author", removeByAuthors);

export default router;