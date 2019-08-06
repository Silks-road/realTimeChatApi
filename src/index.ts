import express from "express";

const app = express();
const port = 8080 || process.env.PORT;

app.get("/", (request, response) => {
  response.send("Well hello there!");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
});
