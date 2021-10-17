class Tables {
    init(connection){
        console.log("Generation database tables...");
        this.connection = connection;
        this.createAppointmentTable();
        this.createPetTable();
    }

    createAppointmentTable(){
        console.log("Creating table Appointment");
        // language=SQL format=false
        const query = `
            CREATE TABLE IF NOT EXISTS Appointment (
                id INT NOT NULL AUTO_INCREMENT, 
                client VARCHAR(11) NOT NULL, 
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

    createPetTable(){
        console.log("Creating table Pet");
        const query = `
            CREATE TABLE IF NOT EXISTS Pet (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(50),
                image VARCHAR(200),
                PRIMARY KEY(id)
            )
        `;
        this.connection.query(query, (error) => {
            if(error) console.log(error);
            else console.log("Pet table created successfully");
        })
    }
}


module.exports = new Tables();
