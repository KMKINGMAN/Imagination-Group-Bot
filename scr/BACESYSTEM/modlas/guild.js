import pkgs from "mongoose";
const { model, Schema } = pkgs;
let data = new Schema({
    guild_id: {
        type: String,
        required: true
    },
    award: {
        type: [{
            role: String,
            points: Number,
            users: [String]
        }]
    },
    logs: {
        type: String
    }
})
let r = model(`lena guild data`, data);
let types = {
    guild_id: String,
    award: [ {role: String, points: Number, users: [String]} ],
    logs: String
}
export default r;
export { r as KINGMAN_GUILDS, types } 