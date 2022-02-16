import { Client } from "../../BACESYSTEM/KMCodes.js";
export default {
    name: 'ready',
    /**
     * 
     * @param {Client} client 
     */
    run: async(client)=> {
        client.pkgs.mongoose.connect(client.config.mongodb)
        .then((d)=>{
            console.log(client.pkgs.chalk.red(client.pkgs.figlet.textSync(`KMCodes DB`)));
        })
        .catch((e)=>{
            console.log(client.pkgs.chalk.red(client.pkgs.figlet.textSync(`DB ERROR`)));
        })
    }
}