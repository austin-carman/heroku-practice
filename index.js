require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const server = express()

server.use(express.json())
server.use(cors()) //enables cross origin requests
server.use(express.static(path.join(__dirname, 'client/build'))) // static assets

console.log(process.env.USER); // env USER=austincarman
console.log(process.env.SHELL); //env SHELL=/bin/zsh

if(process.env.NODE_ENV === 'production') {
    console.log('this means this code is deployed');
}

const PORT = process.env.PORT || 5000;

console.log('port:', PORT);

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html')) // endpoint that's sending back index.html when the endpoint is '/'
})

server.get('/api', (req, res) => {
    res.json({ message: `${process.env.COHORT} ROCKS!` })
})

server.use((req, res) => { // catch all error
    res.status(404).json({
        message: 'not found sorry'
    })
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})