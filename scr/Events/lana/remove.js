import { Client } from "../../BACESYSTEM/KMCodes.js";
import { KINGMAN_GUILDS_DATA } from "../../BACESYSTEM/OwnClasses/Class/lanaGuild.js";
export default {
    name: 'kmcodesPointsRemove',
    /**
     * 
     * @param {Client} client 
     * @param {{ General: import("../../BACESYSTEM/OwnClasses/Class/lanaPoint.js").KINGMAN_POINTS, DB: {guild_id:String,user_id:String, points: Number}, reason: String }} data
     */
     run: async(data, client)=> {
        let guild_data = new KINGMAN_GUILDS_DATA({ Guild: data.General.guild});
        let awards = await guild_data.awards();
        awards.forEach(async(award) => {
            if(data.DB.points < award.points && award.users.includes(data.General.member.id)){
                await guild_data.remove_user(Number(award.points), data.General.member.id);
                client.emit("kmcodesAwardRevoke", { role: award.role, member: data.General.member, Data: guild_data })
            }
        })
    }
}