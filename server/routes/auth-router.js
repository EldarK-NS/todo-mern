const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
require('dotenv').config()
const UserSchema = require('../model/schemas/user.js')


function createToken(user) {
    const payload = {
        subject: user.email,
        username: user.name
    }
    const options = {
        expiresIn: '1d'
    } // срок дейстия

    const result = jwt.sign(
        payload,
        process.env.SECRET,
        options
    )
    return result
}

function routes() {
    router.post('/register', (req, res) => {
        let user = req.body

        const hash = bcrypt.hashSync(user.password, 10)

        user.password = hash
        const newUser = new UserSchema(user)
        newUser.save()
            .then((saved) => {
                const token = createToken(user)

                res.status(201).json({
                    success: true,
                    user: {
                        name: saved.name,
                        email: saved.email,
                        age: saved.age,
                        token
                    }
                })
            }).catch(error => {
                res.status(500).json({ success: false, error })
            })
    })

    router.post('/login', async (req, res) => {
        try {
            let user = req.body
            console.log(user)
            //! проверка на существование юзера
            const existingUser = await UserSchema.findOne({ email: user.email })
            //! если такого нет, то ошибка и сообщение
            if (!existingUser) {
                res.status(400).send('User does not exist')
            }
            //! если он есть проверяем на совпадение паролей
            const passwordMatch = await bcrypt.compare(user.password, existingUser.password)
            //! если пароли не совпадают то ошибка и сообщение
            if (!passwordMatch) {
                res.status(400).json({ success: false, error: 'Bad credentials' })
            }
            //! если пароли сопадают то создаем токен
            const token = createToken(existingUser)
            //! получаем ответ от сервера
            res.status(200).json({
                success: true,
                user: {
                    name: existingUser.name,
                    email: existingUser.email,
                    age: existingUser.age,
                    token
                }
            })
        } catch (error) {
            res.status(500).json({ success: false, error })
        }
    })

    return router;
}

module.exports = routes