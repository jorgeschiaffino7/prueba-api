const bcryptjs = require('bcryptjs');

// pasamos la contraseña en texto plano y se encripta.
const encrypt = async (passwordPlain) => {
    return await bcryptjs.hash(passwordPlain, 10);
}

// comparar contraseñas, el texto plano con el hash que es el encriptado.
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword);
}

module.exports = { encrypt, compare };