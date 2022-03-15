const express = require('express')
const router = express.Router() 
const { realizeMovement,
        reset,
        returnBoard,
        returnResult,
        draw} = require('../controllers/board')


router.get('/board', returnBoard)

router.get('/result', returnResult)

router.post('/movement', realizeMovement)

router.post('/reset', reset)

router.post('/draw', draw)

module.exports = router