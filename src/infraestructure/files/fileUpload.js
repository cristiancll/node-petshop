const fs = require('fs');

module.exports = (path, fileName, callback) => {
    if(!path && !fileName){
        callback("Invalid parameters");
        return;
    }
    const fileType = path.extname(path);
    if(["jpg", "jpeg", "png"].includes(fileType.substr(1).toLowerCase())){
        callback("Invalid file type");
        return;
    }

    const newPath = `./assets/images/${fileName}${fileType}`;
    fs.createReadStream(path)
        .pipe(fs.createWriteStream(newPath))
        .on('finish', callback(false, newPath));
};
