//const { compare } = require('../utils/handlePassword');
const { usersModel } = require('../models');
const { matchedData } = require('express-validator');
const { tokenSign } = require('../utils/handleJwt');
const { encrypt, compare } = require('../utils/handlePassword');
const { handleError } = require('../utils/handleError');

/* 
  Register a new user
*/

const registerCtrl = async (req, res) => {
  try {
    const data = matchedData(req);
    const passwordHash = await encrypt(data.password);
    const body = { ...data, password: passwordHash };
    const dataUser = await usersModel.create(body);
    dataUser.set('password', undefined, { strict: false });
    const dataToken = {   
      token: await tokenSign(dataUser),
      user: dataUser
    }
    res.status(201);
    res.send({ dataToken });
  } catch (e) {
    handleError(res, 'Error registering user');
  }
}



/* 
  Login a user
*/

const loginCtrl = async (req, res) => {
  try{
    req = matchedData(req);
    const user = await usersModel.findOne({email:req.email}).select('password name role email');  

    if(!user){
      handleError(res, "USER_NOT_EXISTS", 404);
      return
    }

    const hashPassword = user.get('password');

    const check = await compare(req.password, hashPassword)

    if(!check){
      handleError(res, "PASSWORD_INVALID", 401);
      return
    }

    user.set('password', undefined, {strict:false}) //
    const data = {
      token: await tokenSign(user),
      user
    }

    res.send({data})


  }catch(e){
    console.log(e)
    handleError(res, "ERROR_LOGIN_USER")
  }
}


module.exports = { registerCtrl, loginCtrl };
