import { Client } from "../../BACESYSTEM/KMCodes.js";
import { Message, CommandInteraction, MessageEmbed, MessageButton } from "discord.js";
import { KINGMAN_GUILDS_DATA } from "../../BACESYSTEM/OwnClasses/Class/lanaGuild.js";
export default {
    general: {
        name: `award_remove`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "used to remove prizes",
        category: `lana`,
        examples: ["15"],
        usage: ["points"],
        /**
         * 
         * @param {Client} client 
         * @param {Message} kmsg 
         * @param {Array} args 
         * @param {import("../../BACESYSTEM/OwnClasses/Class/message.js").default} manager
         */
        run: async(client, kmsg, args, manager)=>{
            try {// A 10-point removed
                if(!args[0] || isNaN(args[0])){
                    return manager.sendError(kmsg.channel, `ERROR`)
                }
                let data = new KINGMAN_GUILDS_DATA({ Guild: kmsg.guild });
                await data.removeAward(Number(args[0]));
                manager.SendDone(kmsg.channel, `${args[0]} Points award removed`);
            } catch (error) {
                manager.sendError(kmsg.channel, error.message)
            }
        }
    },
    slachcmd: {
        name: `award_remove`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "used to remove prizes",
        category: `lana`,
        examples: ["15"],
        usage: ["<Points>"],        
        options: [
            {
                type: 10,
                name: "award_req_points",
                description: "points amout",
                required: true
            }
        ],
        /**
         * 
         * @param {Client} client 
         * @param {CommandInteraction} interaction 
         */
        run: async(client, interaction)=> {
            try {
                let points = interaction.options.getNumber("award_req_points", true)
                let data = new KINGMAN_GUILDS_DATA({ Guild: interaction.guild });   
                await data.removeAward(points);
                interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            title: `${`**✔️ Succeed**`}`,
                            author: {
                                name: `${interaction.user.username}`
                            },
                            description: `**${String(points)} Points award removed**`,
                            footer: {
                                text: `${client.user.username} Power By KMCodes`
                            },
                            color: `#ffaa00`
                        })
                    ]
                })   
            } catch (e) {
                interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            title: `**⚠️ Error**`,
                            description: `**${e.message}**`,
                            footer: {
                                text: `${client.user.username} Power By KMCodes`
                            },
                            color: `#f5210a`
                        })
                    ]
                })
            }
        }
    }
}
