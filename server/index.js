const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
	user: 'root',
	host: 'localhost',
	password: '',
	database: 'employeeSystem',

});

app.post('/create', (reg, res) => {
	const name = reg.body.name
	const age = reg.body.age
	const gender = reg.body.gender
	const country = reg.body.country
	const position = reg.body.position
	const wage = reg.body.wage

	db.query(
		'INSERT INTO employees (name, age, gender, country, position, wage) VALUES (?,?,?,?,?,?)',
		[name, age, gender, country, position, wage],
		(err, result) => {
			if (err) {
				console.log(err)
			}
			else {
				res.send("Data odeslána")
			}
		}

	)

})

app.get('/employee', (reg, res) => {
	db.query('SELECT * FROM employees',
		(err, result) => {
			if (err) {
				console.log(err)
			}
			else {
				res.send(result)
			}
		}
	)
})

app.put('/update', (reg, res) => {
	const id = reg.body.id
	const wage = reg.body.wage
	db.query('UPDATE employees SET wage = ? WHERE id = ?', [wage, id], (err, result) => {
		if (err) {
			console.log(err)
		}
		else {
			res.send(result)
		}
	})
})

app.delete("/delete/:id", (req, res) => {
	const id = req.params.id;
	db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
	  if (err) {
		console.log(err);
	  } else {
		res.send(result);
	  }
	});
  });

app.listen(3001, () => {
	console.log("tvůj server běží na portu 3001 ")
})