var express = require("express"), cors = require("cors"), mysql = require("mysql");
var app = express();
var connection = mysql.createConnection({
	host:'localhost',
	user: 'root',
	password: '',
	database: 'mi-presupuesto',
	port: 3306
});
connection.connect((error) => {
	if(error)
		throw error;
	else
		console.log('Conexion correcta.');
});
app.use(express.json());
app.use(cors());
app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));

app.post("/login", (req, res) => {
	var query = connection.query("SELECT * FROM accounts WHERE email=? AND password=?", [req.body.email, req.body.password], (error, result) => {
		if(error){
			throw error;
		}else{
        	if(result.length > 0)
         		res.send(true);
         	else
         		res.send(false);
		}
	});
});

app.get("/validateEmail", (req, res) => {
	var query = connection.query("SELECT * FROM accounts WHERE email=?", [req.query.email], (error, result) => {
		if(error){
			throw error;
		}else{
        	if(result.length > 0)
         		res.send(true);
         	else
         		res.send(false);
		}
	});
});

app.post("/createAccount", (req, res) => {
	var query = connection.query("INSERT INTO accounts(email, password, name) VALUES(?,?,?)", [req.body.email, req.body.password, req.body.name], (error, result) => {
		if(error && error.code === "ER_DUP_ENTRY")
			res.sendStatus(409);
		else if(error)
			throw error;
		else
			res.end();
	});
});

app.get("/loadAccount", (req, res) => {
	var query = connection.query("SELECT * FROM accounts WHERE email=?", [req.query.email], (error, result) => {
		if(error)
			throw error;
		else
			res.json(result);
	});
});

app.get("/lastMovements", (req, res) => {
	var query = connection.query("SELECT * FROM movements WHERE user_email=? ORDER BY date DESC LIMIT 10", [req.query.user_email], (error, result) => {
		if(error)
			throw error;
		else
			res.json(result);
	});
});

app.get("/allMovements", (req, res) => {
	var query = connection.query("SELECT * FROM movements WHERE user_email=? ORDER BY date DESC", [req.query.user_email], (error, result) => {
		if(error)
			throw error;
		else
			res.json(result);
	});
});

app.get("/categoryList", (req, res) => {
	var query = connection.query("SELECT * FROM movements WHERE user_email=? AND category=? ORDER BY date", [req.query.user_email, req.query.category], (error, result) => {
		if(error)
			throw error;
		else
			res.json(result);
	});
});

app.post("/updateBalance", (req, res) => {
	var query = connection.query("UPDATE accounts SET balance=? WHERE email=?", [req.body.balance, req.body.email], (error, result) => {
		if(error)
			throw error;
		else
			res.end();
	});
});

app.post("/add", (req, res) => {
	var query = connection.query("INSERT INTO movements(id, mount, type, category, concept, date, user_email) VALUES(?,?,?,?,?,?,?)",
		[req.body.id, req.body.mount, req.body.type, req.body.category, req.body.concept, req.body.date, req.body.user_email], (error, result) => {
		if(error)
			throw error;
		else
			res.end();
	});
});

app.get("/edit", (req, res) => {
	var query = connection.query("UPDATE movements SET mount=?, category=?, concept=? WHERE id=?", [req.query.mount, req.query.category, req.query.concept, req.query.id], (error, result) => {
		if(error)
			throw error;
		else
			res.end();
	});
});

app.get("/delete", (req, res) => {
	var query = connection.query("DELETE FROM movements WHERE id=?", [req.query.id], (error, result) => {
		if(error)
			throw error;
		else
			res.end();
	});
});