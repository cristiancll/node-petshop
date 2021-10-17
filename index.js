const customExpress = require('./src/config/customExpress')
const connection = require('./src/infraestructure/database/connection');
const tables = require('./src/infraestructure/database/tables')
connection.connect(error => {
    if(error){
        console.log(error);
    }else{
        console.log("Starting server...");
        const PORT_NUMBER = 3000;
        tables.init(connection);
        const app = customExpress();
        app.listen(PORT_NUMBER, () => console.log("Server started on port "+PORT_NUMBER));
    }
});
