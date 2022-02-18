const express = require('express')
const app = express()
const { Pool } = require('pg')
app.use(express.json())

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
    const { rows } = await client.query(
      'SELECT * FROM  courses ORDER BY course_id'
    )
    // console.log(rows)
    client.release()
    res.send(rows)
  } catch (err) {
    console.log(err)
  }
})

app.post('/addCourse', async (req, res) => {
  try {
    const { name, price } = req.body
    const client = await pool.connect()
    const { rows } = await client.query(
      'INSERT INTO courses (course_name, course_price) VALUES($1, $2) RETURNING *',
      [name, price]
    )
    // ! agar ko`p ma`lumot kiritmoqchi bo`lsak.
    console.log(rows)
    client.release()
    res.send('qo`shildi🎉')
  } catch (err) {
    console.log(err)
  }
})

app.post('/addGroup', async (req, res) => {
  try {
    const { group_name, group_teacher, group_of } = req.body
    const client = await pool.connect()
    const { rows } = await client.query(
      'INSERT INTO groups (group_name, group_teacher, group_of ) VALUES($1, $2, $3) RETURNING *',
      [group_name, group_teacher, group_of]
    )
    console.log(rows)
    client.release()
    res.send('qo`shildi🎉')
  } catch (err) {
    console.log(err)
  }
})

app.put('/', async (req, res) => {
  try {
    const { group_teacher, group_of } = req.body
    const client = await pool.connect()
    const { rows } = await client.query(
      'UPDATE groups SET group_teacher = $1 WHERE group_of = $2 RETURNING *',
      [group_teacher, group_of]
    )
    console.log(rows)
    client.release()
    res.send('updated🎉')
  } catch (err) {
    console.log(err)
  }
})

app.delete('/', async (req, res) => {
  try {
    const { course_id } = req.body
    const client = await pool.connect()
    const { rows } = await client.query(
      'DELETE FROM courses WHERE course_id = $1 RETURNING *',
      [course_id]
    )
    console.log(rows)
    res.send('successfully Deleted one course🎉')
  } catch (err) {
    console.log(err)
  }
})

app.listen(9000, console.log(9000))
