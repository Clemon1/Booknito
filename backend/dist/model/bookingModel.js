"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    guestName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
        required: true,
    },
    address: String,
    occupation: String,
    phoneNumber: String,
    nationality: String,
    passportNumber: String,
    roomId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "rooms",
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountAmount: {
        type: Number,
        default: 0,
    },
    refundAmount: {
        type: Number,
        default: 0,
    },
    totalAmount: {
        type: Number,
        default: 0,
    },
    checkIN: {
        type: Date,
        required: true,
    },
    checkOUT: {
        type: Date,
        required: true,
    },
    numOfGuest: {
        type: Number,
        required: true,
    },
    adults: {
        type: Number,
        default: 1,
    },
    children: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["active", "expired", "cancelled"],
        default: "active",
    },
}, {
    timestamps: true,
});
//Calculate the main total
bookingSchema.pre("save", function (next) {
    this.totalAmount = this.price - this.discountAmount - this.refundAmount;
    next();
});
const bookings = (0, mongoose_1.model)("bookings", bookingSchema);
exports.default = bookings;
