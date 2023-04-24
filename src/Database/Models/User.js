const { model, Schema } = require('mongoose')

const schema = new Schema({
    jid: {
        type: String,
        required: true,
        unique: true
    },

    experience: {
        type: Number,
        required: true,
        default: 0
    },

    ban: {
        type: Boolean,
        required: true,
        default: false
    },

    tag: String,
    level: {
        type: Number,
        required: true,
        default: 1
        
    },
        
    bank: {
        type: Number,
        required: true,
        default: 0

    },
    
    wallet: {
        type: Number,
        required: true,
        default: 0

    },
            
    lastRob: {
        type: Number,
        required: true,
        default: 0

    }, 
    lastDaily: { 
        type: Date, 
        default: null 
    },
    lastBegTime: { 
        type: Date, 
        default: null 
    },
      lastWork: { 
        type: Date, 
        default: null 
    },


    /////////////////Character Game\\\\\\\\\\\\\\\\\\\\

    mal_id: {
        type: Number,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      nicknames: {
        type: [String],
        required: true,
        default: []
      },
      about: {
        type: String,
        required: true
      },
      favorites: {
        type: Number,
        required: true
      }
})

module.exports = model('userschema', schema)
