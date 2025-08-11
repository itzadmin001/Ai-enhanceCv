const bcrypt = require("bcrypt");
const saltRounds = 10;

var jwt = require('jsonwebtoken');


const GenrateToken = (email, id) => {
    return jwt.sign(
        { email, id },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
    );
}



function DecriptPassword(Plainpassword, DbPassword) {
    return bcrypt.compare(Plainpassword, DbPassword);
}


function GenrateHashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) return reject(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return reject(err);
                resolve(hash);
            });
        });
    });
}


module.exports = { GenrateHashPassword, GenrateToken, DecriptPassword }