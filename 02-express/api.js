const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 8080;
const postsUrl = "https://jsonplaceholder.typicode.com/posts";
const commentsUrl = "https://jsonplaceholder.typicode.com/comments";
const newPosts = new Object();

app.use(express.json(postsUrl));
app.use(express.json(commentsUrl));

app.get("/", async (req, res) => {
  const response = await fetch(postsUrl);
  const data = await response.json();
  for (let i = 0; i < data.length; i++) {
    newPosts[data[i].id] = data[i];
  }

  const reply = await fetch(commentsUrl);
  const stuff = await reply.json();
  for (let j = 0; j < stuff.length; j++) {
    newPosts[stuff[j].postId].comments = [];
    newPosts[stuff[j].postId].comments.push(stuff[j]);
  }
  res.send(newPosts);
});

app.get("/:id", (req, res) => {
  res.json(newPosts[req.params.id]);
});

app.get("/:id/comments", (req, res) => {
  res.json(newPosts[req.params.id].comments);
});

app.put("/:id/comments/:commentId", (req, res) => {
  const comments = newPosts[req.params.id].comments;
  const foundIndex = comments.findIndex(
    (comment) => comment.id == req.params.commentId
  );

  let comment = newPosts[req.params.id].comments[foundIndex];

  comment = { ...comment, ...req.body };
  newPosts[req.params.id].comments[foundIndex] = comment;

  res.json(newPosts);
});

app.post("/", (req, res) => {
  const newId = Math.max(...newPosts.id);
  newId += 1;
  newPosts[newId] = { id: newId, ...req.body };
  console.log(newPosts);
  res.json(newPosts);
});

app.delete("/:id", (req, res) => {
  delete newPosts[req.params.id];
  res.json(newPosts);
});

app.delete("/:id/comments/:commentId", (req, res) => {
  const handleDelete = newPosts[req.params.id].comments.filter(
    (comment) => comment.id != req.params.commentId
  );
  newPosts[req.params.id].comments = handleDelete;
  res.send(newPosts);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
