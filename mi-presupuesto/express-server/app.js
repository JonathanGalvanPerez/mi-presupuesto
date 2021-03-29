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
	if(error){
		throw error;
	}else{
		console.log('Conexion correcta.');
	}
});
app.use(express.json());
app.use(cors());
app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));

app.post("/login", (req, res, next) => {
	var query = connection.query("SELECT * FROM accounts WHERE email=? AND password=?", [req.body.email, req.body.password], (error, result) => {
		if(error){
			throw error;
		}else{
        	if(result.length > 0){
         		res.send(true);
         	}else{
         		res.send(false);
         	}
		}
	});
});

app.get("/validateEmail", (req, res, next) => {
	var query = connection.query("SELECT * FROM accounts WHERE email=?", [req.query.email], (error, result) => {
		if(error){
			throw error;
		}else{
        	if(result.length > 0){
         		res.send(true);
         	}else{
         		res.send(false);
         	}
		}
	});
});

app.get("/loadAccount", (req, res, next) => {
	var query = connection.query("SELECT * FROM accounts WHERE email=?", [req.query.email], (error, result) => {
		if(error){
			throw error;
		}else{
			res.json(result);
		}
	});
});

app.get("/lastMovements", (req, res, next) => {
	var query = connection.query("SELECT * FROM movements WHERE user_email=? ORDER BY date DESC LIMIT 10", [req.query.user_email], (error, result) => {
		if(error){
			throw error;
		}else{
			res.json(result);
		}
	});
});

app.get("/allMovements", (req, res, next) => {
	var query = connection.query("SELECT * FROM movements WHERE user_email=? ORDER BY date DESC", [req.query.user_email], (error, result) => {
		if(error) {
			throw error;
		}else{
			res.json(result);
		}
	});
});

app.post("/updateBalance", (req, res, next) => {
	console.log("Request recibida! contenido:");
	console.log(req.body);
	var query = connection.query("UPDATE accounts SET balance=? WHERE email=?", [req.body.balance, req.body.email], (error, result) => {
		if(error) {
			throw error;
		}else{
			res.end();
		}
	});
});

app.post("/add", (req, res, next) => {
	var query = connection.query("INSERT INTO movements(id, mount, type, concept, date, user_email) VALUES(?,?,?,?,?,?)",
		[req.body.id, req.body.mount, req.body.type, req.body.concept, req.body.date, req.body.user_email], (error, result) => {
		if(error) {
			throw error;
		}else{
			res.end();
		}
	});
});

app.get("/edit", (req, res, next) => {
	var query = connection.query("UPDATE movements SET mount=?, concept=? WHERE id=?", [req.query.mount, req.query.concept, req.query.id], (error, result) => {
		if(error) {
			throw error;
		}else{
			res.end();
		}
	});
});

app.get("/delete", (req, res, next) => {
	var query = connection.query("DELETE FROM movements WHERE id=?", [req.query.id], (error, result) => {
		if(error) {
			throw error;
		}else{
			res.end();
		}
	});
});