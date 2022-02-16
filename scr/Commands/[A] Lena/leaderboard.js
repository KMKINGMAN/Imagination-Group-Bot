import { Client } from "../../BACESYSTEM/KMCodes.js";
import { Message, CommandInteraction, MessageEmbed, MessageButton } from "discord.js";
import { KINGMAN_POINTS } from "../../BACESYSTEM/OwnClasses/Class/lanaPoint.js";
export default {
    general: {
        name: `leaderboard`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to show server leaderboard",
        category: `lana`,
        examples: [""],
        usage: [""],
        /**
         * 
         * @param {Client} client 
         * @param {Message} kmsg 
         * @param {Array} args 
         * @param {import("../../BACESYSTEM/OwnClasses/Class/message.js").default} manager
         */
        run: async(client, kmsg, args, manager)=>{
            let Points = new KINGMAN_POINTS({
                Client: client, Guild: kmsg.guild, member: kmsg.member, support: kmsg.member, type: `Set`
            });
            let data = await Points.GetGuildPoints();
            data.sort((a, b)=> a.points - b.points);
            manager.SendDone(kmsg.channel, data.slice(0, 10).map(o => `<@${o.user_id}> : \`${o.points}\``).reverse().join(`\n`), `Server Leasderboards`)
        }
    },
    slachcmd: {
        name: `leaderboard`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to show server leaderboard",
        category: `lana`,
        examples: [""],
        usage: [""],
        /**
         * 
         * @param {Client} client 
         * @param {CommandInteraction} interaction 
         */
        run: async(client, interaction)=> {
            try {
                let Points = new KINGMAN_POINTS({
                    Client: client, Guild: interaction.guild, member: interaction.member, support: interaction.member, type: `Set`
                });
                let data = await Points.GetGuildPoints();
                data.sort((a, b)=> a.points - b.points);
                interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            title: `${`**Server Leasderboards**`}`,
                            author: {
                                name: `${interaction.user.username}`
                            },
                            description: data.slice(0, 10).map(o => `**<@${o.user_id}> : \`${o.points}\`**`).reverse().join(`\n`),
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
