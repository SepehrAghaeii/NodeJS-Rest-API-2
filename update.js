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

router.put('/', (req, res) => {
    // look up the user
    // if not existing return 404
    const user = users.find(p => p.id === parseInt(req.params.id))

    if (!user) { // 404 Error
        res.status(404).send('user not found')
    }

    //validate 
    // if invalid return 400 - bad request
    const result = validateUser(req.body)
    const {error} = validateUser(req.body) // equal to result.error
    if (error) {
        // 400 Error for Bad Request
        res.status(400).send(error.details[0].message)
        return
    }

    //update user
    user.userName = req.body.userName
    res.send(user)
    // return the updated user
})

function validateUser(user) {
    const schema = {
        userName: Joi.string().min(3).required()
    }
    return Joi.validate(user, schema)
}



module.exports = router