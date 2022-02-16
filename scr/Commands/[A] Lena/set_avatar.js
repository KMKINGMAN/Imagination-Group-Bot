import { Client } from "../../BACESYSTEM/KMCodes.js";
import { Message, CommandInteraction, MessageEmbed, MessageButton } from "discord.js";
export default {
    general: {
        name: `set_avatar`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "to change bot image",
        category: `lana`,
        examples: ["link"],
        usage: ["link"],
        /**
         * 
         * @param {Client} client 
         * @param {Message} kmsg 
         * @param {Array} args 
         * @param {import("../../BACESYSTEM/OwnClasses/Class/message.js").default} manager
         */
        run: async(client, kmsg, args, manager)=>{
            try {
                if(!args[0]){
                    manager.sendError(kmsg.channel, `image link?`)
                }
                if(!args[0].match('(https?:\/\/.*\.(?:png|jpg|gif))')){
                    manager.sendError(kmsg.channel, `image?`)
                }
                client.user.setAvatar(args[0]);   
            } catch (error) {
                manager.sendError(kmsg.channel, `The link is invalid`)
            }
        }
    },
    slachcmd: {
        name: `set_avatar`,
        permissions:{
            me: "ADMINISTRATOR",
            bot: "ADMINISTRATOR"
        },
        description: "add-point",
        category: ``,
        examples: [""],
        usage: [""],
        options: [
          {
            type: 3,
            name: "link",
            description: "avatar link",
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
                let data = interaction.options.getString("link", true);
                if(!data.match('(https?:\/\/.*\.(?:png|jpg|gif))')){
                    interaction.reply({content:'image??'})
                }
                client.user.setAvatar(data);
                interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            title: `**✔️ Succeed**`,
                            author: {
                                name: `${interaction.user.username}`
                            },
                            description: `**Bot avatar has been changed**`,
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
                            description: `**The link is invalid**`,
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
