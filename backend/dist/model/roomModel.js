"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    roomNumber: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    perks: [
        {
            type: String,
        },
    ],
    roomType: {
        type: String,
        enum: [
            "Standard Room",
            "Deluxe Room",
            "Executive Room",
            "Junior Suite",
            "Suite",
            "Presidential Suite",
            "Penthouse Suite",
        ],
        default: "Standard Room",
    },
    photos: [
        {
            type: String,
        },
    ],
    price: {
        type: Number,
        required: true,
    },
    maxGuest: {
        type: Number,
        default: 1,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const rooms = (0, mongoose_1.model)("rooms", roomSchema);
exports.default = rooms;
