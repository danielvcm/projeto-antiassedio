const express = require('express')
const firebase = require('firebase')
const cors = require('cors')

const ApiKeys = require('./src/constants/ApiKeys')
const ReportHarassment = require('./src/services/report-harrassment')

const server = express()

const port = 3000
firebase.initializeApp(ApiKeys);

server.use(cors())
server.use(express.json())

server.post('/alert', async (req, res) => {
    ReportHarassment.report(req.body.location)
    res.send({status: 'ok'})
})

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})