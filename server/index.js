// importing required package


const express = require('express')
const next = require('next');
const cors = require('cors')
const connect = require('./model/connect')
const bodyParser = require('body-parser').json()
require('dotenv').config()
// set the PORT number to the value in .env file
const PORT = process.env.PORT;

// starts next app in dev mode and create a handle, the request handler is provided by Next to manage server request and response

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();
// invoke app.prepare() - if it is successful we run then() block, else -catch block
// within the the() we invoke an istance of express as our server and we also add /api route to our server, server.use simply that other routes conteined the routes index file wil be used by the server
app
    .prepare()
    .then(() => {
        const server = express()
        //! 1регистрируем роутер здесь перед этим создаем его в ./routes
        const routes = require('./routes/index.js')
        const authRouter = require('./routes/auth-router.js')
        const todoRouter = require('./routes/todo-router.js')

        // all req made to /api wil be handled by routes() - все запросы, сделанные в / api, будут обрабатываться routes ()
        server.use(cors())
        //! 2 здесь прописываем маршрут
        server.use('/api', routes(server))
        server.use('/api/auth', bodyParser, authRouter(server))
        server.use('/api/todo', bodyParser, todoRouter(server))


        // all other req will be handled by the next app
        server.get('*', (req, res) => {
            return handle(req, res)
        })

        //after handling frontend req we run our DB connect method, 
        // mongoDB connect method
        connect()

        //finally we invoke the server.listen method wich will take our PORT and also throw an error 
        // this starts our server on the PORT we specified
        server.listen(PORT, err => {
            if (err) throw err;
            // end if we dont have any errors console prints PORT number
            console.log((`>_ Ready on ${PORT}`))
        })
    })
    .catch(error => {
        console.log(error)
        process.exit(1)
    })