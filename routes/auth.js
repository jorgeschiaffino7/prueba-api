const express = require('express');
const router = express.Router();

const { validatorLogin, validatorRegister } = require('../validators/auth');

const { registerCtrl, loginCtrl } = require('../controllers/auth');


/**
 * @openapi
 * /auth/register:
 *  post:
 *    tags:
 *      - auth
 *    name: register
 *    summary: Registrar un nuevo usuario
 *    description: Endpoint para registrar un nuevo usuario en el sistema
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/authRegister'
 *    responses:
 *      '201':
 *        description: Usuario registrado exitosamente
 *      '403':
 *        description: Error de validación
 *      '500':
 *        description: Error del servidor
 */


router.post('/register', validatorRegister, registerCtrl); 


router.post('/login', validatorLogin, loginCtrl);
module.exports = router;