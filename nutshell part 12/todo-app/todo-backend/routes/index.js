const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const { get } = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (_req, res) => {
  const count = await get('added_todos')
  res.send({
    added_todos: parseInt(count || '0', 10),
  })
});

module.exports = router;
