import { Client } from "../../BACESYSTEM/KMCodes.js";
import { Message, CommandInteraction, MessageEmbed, MessageButton } from "discord.js";
import { KINGMAN_POINTS } from "../../BACESYSTEM/OwnClasses/Class/lanaPoint.js";
export default {
    general: {
        name: `clear`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to remove all user points",
        category: `lana`,
        examples: ["@KINGMAN"],
        usage: ["<member>"],
        /**
         * 
         * @param {Client} client 
         * @param {Message} kmsg 
         * @param {Array} args 
         * @param {import("../../BACESYSTEM/OwnClasses/Class/message.js").default} manager
         */
        run: async(client, kmsg, args, manager)=>{
            await manager.GetMember(args[0]? args[0]: ``)
            .then(async (member)=> {
                let lana_points = new KINGMAN_POINTS({ member: member, Client: client, Guild: kmsg.member.guild , support: kmsg.member, type: "Clear" });
                let data = await lana_points.clearPoints(args.slice(1).join(` `))
                manager.SendDone(kmsg.channel, `${lana_points.admin.displayName} scans points of ${lana_points.member}`);
            })
            .catch(async(e)=> {
                return await manager.sendError(kmsg.channel, e.message)
            })
        }
    },
    slachcmd: {
        name: `cleat`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to remove all user points",
        category: `lana`,
        examples: ["@KINGMAN"],
        usage: ["<Member>"],
        options: [
            {
              type: 6,
              name: `user`,
              description: "User You wanna tio remoive her poionts",
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
                let member = interaction.options.getUser("user", true);
                let lana_points = new KINGMAN_POINTS({ Client: client, Guild: interaction.guild, member: interaction.guild.members.cache.get(member.id), support: interaction.member});
                let data = await lana_points.clearPoints(``);
                interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            title: `${`**✔️ Succeed**`}`,
                            author: {
                                name: `${interaction.user.username}`
                            },
                            description: `${lana_points.admin.displayName} scans points of ${lana_points.member}`,
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
