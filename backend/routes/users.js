var express = require('express');
var router = express.Router();
const { pool } = require('../config')

/* GET users listing. */
router.get('/', function (request, response) {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
});

router.get('/:id', function (request, response) {

  const { id } = request.params

  const query = `
      SELECT * 
      FROM users
      WHERE id = $1
  `
  const body = [id]

  pool.query(query, body, (error, results) => {
    if (error) {
      throw error
    }
    response.status(202).json(results.rows[0])
  })
})

router.post('/', function (request, response) {

  const { title } = request.body

  const query = `
      INSERT INTO users (title)
      VALUES ($1)
  `

  const body = [title]

  pool.query(query, body, error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'User added' })
  })
})

router.put('/:id', function (request, response) {

  const { title } = request.body
  const { id } = request.params

  const query = `
      UPDATE users
      SET title = $1
      WHERE id = $2
  `

  const body = [title, id]

  pool.query(query, body, error => {
    if (error) {
      return error
    }
    response.status(204).json({ status: 'success', message: 'User updated' })
  })
})

router.delete('/:id', function (request, response) {

  const { id } = request.params

  const query = `
      DELETE FROM users
      WHERE id = $1
  `
  const body = [id]

  pool.query(query, body, error => {
    if (error) {
      return error
    }

    response.status(202).json({ status: 'success', message: 'User deleted' })
  })

})

module.exports = router;
