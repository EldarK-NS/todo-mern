const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

const connectURI = process.env.MONGO_DB_URI
mongoose.set('useCreateIndex', true)

const connect = async () => {
    try {
        await mongoose.connect(connectURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connected to DB')
    } catch (e) {
        console.log(`error ${e.message}`)
    }
}

module.exports = connect