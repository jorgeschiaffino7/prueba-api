const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const TracksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      },
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
 );


 TracksSchema.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "storages", // Nombre de la colección con la que haces el join
        localField: "mediaId", // Campo en la colección actual
        foreignField: "_id", // Campo en la colección "storages"
        as: "audio", // Nombre del nuevo campo agregado
      },
    },
    {
      $unwind: {
        path: "$audio",
        //preserveNullAndEmptyArrays: true, // Maneja los casos donde no haya datos relacionados
      },
    },
  ]);
  return joinData;
};


// relacion con storage

/* TracksSchema.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $match: {
        _id:mongoose.Types.ObjectId(id), //_id es el id de mongo padre osea del track y el id es el que le pasamos por parametro
      },
    },
    {
      $lookup: {
        from: "storages",
        localField: "mediaId",
        foreignField: "_id",
        as: "audio", // nombre de la columna que se crea en la tabla tracks es una alias que va a aparecer 
                     // cuando hagamos listados de items
      },
    },
    {
      $unwind: "$audio",
      //preserveNullAndEmptyArrays: true,
    },

  ]);
  return joinData;
};
  */

TracksSchema.statics.findOneData = function (id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ObjectId format");
  }
  const joinData = this.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId.createFromHexString(id),
      },
    },
    {
      $lookup: {
        from: "storages",
        localField: "mediaId",
        foreignField: "_id",
        as: "audio",
      },
    },
    {
      $unwind: "$audio",
      // preserveNullAndEmptyArrays: true,
    },
  ]);
  return joinData;
};


TracksSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("tracks",TracksSchema);