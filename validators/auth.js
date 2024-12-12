const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorLogin = [

    check('email').exists().notEmpty().isEmail(),
    check('password').exists().notEmpty().isLength({ min: 3 }),

    (req, res, next) => validateResults(req, res, next)
];

const validatorRegister = [
    check('email').exists().notEmpty().isEmail(),
    check('password').exists().notEmpty().isLength({ min: 3 }),
    check('name').exists().notEmpty(),
    check('age').exists().notEmpty().isNumeric(),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = { validatorLogin, validatorRegister };
