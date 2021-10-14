class Tables {
    init(connection){
        console.log("Generation database tables...");
        this.connection = connection;
        this.createAppointmentTable();
    }

    createAppointmentTable(){
        console.log("Creating table Appointment");
        const query = `
            CREATE TABLE IF NOT EXISTS Appointment (
                id int NOT NULL AUTO_INCREMENT, 
                client VARCHAR(50) NOT NULL, 
                pet VARCHAR(20), 
                service VARCHAR(20) NOT NULL,
                status VARCHAR(20) NOT NULL,
                observation TEXT,
                PRIMARY KEY(id)
          )`;
        this.connection.query(query, (error) => {
            if(error) console.log(error);
            else console.log("Appointment table created successfully");
        });
    }
}


module.exports = new Tables();
