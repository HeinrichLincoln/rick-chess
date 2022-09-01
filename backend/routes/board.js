const express = require('express')
const cors = require('cors')
const router = express.Router() 
const { realizeMovement,
        reset,
        returnBoard,
        returnResult,
        draw} = require('../controllers/board')


router.get('/board', returnBoard)

//esta permitindo o CORS apenas para esta rota
//router.get('/result', cors(), returnResult)

router.get('/result', returnResult)

router.post('/movement', realizeMovement)

router.post('/reset', reset)

router.post('/draw', draw)

module.exports = router