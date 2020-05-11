const mongodb = require('mongoose');

const {Schema} = mongodb;

const AudiSchema = new Schema({
    name : String,
    msg: String,
    Fecha_crad: {
        type:Date,
        default:Date.now
    }
});

module.exports = mongodb.model('Chat', AudiSchema);