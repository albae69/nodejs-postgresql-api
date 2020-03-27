const Pool = require("pg").Pool;
const pool = new Pool({
	user: "me",
	host: "localhost",
	database: "api",
	password: "password",
	port: 5432
});

// get all users
const getUsers = (request, response) => {
	pool.query("select * from users order by id asc", (err, results) => {
		if (err) {
			throw err;
		}
		response.status(200).json(results.rows);
	});
};

// get user by id
const getUserById = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

// post a new user
const createUser = (request, response) => {
	const {name, email} = request.body;

	pool.query(
		"insert into users (name, email) values ($1,$2)",
		[name, email],
		(err, results) => {
			if (err) {
				throw err;
			}
			response.status(201).send(`User added with ID: ${results.insertID}`);
		}
	);
};

// update data in an existing users
const updateUser = (request, response) => {
	const id = parseInt(request.params.id);
	const {name, email} = request.body;

	pool.query(
		"update users set name = $1, email = $2 where id = $3",
		[name, email, id],
		(err, results) => {
			if (err) {
				throw err;
			}
			response.status(200).send(`User modified with ID: ${id}`);
		}
	);
};

// delete an user
const deleteUser = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query("delete from users where id = $1", [id], (err, results) => {
		if (err) {
			throw err;
		}
		response.status(200).send(`User deleted with ID: ${id}`);
	});
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser
};
