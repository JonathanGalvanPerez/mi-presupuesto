var express = require("express"), cors = require("cors"), mysql = require("mysql"), jwt = require("jsonwebtoken");
var app = express();
const tokenPassword = 'password';

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

app.use("/secure", (req, res, next) => {
	var token = req.headers['authorization'];
	if (!token) {
    	res.status(401).send({ message: 'Token inválido' });
	}
	token = token.replace('Bearer ', '');

  	jwt.verify(token, tokenPassword, function(err, token) {
	    if (err) {
			return res.status(401).send({ message: 'Token inválido' });
	    } else {
	    	console.log("Token validado.");
			req.token = token;
			next();
	    }
  });
});

app.post("/login", (req, res) => {
	var query = connection.query("SELECT * FROM accounts WHERE email=? AND password=?", [req.body.email, req.body.password], (error, result) => {
		if(error){
			throw error;
		}else{
        	if(result.length == 0)
         		res.status(404).end();
         	else {
         		var u = { email: req.body.email };
  				token = jwt.sign(u, tokenPassword, { expiresIn: 60*30 }); // token expires in 30 minutes
         		res.json(token);
         	}
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

app.post("/account", (req, res) => {
	var query = connection.query("INSERT INTO accounts(email, password, name) VALUES(?,?,?)", [req.body.email, req.body.password, req.body.name], (error, result) => {
		if(error && error.code === "ER_DUP_ENTRY")
			res.sendStatus(409);
		else if(error)
			throw error;
		else
			res.end();
	});
});

app.get("/secure/account", (req, res) => {
	var query = connection.query("SELECT * FROM accounts WHERE email=?", [req.query.email], (error, result) => {
		if(error)
			throw error;
		else
			res.json(result);
	});
});

app.get("/secure/allMovements", (req, res) => {
	var query = connection.query("SELECT * FROM movements WHERE user_email=? ORDER BY date DESC", [req.query.user_email], (error, result) => {
		if(error)
			throw error;
		else
			res.json(result);
	});
});

app.put("/secure/balance", (req, res) => {
	var query = connection.query("UPDATE accounts SET balance=? WHERE email=?", [req.body.balance, req.body.email], (error, result) => {
		if(error)
			throw error;
		else
			res.end();
	});
});

app.post("/secure/movement", (req, res) => {
	var query = connection.query("INSERT INTO movements(id, mount, type, category, concept, date, user_email) VALUES(?,?,?,?,?,?,?)",
		[req.body.id, req.body.mount, req.body.type, req.body.category, req.body.concept, req.body.date, req.body.user_email], (error, result) => {
		if(error)
			throw error;
		else
			res.end();
	});
});

app.put("/secure/movement", (req, res) => {
	var query = connection.query("UPDATE movements SET mount=?, category=?, concept=? WHERE id=?", [req.body.mount, req.body.category, req.body.concept, req.body.id], (error, result) => {
		if(error)
			throw error;
		else
			res.end();
	});
});

app.delete("/secure/movement", (req, res) => {
	var query = connection.query("DELETE FROM movements WHERE id=?", [req.query.id], (error, result) => {
		if(error)
			throw error;
		else
			res.end();
	});
});