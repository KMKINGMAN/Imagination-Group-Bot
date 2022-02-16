import { Client } from "../../BACESYSTEM/KMCodes.js";
import { Message, CommandInteraction, MessageEmbed, MessageButton } from "discord.js";
import { KINGMAN_POINTS } from "../../BACESYSTEM/OwnClasses/Class/lanaPoint.js";
export default {
    general: {
        name: `add`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to add points",
        category: `lana`,
        examples: ["@KINGMAN 5"],
        usage: ["<member> points"],
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
                if(!args[1] || isNaN(args[1])){
                    return await manager.sendError(kmsg.channel, `ERROR`)
                }//Add points
                let lana_points = new KINGMAN_POINTS({ member: member, Client: client, Guild: kmsg.guild , support: kmsg.member, type: "Add" });
                let data = await lana_points.addPoints(Number(args[1]), args.slice(2).join(` `))
                manager.SendDone(kmsg.channel, `${lana_points.admin.displayName} added \`${args[1]}\` Points to ${lana_points.member}`);
            })
            .catch(async(e)=> {
                return await manager.sendError(kmsg.channel, e.message)
            })
        }
    },
    slachcmd: {
        name: `add`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to add points",
        category: `lana`,
        examples: ["@KINGMAN 5"],
        usage: ["<Member> <Points>"],
        options: [
            {
              type: 6,
              name: "member",
              description: "member that you wanna to add points to him",
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
            let member = interaction.options.getUser("member", true);
            let points = interaction.options.getNumber("number_of_points", true);
            try{
                let lana_points = new KINGMAN_POINTS({Client: client, Guild: interaction.guild, member: interaction.guild.members.cache.get(member.id), support: interaction.member, type: "Add"});
                let data = await lana_points.addPoints(points, ``)
                interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            title: `${`**✔️ Succeed**`}`,
                            author: {
                                name: `${interaction.user.username}`
                            },
                            description: `**${lana_points.admin.displayName} added \`${String(points)}\` Points to ${lana_points.member}**`,
                            footer: {
                                text: `${client.user.username} Power By KMCodes`
                            },
                            color: `#ffaa00`
                        })
                    ]
                })
            }catch(e){
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
