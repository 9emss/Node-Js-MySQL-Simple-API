module.exports = (app) => {
  const posts = require("../controllers/post.controller");

  let router = require("express").Router();

  // Create a new Post
  router.post("/", posts.create);

  // Retrieve all post
  router.get("/", posts.findAll);

  // Retrieve published post
  router.get("/published", posts.findAllPublished);

  // Retrieve single post
  router.get("/:id", posts.fineOne);

  // Update post
  router.put("/update/:id", posts.update);

  // Delete post
  router.delete("/delete/:id", posts.delete);

  // Delete all post
  router.delete("/delete/", posts.deleteAll);

  app.use("/api/posts", router);
};
