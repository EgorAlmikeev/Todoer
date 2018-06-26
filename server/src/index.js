let mysql = require('mysql');
const app = require('express')();
const { get } = require('axios');

const PORT = 1234;
const RESET_TASKS_URL = 'https://kodaktor.ru/j/db.json';


//create mysql connection
mysql = mysql.createConnection({
	host: 	  'localhost',
	user: 	  'todo',
	password: 'password'
});

mysql.connect();
mysql.query("USE todo");


//api-methods
async function add_task(req, res) {
	mysql.query("INSERT INTO tasks(text) VALUES('" + req.params.title + "')", ()=>{ 
		res.sendStatus(200);
	});
}

async function reset_tasks(req, res) {
	mysql.query("DELETE FROM tasks WHERE text LIKE '%%'", async (error, rows, fields)=>{
		if (error) throw error;
		let { data: { todo: items } } = await get(RESET_TASKS_URL);
		
		for (let i = 0; i < items.length; ++i) {
			mysql.query("INSERT INTO tasks(text) VALUES('" + items[i].title + "')");
		}

		res.sendStatus(200);
	});
}

async function get_tasks(req, res) {
	let arr = [];
		mysql.query("SELECT * FROM tasks", (error, rows, fields)=>{
			if (error) throw error;
			
			for (let i = 0; i < rows.length; ++i)
				arr.push(rows[i].text);

			res.header("Access-Control-Allow-Origin", "*");
			res.header("Content-Type", "application/json");
			res.json({ "result": arr });
		});
}

app
	.get('/add_task/:title', async (req, res)=>{ await add_task(req, res); })
	.get('/get_tasks', async (req, res)=>{ await get_tasks(req, res); })
	.get('/reset', async (req, res)=>{ await reset_tasks(req, res) })
	.listen(PORT, ()=>console.log("My pid is very big : " + process.pid));




















