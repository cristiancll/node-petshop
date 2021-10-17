const Appointment = require('../models/appointment')
const axios = require("axios");
const moment = require("moment");

module.exports = app => {
    app.get('/appointments', (req, res) => {
        Appointment.list()
            .then(entities => res.status(200).json(entities))
            .catch(error => res.status(400).json(error));
    })

    app.get('/appointments/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Appointment.getById(id)
            .then(async entities => {
                const appointment = entities[0];
                const taxpayerId = appointment.client;
                const {data} = await axios.get(`http://localhost:8082/${taxpayerId}`)
                appointment.client = data;
                res.status(200).json(appointment);
            })
            .catch(error => res.status(400).json(error));
    })

    app.post('/appointments', (req, res) => {
        const body = req.body
        Appointment.insert(body)
            .then(entity => res.status(201).json(entity))
            .catch(error => res.status(400).json(error));
    })

    app.patch('/appointments/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        if(values.date) {
            values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        Appointment.edit(id, values)
            .then(entity => res.status(200).json({...values, id}))
            .catch(error => res.status(400).json(error));
    })
    app.delete('/appointments/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Appointment.delete(id)
            .then(entity => res.status(200).json({id}))
            .catch(error => res.status(400).json(error));
    })
}
