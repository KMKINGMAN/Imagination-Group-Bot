import pkgs from "mongoose";
const { model, Schema } = pkgs;
let data = new Schema({
    guild_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
    },
    points: {
        type: Number,
        default: 0
    }
})
export default model(`lena point system`, data);