import { Client } from "../../BACESYSTEM/KMCodes.js";
import { Message, CommandInteraction, MessageEmbed, MessageButton } from "discord.js";
import { default as lana_data} from "../../BACESYSTEM/modlas/point.js";
import { KINGMAN_POINTS } from "../../BACESYSTEM/OwnClasses/Class/lanaPoint.js";
export default {
    general: {
        name: `set_name`,
        permissions:{
            me: "",
            bot: ""
        },
        description: "to change bot name",
        category: `lana`,
        examples: ["kingman"],
        usage: ["name"],
        /**
         * 
         * @param {Client} client 
         * @param {Message} kmsg 
         * @param {Array} args 
         * @param {import("../../BACESYSTEM/OwnClasses/Class/message.js").default} manager
         */
        run: async(client, kmsg, args, manager)=>{
            if(!args[0]){
                manager.sendError(kmsg.channel, `Bot Name Missing`)
            }
            client.user.setUsername(args.join(" ")).then(d=> manager.SendDone(kmsg.channel, `Done Change Client Name`))
            .catch(e => manager.sendError((kmsg.channel, e.message)))
        }
    },
    slachcmd: {
        name: `set_name`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to change bot name",
        category: `lana`,
        examples: ["kingman"],
        usage: ["name"],
        /**
         * 
         * @param {Client} client 
         * @param {CommandInteraction} interaction 
         */
        run: async(client, interaction)=> {
            try {
                
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
