const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        
    },
    password:{
        type:String,
        required:true,
        select:false
        
    },
    age:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },


},

    {
        timestamps:true,
        versionKey:false
    },
);

userSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("User", userSchema);
