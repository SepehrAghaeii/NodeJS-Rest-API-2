const express = require('express')
const app = express()
const Joi = require('joi')
const userRoute = require('./user')
const updateRoute = require('./update')


app.use(express.json())

const users = [{
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

app.get('/' , (req ,res) => {
    res.send('Hello World')
})

app.get('/api/users' , (req , res) => {
    res.send(users)
})

app.get('/api/users/:id' , (req , res) => {
    const user = users.find(p => p.id === parseInt(req.params.id))

    if(!user) { // 404 Error
        res.status(404).send('user not found')
    }
    res.send(user)
})



// Middleware
app.use('/api/users' , userRoute)
app.use('/api/users/:id' , updateRoute)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Running on port ${port}`))