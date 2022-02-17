const express = require('express')
const app = express()
const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'abdu1882',
  database: 'basics',
})
app.get('/', async (req, res) => {
  try {
    const client = await pool.connect()
    const { rows } = await client.query('SELECT * FROM  restaurants')
    console.log(rows)
    client.release()
    res.send('ok')
  } catch (err) {
    console.log(err)
  }
})

app.listen(9000, console.log(9000))
