const express = require('express')
const cors = require('cors')
const router = express.Router()
const app = express()
const port = 12000
const board = require('./routes/board')


//permite chamadas de todos os recursos(CORS)
//app.use(cors())

var corsOption = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json())

app.use('/', cors(corsOption), board)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = router