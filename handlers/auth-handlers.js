const bcrypt = require('bcrypt')
const db = require('../db/db')

module.exports = {
    authorization: async (req, res) => {
        try {
            res.json({
                status: 'Ok',
                msg: 'Это страница авторизации. Отправьте запрос на authentication, чтобы войти в систему'
            })
        } catch (err) {
            res.status(500).json({status: 'error', msg: 'Произошла ошибка: ' + err.message})
        }
    },
    authentication: async (req, res) => {
        try {
            const {nickname, password} = req.body
            if (!nickname || !password) {
                return res.status(400).json({status: 'error', msg: 'Вы не ввели данные'})
            }

            const person = await db.getPerson(nickname)
            if (!person) {
                return res.status(400).json({status: 'error', msg: 'Вы ввели неверный ник'})
            }

            const comparePassword = bcrypt.compareSync(password, person.password)
            if (!comparePassword) {
                return res.status(400).json({status: 'error', msg: 'Вы ввели неверный пароль'})
            }

            req.session.person_id = person.id
            return res.json({status: 'OK', msg: 'Все прошло успешно!'})

        } catch (err) {
            res.status(500).json({status: 'error', msg: 'Произошла ошибка: ' + err.message})
        }
    },
    logout: async (req, res) => {
        try {
            req.session.person_id = null
            return res.json({status: 'OK', msg: 'Вы успешно вышли из системы!'})
        } catch (err) {
            res.status(500).json({status: 'error', msg: 'Произошла ошибка: ' + err.message})
        }
    }
}