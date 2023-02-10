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
			if(err)
			{
				console.log(err)
			}
			else
			{
				res.send("Data odeslána")
			}
		}
		
		)

})

app.listen(3001, () => {
	console.log("tvůj server běží na portu 3001 ")
})