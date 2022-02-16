import { Client } from "../../BACESYSTEM/KMCodes.js";
import { Message, CommandInteraction, MessageEmbed, MessageButton } from "discord.js";
import { KINGMAN_GUILDS_DATA } from "../../BACESYSTEM/OwnClasses/Class/lanaGuild.js";
export default {
    general: {
        name: `logs`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to set log channel",
        category: `lana`,
        examples: ["#kingman"],
        usage: ["<GuildTextChannel>"],
        /**
         * 
         * @param {Client} client 
         * @param {Message} kmsg 
         * @param {Array} args 
         * @param {import("../../BACESYSTEM/OwnClasses/Class/message.js").default} manager
         */
        run: async(client, kmsg, args, manager)=>{// Rum has been identified points
            await manager.GetChannel(args[0]? args[0]: ``)
            .then(async(channel) => {
                let data = new KINGMAN_GUILDS_DATA({Guild: kmsg.guild })
                let data2 = await data.setLog(channel.id)
                manager.SendDone(kmsg.channel, `Congratulation points channel selected <#${data2.logs}>`)
            })
            .catch(async(e) => {
                manager.sendError(kmsg.channel, e.message)
            })
        }
    },
    slachcmd: {
        name: `set_log`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to set log channel",
        category: `lana`,
        examples: ["#KINGMAN"],
        usage: ["<GuildTextChannel>"],
        options: [
            {
              type: 7,
              name: "logs_channel",
              description: "logs channel",
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
                let channel = interaction.options.getChannel("logs_channel", true)
                let data = new KINGMAN_GUILDS_DATA({Guild: interaction.guild })
                let data2 = await data.setLog(channel.id)
                interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            title: `${`**✔️ Succeed**`}`,
                            author: {
                                name: `${interaction.user.username}`
                            },
                            description: `Congratulation points channel selected <#${data2.logs}>`,
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
