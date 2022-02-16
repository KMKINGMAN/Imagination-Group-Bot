import { Guild } from "discord.js";
import { KINGMAN_GUILDS, types } from "../../modlas/guild.js";
class LanaGuid{
    /**
     * @param {{ Guild: Guild }} ops 
     */
    constructor(ops){
        this.guild = ops.Guild;
        this.filter = { guild_id: ops.Guild.id };
    }
    /**
     * @returns {types}
     */
    async GetData(){
        let data = await KINGMAN_GUILDS.findOne(this.filter);
        if(!data){
            data = await KINGMAN_GUILDS.create(this.filter);
        }
        return data;
    }
    /**
     * @param {String} Channel_id 
     * @returns {types}
     */
    async setLog(Channel_id){
        let data = await KINGMAN_GUILDS.findOne(this.filter);
        if(!data){
            data = await KINGMAN_GUILDS.create(this.filter);
        }
        data.logs = Channel_id;
        data.save()
        return this.TypeGen(data)
    }
    /**
     * @param {String} role 
     * @param {Number} points 
     * @returns {types}
     */
    async setAward(role, points){
        let temp_data = await KINGMAN_GUILDS.findOne(this.filter);
        if(!temp_data){
            temp_data = await KINGMAN_GUILDS.create(this.filter);
        }
        let data = this.TypeGen(temp_data);
        if(data.award.filter(p => p.points === points && p.role === role).length === 2){
            return data;
        } else {
            data.award.push({
                points: points,
                role: role
            });
            temp_data.award = data.award;
            await temp_data.save();
            return temp_data;
        }
    }
    /**
     * @param {String} points 
     * @returns {types}
     */
    async removeAward(points){
        let temp_data = await KINGMAN_GUILDS.findOne(this.filter);
        if(!temp_data){
            temp_data = await KINGMAN_GUILDS.create(this.filter);
        }
        let data = this.TypeGen(temp_data).award.filter(d=> d.points !== points)
        temp_data.award = data;
        await temp_data.save();
        return temp_data;
    }
    /**
     * @returns {{role: String, points: Number,users: [String]}[]}
     */
    async awards(){
        let temp_data = await KINGMAN_GUILDS.findOne(this.filter);
        if(!temp_data){
            temp_data = await KINGMAN_GUILDS.create(this.filter);
        }
        return temp_data.award;
    };
    /**
     * @param {Number} points 
     * @param {String} userid 
     * @returns {types}
     */
    async add_user(points, userid){
        let temp_data = await KINGMAN_GUILDS.findOne(this.filter);
        if(!temp_data){
            temp_data = await KINGMAN_GUILDS.create(this.filter);
        }
        let to_add = this.TypeGen(temp_data).award.filter(d => d.points === points)[0];
        to_add.users.push(userid);
        let data_to_fix = this.TypeGen(temp_data).award.filter(d => d.points !== points);
        data_to_fix.push(to_add);
        temp_data = await KINGMAN_GUILDS.findOneAndUpdate(this.filter, {
            $set: {
                award: data_to_fix
            }
        });
        return temp_data
    }
    /**
     * @param {Number} points 
     * @param {String} userid 
     * @returns {types}
     */
    async remove_user(points, userid){
        let temp_data = await KINGMAN_GUILDS.findOne(this.filter);
        if(!temp_data){
            temp_data = await KINGMAN_GUILDS.create(this.filter);
        }
        let to_add = this.TypeGen(temp_data).award.filter(d => d.points === points)[0];
        to_add.users = to_add.users.filter(s => s!== userid);
        let data_to_fix = this.TypeGen(temp_data).award.filter(d => d.points !== points);
        data_to_fix.push(to_add);
        temp_data = await KINGMAN_GUILDS.findOneAndUpdate(this.filter, {
            $set: {
                award: data_to_fix
            }
        });
        return temp_data
    }
    /**
     * @param {Number} points 
     * @param {String} userid 
     * @returns {types}
     */
    async clear(){
        let temp_data = await KINGMAN_GUILDS.findOne(this.filter);
        if(!temp_data){
            temp_data = await KINGMAN_GUILDS.create(this.filter);
        }
        temp_data.award = [];
        await temp_data.save();
        return temp_data;
    }
    /**
     * @returns {types}
     */
    TypeGen(Data){
        return Data
    }
}
export { LanaGuid as KINGMAN_GUILDS_DATA }
