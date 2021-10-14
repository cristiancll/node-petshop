const connection = require('../infraestructure/connection')
const moment = require('moment')

class Appointment {
    create(appointment, res){
        const creationDate = moment().format('YYYY-MM-DD HH:MM:SS');
        const date = moment(appointment.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const isValidDate = moment(date).isSameOrAfter(creationDate);
        const isValidName = appointment.client.length >= 5;

        const validations = [
            {
                name: 'date',
                valid: isValidDate,
                message: 'Date should be posterior to current date',
            },{
                name: 'client',
                valid: isValidName,
                message: 'Client name should have at least 5 characters',
            }
        ];
        const errors = validations.filter(field => !field.valid);
        if(errors.length){
            res.status(400).json(errors);
        }else{
            const entity = {...atendimento, creationDate};
            const query = `INSERT INTO Appointment SET ?`;
            connection.query(query, entity , (error, result) => {
                if(error) res.status(400).json(error);
                else res.status(201).json(appointment);
            });
        }
    }
    list(res){
        const query = "SELECT * FROM Appointment";
        connection.query(query, (error, results) => {
            if(error) res.status(400).json(error)
            else res.status(200).json(results)
        });
    }

    getById(id, res){
        const query = "SELECT * FROM Appointment WHERE id=${id}";
        connection.query(query, (error, results) => {
            if(error) res.status(400).json(error);
            else res.status(200).json(results[0]);
        });
    }

    edit(id, values, res) {
        if(values.date) {
            values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const query = 'UPDATE Appointment SET ? WHERE id=?'
        connection.query(query, [values, id], (error, results) => {
            if(error) res.status(400).json(error)
            else res.status(200).json({...values, id})
        })
    }

    delete(id, res) {
        const query = 'DELETE FROM Appointment WHERE id=?'

        connection.query(query, id, (error, results) => {
            if(error) res.status(400).json(error)
            else res.status(200).json({id})
        })
    }

}

module.exports = new Appointment();
