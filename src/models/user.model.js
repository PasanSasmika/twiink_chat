import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        emai: {
            type: String,
            required: true,
            unique: true
        },

        fullName: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        profilePic: {
            type: String,
          default: "",
        },
    },

    {timestamps: true }
);

const User = mongoose.model("User");

export default User;