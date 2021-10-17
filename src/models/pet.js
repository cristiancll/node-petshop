const connection = require('../infraestructure/database/connection')
const fileUpload = require('../infraestructure/files/fileUpload')

class Pet {
    add(pet, res){
        const query = `INSERT INTO Pet ?`;
        fileUpload(pet.image, pet.name, (error, path) => {
            if(error){
                res.status(400).json(error);
                return;
            }
            const newPet = {name: pet.name, image: path};
            connection.query(query, newPet, error => {
                if(error) res.status(400).json(error);
                else res.status(200).json(pet);
            });
        });
    }
    edit(pet){

    }
    remove(pet){

    }
}

module.exports = new Pet()
