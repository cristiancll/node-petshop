const query = require('../infraestructure/database/query')
class Appointment {
    insert(appointment) {
        const q = `INSERT INTO Appointment SET ?`;
        return query(q, appointment);
    }
    list(){
        const q = "SELECT * FROM Appointment";
        return query(q);
    }
    getById(id){
        const q = "SELECT * FROM Appointment WHERE id=${id}";
        return query(q, id);
    }
    delete(id){
        const q = 'DELETE FROM Appointment WHERE id=?'
        return query(q, id);
    }
    edit(id, values){
        const q = 'UPDATE Appointment SET ? WHERE id=?'
        return query(q, [values, id]);
    }
}
module.exports = new Appointment();
