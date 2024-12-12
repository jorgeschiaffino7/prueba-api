const express = require("express");
const router = express.Router();
const { uploadMiddleware } = require("../utils/handleStorage");
const { createItem, getItem, deleteItem, updateItem, getItems } = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");


//TODO: http://localhost:3001/api/storage

/**
 * @openapi
 * /storage:
 *  post:
 *    tags:
 *      - storage
 *    summary: Subir un archivo
 *    description: Endpoint para subir un archivo al servidor
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              myfile:
 *                type: string
 *                format: binary
 *    responses:
 *      '201':
 *        description: Archivo subido exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/storage'
 *      '403':
 *        description: Error de validación
 *      '500':
 *        description: Error del servidor
 *  get:
 *    tags:
 *      - storage
 *    summary: Listar archivos
 *    description: Obtener lista de archivos
 *    security:
 *    responses:
 *      '200':
 *        description: Lista de archivos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/storage'
 * /storage/{id}:
 *  get:
 *    tags:
 *      - storage
 *    summary: Obtener detalle de archivo
 *    description: Obtener detalle de un archivo específico
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del archivo
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Detalle del archivo
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/storage'
 *      '404':
 *        description: Archivo no encontrado
 *  delete:
 *    tags:
 *      - storage
 *    summary: Eliminar archivo
 *    description: Eliminar un archivo específico
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del archivo
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Archivo eliminado
 *      '404':
 *        description: Archivo no encontrado
 *  put:
 *    tags:
 *      - storage
 *    summary: Actualizar archivo
 *    description: Actualizar información de un archivo específico
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del archivo
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Archivo actualizado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/storage'
 *      '404':
 *        description: Archivo no encontrado
 */


router.post("/", uploadMiddleware.single("myfile"), createItem);
router.get("/:id", validatorGetItem, getItem);
router.delete("/:id", validatorGetItem, deleteItem);
router.put("/:id", validatorGetItem, updateItem);
router.get("/", getItems);
module.exports = router;
