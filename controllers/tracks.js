//TODO: tracks controller - contiene la logica

const { tracksModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleError } = require("../utils/handleError");

/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await tracksModel.findAllData();
    res.send({ data, user });
  } catch (error) {
    handleError(res, 'Error al obtener los elementos');
  }
};

/**
 * Obtener un detalle
 */



/* const getItem = async (req, res) => {
  try{
    req = matchedData(req);
    const {id} = req;
    const data = await tracksModel.findOneData(id);
    res.send({ data });
  }catch(e){
    handleError(res,"ERROR_GET_ITEM")
  }
}; */
/**
 * El error en getItem puede ocurrir por varias razones:
 * 
 * 1. El ID proporcionado no es válido o no existe en la base de datos
 * 2. Hay un error en la conversión del ID a ObjectId de MongoDB
 * 3. El método findOneData puede fallar si la relación con storage no existe
 * 
 * Podemos mejorar el manejo de errores así:
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const {id} = req;
    
    // Verificar que el ID sea válido
    if (!id) {
      handleError(res, "ID_NO_VALIDO");
      return;
    }

    const data = await tracksModel.findOneData(id);
    
    // Verificar si se encontró el item
    if (!data || data.length === 0) {
      handleError(res, "ITEM_NO_EXISTE");
      return;
    }

    res.send({ data });
  } catch(e) {
    console.log("Error específico:", e); // Para debugging
    handleError(res, "ERROR_GET_ITEM");
  }
};



/**
 * Insertar un registro
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.status(201);
    res.send({ data });
  } catch (e) {
    handleError(res, "ERROR_CREATE_ITEMS");
  }
};

/**
 * Actualizar un registro
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findByIdAndUpdate(id, body);
    res.send({ message: "Todo salio bien", data });
  } catch (error) {
    handleError(res, 'Error al actualizar el elemento');
  }
};

/**
 * Eliminar un registro
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await tracksModel.delete({ _id: id });
    res.send({ message: "Todo salio bien", data });
  } catch (error) {
    handleError(res, 'Error al eliminar el elemento');
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
