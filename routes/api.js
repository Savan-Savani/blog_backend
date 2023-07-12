const express = require("express");
const router = express.Router();

const Author = require("../models/Author");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

router.post("/authors", async (req, res) => {
  try {
    const { full_name, email } = req.body;

    const existingAuthor = await Author.findOne({
      $or: [{ full_name }, { email }],
    });

    if (existingAuthor) {
      return res.status(409).json({
        error: "Author with the same username or email already exists",
      });
    }

    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ error: "Failed to create the author" });
  }
});

router.post("/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to create the blog" });
  }
});

router.post("/comments", async (req, res) => {
  try {
    const { user_info, blogId } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const comment = await Comment.create({ user_info, blog: blogId });

    blog.comments.push(comment);
    await blog.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to create the comment" });
  }
});

router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "full_name email")
      .populate("comments");
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve blogs" });
  }
});

router.put("/blogs/:id/co-authors", async (req, res) => {
  try {
    const { id } = req.params;
    const { co_authors } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const coAuthors = await Author.find({ _id: { $in: co_authors } });

    blog.co_authors.push(...coAuthors.map((coAuthor) => coAuthor._id));
    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to add co-authors" });
  }
});

router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "full_name email"
    );

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.views++;
    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve the blog" });
  }
});

router.post("/blogs/:id/like", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (blog.likedBy.includes(userId)) {
      return res.status(409).json({ error: "User has already liked the blog" });
    }

    blog.likes++;
    blog.likedBy.push(userId);
    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to increment likes count" });
  }
});

module.exports = router;
