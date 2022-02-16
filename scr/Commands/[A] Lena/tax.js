import { Client } from "../../BACESYSTEM/KMCodes.js";
import { Message, CommandInteraction, MessageEmbed, MessageButton } from "discord.js";
import { default as Data} from "../../BACESYSTEM/modlas/point.js";
import { all } from "../../BACESYSTEM/OwnClasses/Class/kingman task.js";
export default {
    general: {
        name: `tax`,
        permissions:{
            me: "",
            bot: ""
        },
        description: "to get probot tax",
        category: `lana`,
        examples: ["1m 25"],
        usage: ["<amout> [dis]"],
        /**
         * 
         * @param {Client} client 
         * @param {Message} kmsg 
         * @param {Array} args 
         * @param {import("../../BACESYSTEM/OwnClasses/Class/message.js").default} manager
         */
        run: async(client, kmsg, args, manager)=>{
            if(!args[0]) return;
            let nisba;
            if(args[1] && isNaN(args[1])){
                nisba = 100
            } else if(args[1] && !isNaN(args[1])){
                nisba = 100 - Number(args[1])
            } else {
                nisba = 100
            }
            await all(args[0], nisba)
            .then((d)=> {
                kmsg.channel.send({
                    embeds: [
                        new MessageEmbed({ title: `ProBot Tax Calculator`, color: `RED`, fields: [
                        {name: `amout`, value: `${d.amout}`},
                        {name: `tax`, value: `${d.bot_tax}`},
                        {name: `full price`, value: `${d.without_support_amout}`},
                    ], footer: {
                        text: `KMCodes`
                        }})
                    ]
                })
            })
            .catch(e => {
                kmsg.channel.send({content: e.message})
            })
        }
    },
    slachcmd: {
        name: `tax`,
        permissions:{
            me: "",
            bot: ""
        },
        description: "tax",
        category: ``,
        examples: [""],
        usage: [""],
        options: [
          {
            type: 3,
            name: "amout",
            description: "credit amout like 1m",
            required: true
          },
          {
            type: 10,
            name: "discount",
            description: "like 25"
          }
        ],
        /**
         * 
         * @param {Client} client 
         * @param {CommandInteraction} interaction 
         */
        run: async(client, interaction)=> {
            let amout = interaction.options.getString(`amout`, true);
            let dis = interaction.options.getNumber(`discount`, false);
            if(!dis){
                dis = 100
            }
            await all(amout, dis)
            .then((d)=> {
                interaction.reply({
                    embeds: [
                        new MessageEmbed({ title: `ProBot Tax Calculator`, color: `RED`, fields: [
                        {name: `amout`, value: `${d.amout}`},
                        {name: `tax`, value: `${d.bot_tax}`},
                        {name: `full price`, value: `${d.without_support_amout}`},
                    ], footer: {
                        text: `KMCodes`
                        }})
                    ]
                })
            }).catch(e=> {
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
            })        
        }
    }
}