// node_modules
const express = require("express");
const app = express();
const port = 3000;

// database
const db = require("./queries");

app.use(express.json());

// routes
// home
app.get("/", (request, response) => {
	response.json({ info: "Node.js, Express, and Postgres API" });
});

app.route('users/:id')
	// get users by id
	.get(db.getUserById)
	// update user
	.put(db.updateUser)
	// delete user
	.delete(db.deleteUser);

app.route('/users')
	// get all users
	.get(db.getUsers)
	// create user
	.post(db.createUser);

// routes

app.listen(port, () => {
	console.log(`App running on ${port}`);
});
