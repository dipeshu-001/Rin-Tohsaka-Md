require('dotenv').config()
const { default: Baileys, DisconnectReason, jidDecode, fetchLatestBaileysVersion } = require('@adiwajshing/baileys')
const P = require('pino')
const { Boom } = require('@hapi/boom')
const qr = require('qr-image')
const axios = require('axios')
const mongoose = require('mongoose')
const Message = require('./Structures/Message')
const MessageHandler = require('./Handlers/Message')
const AssetHandler = require('./Handlers/Asset')
const CallHandler = require('./Handlers/Call')
const Helper = require('./Structures/Helper')
const Server = require('./Structures/Server')
const Auth = require('./Structures/Auth')
const {Database} = require('quickmongo');
global.db = new Database("mongodb+srv://Ali:ariani@testicles.vzog1fk.mongodb.net/?retryWrites=true&w=majority");


const helper = new Helper({
    prefix: process.env.PREFIX || '+',
    name: process.env.NAME || '',
    mods: (process.env.MODS || '').split(', ').map((jid) => `${jid}@s.whatsapp.net`),
    session: process.env.SESSION || '',
    PORT: (process.env.PORT || 3000)
})

new Server(helper)

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('No MongoDB URI provided')
    }

    await mongoose.connect(process.env.MONGO_URI)
    db.on("ready", () => {
        console.log("Connected to the database 69");
     
    });
    
    // top-level awaits
    await db.connect(); 
    helper.log('Connected to the Database')

    const { useAuthFromDatabase } = new Auth(helper.config.session)

    console.log(helper.config.session)

    const { saveState, state, clearState } = await useAuthFromDatabase()

    const client = Baileys({
        version: (await fetchLatestBaileysVersion()).version,
        printQRInTerminal: true,
        auth: state,
        logger: P({ level: 'fatal' }),
        browser: ['Quantam', 'fatal', '1.0.0']
    })

    const messageHandler = new MessageHandler(client, helper)

    const callHandler = new CallHandler(client, helper)

    new AssetHandler(helper).loadAssets()

    messageHandler.loadCommands()

    client.ev.on('messages.upsert', async ({ messages }) => {
        const M = await new Message(messages[0], client).simplifyMessage()
        await messageHandler.handleMessage(M)
        
    })

    client.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
          let decode = jidDecode(jid) || {};
          return (
            (decode.user && decode.server && decode.user + "@" + decode.server) ||
            jid
          );
        } else return jid;
      };

    client.ws.on('CB:call', async (call) => await callHandler.handleCall(call))

    client.ev.on('contacts.update', async (contacts) => await helper.contact.saveContacts(contacts))

    client.ev.on('connection.update', (update) => {
        if (update.qr) {
            helper.log(
                `QR code generated. Scan it to continue | You can also authenicate in http://localhost:${helper.config.PORT}`
            )
            helper.QR = qr.imageSync(update.qr)
        }
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const { statusCode } = new Boom(lastDisconnect?.error).output
            if (statusCode !== DisconnectReason.loggedOut) {
                helper.log('Reconnecting...')
                setTimeout(() => start(), 3 * 1000)
            } else {
                clearState()
                helper.state = 'logged_out'
                helper.log('Disconnected')
            }
        }
        


        if (connection === 'connecting') {
            helper.state = 'connecting'
            helper.log('Connecting to WhatsApp...')
        }
        if (connection === 'open') {
            
            helper.state = 'open'
            helper.log('Connected to WhatsApp')
             messageHandler.spawnChara()
        }
    })

    client.ev.on('creds.update', saveState)

    return client
}

start()
