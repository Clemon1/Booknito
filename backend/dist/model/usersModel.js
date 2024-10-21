"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Defining database schema
const userSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    phoneNumber: String,
    avartar: String,
    bookmark: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "rentals",
        },
    ],
    role: {
        type: String,
        enum: [
            "Super-Admin",
            "Manager",
            "Receptionist",
            "Security",
            "Cleaner",
            "User",
        ],
        default: "Super-Admin",
    },
}, {
    timestamps: true,
});
const users = (0, mongoose_1.model)("users", userSchema);
exports.default = users;
