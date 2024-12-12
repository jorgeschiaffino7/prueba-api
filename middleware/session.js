const { verifyToken } = require('../utils/handleJwt');
const { handleError } = require('../utils/handleError');
const {usersModel} = require("../models");


const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleError(res, "NEED_SESSION", 401)
            return
        }
        const token = req.headers.authorization.split(' ').pop() // omite el Bearer osea la palabra. solo se queda con el token
        const dataToken = await verifyToken(token);
        if (!dataToken._id) {
            handleError(res, "ERROR_ID_TOKEN", 401)
            return
        }

        const user = await usersModel.findById(dataToken._id)
        req.user = user

        next()
        
    } catch (e) {
        console.log(e)
        handleError(res, "ERROR_SESSION", 401)
    }
};

module.exports = authMiddleware;

// 
// Al loguearse genera el token que ponemos en el postman en el authorization -Bearer ......
// formato del token
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzRmNjJmNWVkMTM3M2IxNzA5YjRlZWEiLCJyb2xlIjoidXNlciIsImlhdCI6MTczMzI1NTkzNywiZXhwIjoxNzMzMjYzMTM3fQ.rXVW2dBw8O-kaHWJBU27MKbRpx4N_Tnz0KAOVUFYVpM