const express = require('express')
const bodyparser = require('body-parser')

const app = new express()
const faker = require('faker')

app.use(bodyparser())

app.get('/:taxpayerId', (req, res) => {
    const { taxpayerId } = req.params

    res.status(200).json({
        taxpayerId,
        nome: faker.name.findName(),
        birthdate: faker.date.past()
    })
})

app.listen(8082, () => console.log('Client API is running...'))
