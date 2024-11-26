'use strict'

const app = require('./src/app')

require('dotenv').config()

const SERVER_PORT = process.env.SERVER_PORT

app.listen(SERVER_PORT, () => {
    console.log(`::: SERVER ON ${SERVER_PORT} :::`);
})

// process.on('SIGINT', () => {
//     server.close(() => console.log(`Exit Server Express`))
//     // app.notify.send(ping...)
// })

