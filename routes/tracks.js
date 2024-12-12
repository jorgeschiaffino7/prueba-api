const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const { getItems, createItem, getItem, updateItem, deleteItem } = require("../controllers/tracks");
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks");
const checkRole = require("../middleware/role");
//const customHeader = require("../middleware/customHeader");

//TODO http://localhost:3000/api/tracks/ get,post,put,delete


/* *
Listar items
*/
router.get("/",authMiddleware ,getItems);

/* *
Obtener un detalle de item
*/
router.get("/:id", authMiddleware, validatorGetItem, getItem);

/* *
Actualizar un item
*/
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem);

/* *    
Insertar un item
*/
router.post("/",authMiddleware, checkRole(["admin"]), validatorCreateItem, createItem);

/* *
Eliminar un item
*/
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;
