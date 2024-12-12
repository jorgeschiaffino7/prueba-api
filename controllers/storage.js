//TODO: tracks controller - contiene la logica
const fs = require("fs");
const { storageModel } = require("../models");
const { handleError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;




/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (error) {
    handleError(res, 'Error al obtener los elementos');
  }
};

/**
 * Obtener un detalle
 */
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleError(res, 'Error al obtener el elemento');
  } 
};

/**
 * Insertar un registro
 */
const createItem = async (req, res) => {
  try {
    const { body, file } = req;
    console.log(file);

  const fileData = {
    filename: file.filename,
    url: `${PUBLIC_URL}/${file.filename}`,
  };
  const data = await storageModel.create(fileData);
    res.send({ data });
  } catch (error) {
    handleError(res, 'Error al crear el elemento');
  }
};

/**
 * Actualizar un registro
 */
const updateItem = async (req, res) => {};

/**
 * Eliminar un registro
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await storageModel.delete({ _id: id });
    await storageModel.deleteOne({ _id: id });
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`;
    //fs.unlinkSync(filePath); asi borramos fisicamente el archivo
    const data = {
      filePath,
      deleted: 1
    }
    res.send({ message: "Todo salio bien", data });
  } catch (error) {
    handleError(res, 'Error al eliminar el elemento');
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
