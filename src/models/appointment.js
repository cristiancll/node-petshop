const moment = require('moment')
const repository = require('../repository/appointment')

class Appointment {
    constructor(){
        this.isValidDate = (date, creationDate) => moment(date).isSameOrAfter(creationDate);
        this.isValidTaxpayerId = (size) => size !== 11;
        this.validate = (parameters) => {
            this.validations.filter(field => {
              const {name} = field.name;
              const parameter = parameters[name];
              return !field.valid(parameter);
            })
        };
        this.validations = [
            {
                name: 'date',
                valid: this.isValidDate,
                message: 'Date should be posterior to current date',
            },{
                name: 'client',
                valid: this.isValidTaxpayerId,
                message: 'Client taxpayer id should have exactly 11 characters',
            }
        ];
    }

    insert(appointment){
        const creationDate = moment().format('YYYY-MM-DD HH:MM:SS');
        const date = moment(appointment.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const parameters = {
            data: {date, creationDate},
            client: {size: appointment.client.length},
        }
        const errors = this.validate(parameters);

        if(errors.length){
            return new Promise((resolve, reject) => reject(errors));
        }else{
            const entity = {...appointment, creationDate};
            return repository.insert(entity)
                .then((result) => {
                    const id = result.id;
                    return ({...appointment, id});
                });
        }
    }
    list(){
        return repository.list();
    }

    getById(id){
        return repository.getById(id);
    }

    edit(id, values) {
        return repository.edit(id, values);
    }

    delete(id, res) {
        return repository.delete(id);
    }

}

module.exports = new Appointment();
