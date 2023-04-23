const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const axios  = require('axios')

module.exports = class command extends Command {
    constructor() {
        super('weather', {
            description: 'Converts image/video/gif to sticker',
            category: 'utils',
            usage: 'weather <name>',
            cooldown: 10
        })
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        let {context} = args
        try {
           let wthr = await axios.get(`http://api.weatherapi.com/v1/current.json?key=0af08d75fca5466786e74019212512%20&q=${context}&aqi=no`)
            if (!wthr) return m.reply(`Can not find the place's weather`)
            const reply = `
📍 *Location:* ${wthr.data.location.name}
🏡 *Region:* ${wthr.data.location.region}
🗾 *Country:* ${wthr.data.location.country}
🕗 *Time Zone:* ${wthr.data.location.tz_id}
🌡️ *Temparature:* ${wthr.data.current.temp_c}°C
📡 *Weather Condition:* ${wthr.data.current.condition.text}
🍃 *Wind Speed:* ${wthr.data.current.wind_kph} Km/hr
🎐 *Wind Degree:* ${wthr.data.current.wind_degree}°
🌬️ *Wind Direction:* ${wthr.data.current.wind_dir}
🌈 *pressure:* ${wthr.data.current.pressure_in} in
🌧️ *preciptation:* ${wthr.data.current.precip_mm} mm
💧 *Humidity:* ${wthr.data.current.humidity}%
☁ *Cloud:* ${wthr.data.current.cloud}
🏜️ *Feels like:* ${wthr.data.current.feelslike_c}°C
`
            await this.client.sendMessage(m.from,{text:reply},{quoted:m.message})
            } catch (err) {
                console.log(err)
                return m.reply (`*${context}* isn't a valid place.`)
                }
                          
    }
}