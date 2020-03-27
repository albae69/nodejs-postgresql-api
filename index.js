// node_modules
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// database
const db = require("./queries");

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

// routes
// home
app.get("/", (request, response) => {
	response.json({info: "Node.js, Express, and Postgres API"});
});
// get all users
app.get("/users", db.getUsers);

// get users by id
app.get("/users/:id", db.getUserById);

// create user
app.post("/users", db.createUser);

// update user
app.put("/users/:id", db.updateUser);

// delete user
app.delete("/users/:id", db.deleteUser);

// routes

app.listen(port, () => {
	console.log(`App running on ${port}`);
});
