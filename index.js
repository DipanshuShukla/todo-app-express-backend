require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const todosRouter = require("./app/routes/todos.routes");
const userRouter = require("./app/routes/user.routes");

const port = process.env.PORT || 3000;
const db_url = process.env.DB_URL;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json("Hello World.");
});

app.use("/todos", todosRouter);
app.use("/user", userRouter);

console.log("\nConnecting to MongoDB server... 🚀");

mongoose
    .connect(db_url)
    .then(() => {
        console.log("Connection Successful! 😎");

        app.listen(port, () => {
            console.log(`\nApp is listening on http://localhost:${port} 🌍`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
