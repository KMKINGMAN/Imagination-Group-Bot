import { Client } from "../../BACESYSTEM/KMCodes.js";
import { Message, CommandInteraction, MessageEmbed, MessageButton } from "discord.js";
import { KINGMAN_GUILDS_DATA } from "../../BACESYSTEM/OwnClasses/Class/lanaGuild.js";
export default {
    general: {
        name: `award_add`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to add prizes",
        category: `lana`,
        examples: ["@Role 10"],
        usage: ["<role> <req_pointa>"],
        /**
         * 
         * @param {Client} client 
         * @param {Message} kmsg 
         * @param {Array} args 
         * @param {import("../../BACESYSTEM/OwnClasses/Class/message.js").default} manager
         */
        run: async(client, kmsg, args, manager)=>{
            await manager.GetRole(args[0]? args[0]: ``)
            .then(async(role) => {
                if(!args[1] || isNaN(args[1])){
                    return manager.sendError(kmsg.channel, `ERROR`)
                }
                let data = new KINGMAN_GUILDS_DATA({ Guild: kmsg.guild });
                await data.setAward(role.id, Number(args[1]));
                manager.SendDone(kmsg.channel, `Role ${role} have been added to ${args[1]} Points awards`)
            })
            .catch(e => {
                manager.sendError(kmsg.channel, e.message)
            })
        }
    },
    slachcmd: {
        name: `award_add`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to add prizes",
        category: `lana`,
        examples: ["@Role <Points>"],
        usage: ["<GuildRoles> <Points>"],        
        options: [
            {
                type: 8,
                name: "role",
                description: "award role",
                required: true
            },
            {
                type: 10,
                name: "number_of_points",
                description: "the points amout",
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
                let role = interaction.options.getRole("role", true);
                let points = interaction.options.getNumber("number_of_points", true);
                let data = new KINGMAN_GUILDS_DATA({Guild: interaction.guild});
                await data.setAward(role.id, points);
                interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            title: `${`**✔️ Succeed**`}`,
                            author: {
                                name: `${interaction.user.username}`
                            },
                            description: `**Role ${role} have been added to ${String(points)} Points award**`,
                            footer: {
                                text: `${client.user.username} Power By KMCodes`
                            },
                            color: `#ffaa00`
                        })
                    ]
                })
            } catch(e) {
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
