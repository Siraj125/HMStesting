const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const PharmaUsersSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        default: '',
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

PharmaUsersSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
}

PharmaUsersSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("pharmausers",PharmaUsersSchema);