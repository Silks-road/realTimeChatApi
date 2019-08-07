import express from "express";

const app = express();
const port = 8080 || process.env.PORT;

app.get("/", (request, response) => {
  response.send("Well hello there!");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
});


// 
// // These should be at the top of the file
// import Bundler from "parcel-bundler";
// import path from "path";
//
// // replace the call to app.get with:
// const bundler = new Bundler(path.join(__dirname, "../src/client/index.html"));
// app.use(bundler.middleware());
