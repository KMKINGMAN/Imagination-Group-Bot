import { Client } from "../../BACESYSTEM/KMCodes.js";
import { Message, CommandInteraction, MessageEmbed, MessageButton } from "discord.js";
import { KINGMAN_GUILDS_DATA } from "../../BACESYSTEM/OwnClasses/Class/lanaGuild.js";
export default {
    general: {
        name: `awards`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to view the list of prizes",
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
            let Guild_Data = new KINGMAN_GUILDS_DATA({Guild: kmsg.guild});
            let data = await Guild_Data.awards();
            manager.SendDone(kmsg.channel, data.map(o => `Points: \`${o.points}\` => <@&${o.role}>`).join(`\n`))
        }
    },
    slachcmd: {
        name: `awards`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to view the list of prizes",
        category: `lana`,
        examples: [""],
        usage: [""],
        /**
         * 
         * @param {Client} client 
         * @param {CommandInteraction} interaction 
         */
        run: async(client, interaction)=> {
            let Guild_Data = new KINGMAN_GUILDS_DATA({Guild: interaction.guild});
            let data = await Guild_Data.awards();
            interaction.reply({
                embeds: [
                    new MessageEmbed({
                        title: `${`**✔️ Succeed**`}`,
                        author: {
                            name: `${interaction.user.username}`
                        },
                        description: `**${data.map(o => `Points: \`${o.points}\` => <@&${o.role}>`).join(`\n`)}**`,
                        footer: {
                            text: `${client.user.username} Power By KMCodes`
                        },
                        color: `#ffaa00`
                    })
                ]
            })
        }
    }
}
