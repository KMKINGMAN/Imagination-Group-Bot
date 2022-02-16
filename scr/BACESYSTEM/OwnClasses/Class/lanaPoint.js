import { Guild, GuildMember } from "discord.js";
import { Client } from "../../KMCodes.js";
import { default as Points } from "../../modlas/point.js";
class Lana_Points{
    /**
     * @param {{ member: GuildMember, support: GuildMember, type: `Add` | `Remove` | `Clear`| `Set`, Guild: Guild, Client: Client }} ops 
     */
    constructor(ops){
        this.member = ops.member;
        this.admin = ops.support;
        this.guild = ops.Guild;
        this.type = ops.type;
        this.filter = { guild_id: ops.Guild.id, user_id: ops.member.id };
        this.client = ops.Client;
    }
    /**
     * 
     * @returns {{guild_id: string, user_id: string, points: number}} 
     */
    async GetPoint(){
        let data = await Points.findOne(this.filter);
        if(!data){
            data = await Points.create(this.filter)
        }
        return data;
    }
    /**
     * 
     * @returns {{guild_id: string, user_id: string, points: number}[]}
     */
    async GetGuildPoints(){
        let data = await Points.find({guild_id: this.guild.id});
        return data;
    }
    /**
     * to add points to the target
     * @param {Number} points 
     * @param {String} reason 
     * @returns {{guild_id: string, user_id: string, points: number}}
     */
    async addPoints(points, reason){
        let data = await Points.findOne(this.filter);
        if(!data){
            data = await Points.create(this.filter)
        }
        data.points = data.points + points
        await data.save();
        this.client.emit(`kmcodesPoints${this.type}`, { General: this, DB: data, reason: reason ? reason : reason })
        return data;
    }
    /**
     * to remove points to the target
     * @param {Number} points 
     * @param {String} reason 
     * @returns {{ guild_id: string, user_id: string, points: number }}
     */
    async removePoints(points, reason){
        let data = await Points.findOne(this.filter);
        if(!data){
            data = await Points.create(this.filter)
        }
        data.points = data.points - points
        await data.save();
        this.client.emit(`kmcodesPoints${this.type}`, { General: this, DB: data, reason: reason ? reason : reason })
        return data;
    } 
    /**
    * to set target points
    * @param {Number} points 
    * @param {String} reason 
    * @returns {{ guild_id: string, user_id: string, points: number }}
    */
    async setPoints(points, reason){
        let data = await Points.findOne(this.filter);
        if(!data){
            data = await Points.create(this.filter)
        }
        data.points = points
        await data.save();
        this.client.emit(`kmcodesPoints${this.type}`, { General: this, DB: data, reason: reason ? reason : reason })
        return data;
    }
    /**
     * to clear points from the target
     * @param {String} reason 
     * @returns {{ guild_id: string, user_id: string, points: number }}
     */
    async clearPoints(reason){
        let data = await Points.findOne(this.filter);
        if(!data){
            data = await Points.create(this.filter)
        }
        data.points = 0;
        await data.save();
        this.client.emit(`kmcodesPoints${this.type}`, { General: this, DB: data, reason: reason ? reason : reason })
        return data;
    }
    /**
     * @returns {String}
     */
    get admin_name(){
        return this.admin.displayName
    }
    /**
     * @returns {String}
     */
    get target_name(){
        return this.member.displayName
    }
}
export { Lana_Points as KINGMAN_POINTS }