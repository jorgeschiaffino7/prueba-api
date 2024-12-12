const { handleError } = require("../utils/handleError");

const checkRole = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        console.log({user});
        const rolesByUser = user.role;
        const checkValueRole = roles.some((roleSingle) => rolesByUser.includes(roleSingle));
        if (!checkValueRole) {
            handleError(res, "USER_NOT_PERMISSIONS", 403);
            return;
        }
        next();
    } catch (e) {
        handleError(res, "ERROR_PERMISSIONS", 403);
    }
};

module.exports = checkRole;

// El problema es que en el middleware de sesión (session.js) hay un error en el orden:
// El next() se ejecuta antes de asignar el usuario a req.user
// Debería ser:

// const user = await usersModel.findById(dataToken._id) 
// req.user = user
// next()

// Por eso cuando llega a este middleware de roles, req.user es undefined
// Para arreglarlo hay que modificar el orden en session.js
