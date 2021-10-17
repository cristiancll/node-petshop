const connection = require('./connection')

const execQuery = (q, parameters = '') => {
    return new Promise((resolve, reject) => {
        connection.query(q, parameters, (error, result) => {
            if(error) reject(error);
            else resolve(result);
        });
    });
};

module.exports = execQuery
