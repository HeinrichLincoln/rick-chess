const express = require('express')
const router = express.Router()
const app = express()
const port = 3000
const board = require('./routes/board')
app.use(express.json())

app.use('/', board)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = router