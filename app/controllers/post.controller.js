const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create Post
  const post = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // save post
  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while created post",
      });
    });
};

// Retrieve all
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Post.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find post",
      });
    });
};

// Find a single
exports.fineOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving post with id=${id}`,
      });
    });
};

// Update a post with ID
exports.update = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id, id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Post was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update Post with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update Post with id=${id}.`,
      });
    });
};

// Delete a post
exports.delete = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id, id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Post was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error delete Post with id=${id}.`,
      });
    });
};

// Delete all a post
exports.deleteAll = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false,
  })
    .then((result) => {
      res.send({
        message: `${result} Post was deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error delete all Post.`,
      });
    });
};

// Find all Published
exports.findAllPublished = (req, res) => {
  Post.findAll({
    where: {
      published: true,
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occured retrieving posts.`,
      });
    });
};
