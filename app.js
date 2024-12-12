require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongo');
const openApiConfiguration = require('./docs/swagger');
const swaggerUi = require('swagger-ui-express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const PORT = process.env.PORT || 3000;


/* 
* Documentacion de la API con Swagger
*/
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(openApiConfiguration));



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();

/**
 * VAMOS A INVOCAR LAS RUTAS
 */
app.use("/api", require("./routes"));
