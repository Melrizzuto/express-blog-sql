import express from "express";

// Other imports
// middleware
import errorsHandler from "./middlewares/errorsHandler.js";
import notFound from "./middlewares/notFound.js";
import corsPolicy from "./middlewares/corsPolicy.js";
// routing
import postsRouter from "./routers/postsRouter.js";
import tagsRouter from "./routers/tagsRouter.js"

// create a server instance
const app = express();

// set constant to port
const port = process.env.PORT || 3000;

// gestione asset statici
app.use(express.static("public"));

// abilita cors
app.use(corsPolicy);

// registro il body-parser per "application/json"
app.use(express.json());

// rotta per home page (http://localhost:3000)
app.get("/", (req, res) => {
    res.send("Home Page");
});

// other routes
app.use("/posts", postsRouter);
app.use("/tags", tagsRouter);

// gestione errori applicazione
app.use(errorsHandler);

// gestione not found url
app.use(notFound);

// server must listen on your host and your port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});