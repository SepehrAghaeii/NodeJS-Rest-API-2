const express = require('express')
const Joi = require('joi')
const router = express.Router()

const users = [
    {
        id: 1,
        userName: 'user1'
    },
    {
        id: 2,
        userName: 'user2'
    },
    {
        id: 3,
        userName: 'user3'
    }
]

router.post('/', (req, res) => {
    const {
        error
    } = validateUser(req.body) // equal to result.error
    if (error) {
        // 400 Error for Bad Request
        res.status(400).send(error.details[0].message)
        return
    }

    const user = {
        id: users.length + 1,
        userName: req.body.userName
    }
    users.push(user)
    res.send(user)
})

function validateUser(user) {
    const schema = {
        userName: Joi.string().min(3).required()
    }
    return Joi.validate(user, schema)
}

module.exports = router