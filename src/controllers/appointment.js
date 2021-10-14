const appointment = require('../models/appointment')

module.exports = app => {
    app.get('/appointments', (req, res) => {
        appointment.list(res)
    })

    app.get('/appointments/:id', (req, res) => {
        const id = parseInt(req.params.id)
        appointment.getById(id, res)
    })

    app.post('/appointments', (req, res) => {
        const body = req.body
        appointment.create(body, res)
    })

    app.patch('/appointments/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        appointment.edit(id, values, res)
    })

    app.delete('/appointments/:id', (req, res) => {
        const id = parseInt(req.params.id)
        appointment.delete(id, res)
    })
}
