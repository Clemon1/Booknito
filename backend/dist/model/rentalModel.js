"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const rentalSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    perks: [
        {
            type: String,
            required: true,
        },
    ],
    ratings: [
        {
            type: Number,
            default: 0,
            Max: 5,
        },
    ],
    photos: {
        type: String,
    },
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
const rentals = (0, mongoose_1.model)("rentals", rentalSchema);
exports.default = rentals;
