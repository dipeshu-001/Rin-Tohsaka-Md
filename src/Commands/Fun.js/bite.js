const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const axios = require('axios')

module.exports = class command extends Command {
    constructor() {
        super('bite', {
            description: 'Says hi to the bot',
            category: 'general',
            usage: 'gpt',
            exp: 15,
            cooldown: 5
        })
    }
    
    /**
     * @param {Message} m
     * @returns {Promise<void>}
     */

    execute = async (m , args) => { 

        var pat = await this.helper.utils.fetchJson(`https://api.waifu.pics/sfw/bite`)

        try {

            let usep = m.sender.jid

            let mentioneduser=``
            let users = ''
            let ment = ''
   
            try {
      
                const mention= m.mentioned
     
                users += await mention[0]
    
                ment+=[usep,users]
  
            } 
            
            catch {
      
                users += "none"
      
                ment+=[usep,m.sender]
   
            }
   
            if(users == 'none'){
    
                mentioneduser =`@${usep.split("@")[0]} bitten themselves`
    
                console.log(mentioneduser)
    
  
            }
            
            else {
   
                const mentioneduserr =`@${users.split("@"[0])}`
 
                mentioneduser= `@${usep.split("@")[0]} bitten @${users.split("@")[0]} `
    
                console.log(mentioneduser)
   
            }
       
            const response = await axios.get(pat.url,  { responseType: 'arraybuffer' })
       
            const buffer = Buffer.from(response.data, "utf-8")
       
            var sgif = await this.helper.utils.gifToMp4(buffer)
       
            client.sendMessage(m.from,{video: sgif, gifPlayback:true,mentions:ment,caption:mentioneduser},{quoted:m.message})
      
        }
         
        catch (error) {
         
            console.log(error);
       
        }
   
    }
    
  
}
    