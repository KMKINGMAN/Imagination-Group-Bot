import { GuildMember } from "discord.js";
import { Client } from "../../BACESYSTEM/KMCodes.js";
import { KINGMAN_GUILDS_DATA } from "../../BACESYSTEM/OwnClasses/Class/lanaGuild.js";
export default {
    name: 'kmcodesAwardClame',
    /**
     * 
     * @param {Client} client 
     * @param {{ role: String, member: GuildMember, Data: import("../../BACESYSTEM/OwnClasses/Class/lanaGuild.js").KINGMAN_GUILDS_DATA, points: Number }} data
     */
    run: async(data, client)=> {
        try{
            data.member.roles.add(data.role).catch(e => { console.log(e.message) });
            let data2 = await data.Data.GetData();
            let channel = await data.member.guild.channels.fetch(data2.logs);
            channel.send(`**Congratulations ${data.member}, you have reached ${data.points} and you have been awarded your role <@&${data.role}>! **`);

        } catch(err){
            console.log(err.message)
        }
    }
}