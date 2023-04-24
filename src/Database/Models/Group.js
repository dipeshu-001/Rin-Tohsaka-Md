const { model, Schema } = require('mongoose')

const schema = new Schema({
    jid: {
        type: String,
        required: true,
        unique: true
    },

    mods: {
        type: Boolean,
        required: true,
        default: false
    },

    events: {
        type: Boolean,
        required: true,
        default: false
    },

    nsfw: {
        type: Boolean,
        required: true,
        default: false
    },

    wild: { 
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    chara: {
        type: String,
        required: false
    }
})

module.exports = model('groups', schema)
