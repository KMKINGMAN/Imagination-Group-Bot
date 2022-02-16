import { Client } from "../../BACESYSTEM/KMCodes.js";
import { Message, CommandInteraction, MessageEmbed, MessageButton } from "discord.js";
import { default as lana_data} from "../../BACESYSTEM/modlas/point.js";
import { KINGMAN_POINTS } from "../../BACESYSTEM/OwnClasses/Class/lanaPoint.js";
export default {
    general: {
        name: `points`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to show user points",
        category: `lana`,
        examples: ["@kingman"],
        usage: ["<member?>"],
        /**
         * 
         * @param {Client} client 
         * @param {Message} kmsg 
         * @param {Array} args 
         * @param {import("../../BACESYSTEM/OwnClasses/Class/message.js").default} manager
         */
        run: async(client, kmsg, args, manager)=>{
            await manager.GetMember(args[0]? args[0]: kmsg.member.id)
            .then(async (member)=> {
                let lana_data = new KINGMAN_POINTS({ member: member, support: kmsg.member, Guild: kmsg.guild, Client: client});
                let data = await lana_data.GetPoint();
                manager.SendDone(kmsg.channel, `${member} has ${data.points} points`)
            })
            .catch(async(e)=> {
                manager.sendError(kmsg.channel, e.message)
            })
        }
    },
    slachcmd: {
        name: `points`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to show user points",
        category: ``,
        examples: ["@KINGMAN"],
        usage: ["<Member?>"],
        options: [
            {
              type: 6,
              name: `user`,
              description: "User You wanna tio remoive her poionts",
              required: false
            }
        ],
        /**
         * 
         * @param {Client} client 
         * @param {CommandInteraction} interaction 
         */
        run: async(client, interaction)=> {
            let member = interaction.options.getUser("user", false);
            try {
                let lana_data = new KINGMAN_POINTS({ member: member ? member: interaction.member, support: interaction.member, Guild: interaction.guild, Client: client});
                let data = await lana_data.GetPoint();
                interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            title: `${`**✔️ Succeed**`}`,
                            author: {
                                name: `${interaction.user.username}`
                            },
                            description: `${member ? member: interaction.member} has \`${data.points}\` points`,
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