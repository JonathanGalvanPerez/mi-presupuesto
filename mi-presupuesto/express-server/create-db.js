var mysql = require('mysql'), fs = require('fs');

query = "";
fs.readFile('mi-presupuesto.sql', 'utf-8', (err, data) => {
	if (err) {
		console.error(err);
    return;
  	} else {
    console.log("Archivo SQL encontrado");

    var con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      multipleStatements: true,
      port: 3306
    });

    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      con.query(data, function (err, result) {
        if (err) throw err;
        console.log("Database created");
        process.exit();
      });
    });
  }
});