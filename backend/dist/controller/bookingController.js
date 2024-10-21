"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBookings = exports.updateBookings = exports.createBookings = exports.viewSingleBooking = exports.viewUserBookings = exports.getTotalRevenue = exports.viewAllBookings = void 0;
const dotenv = __importStar(require("dotenv"));
const bookingModel_1 = __importDefault(require("../model/bookingModel"));
const roomModel_1 = __importDefault(require("../model/roomModel"));
dotenv.config();
// View all bookings
const viewAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookings = yield bookingModel_1.default
            .find()
            .populate("roomId")
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).json(allBookings);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.viewAllBookings = viewAllBookings;
// total revenue for all successful bookings
const getTotalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingTotal = yield bookingModel_1.default.find({
            status: ["active", "expired"],
        });
        const totalRevenue = bookingTotal.reduce((sum, booking) => sum + booking.totalAmount, 0);
        res.status(200).json({ total: totalRevenue });
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.getTotalRevenue = getTotalRevenue;
//View user bookings
const viewUserBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        const userBookings = yield bookingModel_1.default
            .find({ userId })
            .populate("place")
            .exec();
        res.status(200).json(userBookings);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.viewUserBookings = viewUserBookings;
// View single Booking
const viewSingleBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const singleBooking = yield bookingModel_1.default.findById(id).populate("roomId").exec();
        res.status(200).json(singleBooking);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.viewSingleBooking = viewSingleBooking;
// Create a new Booking
const createBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { guestName, gender, address, occupation, phoneNumber, nationality, passportNumber, adults, children, roomId, checkIN, discountAmount, refundAmount, checkOUT, numOfGuest, email, } = req.body;
        if (!guestName ||
            !gender ||
            !address ||
            !occupation ||
            !phoneNumber ||
            !nationality ||
            !passportNumber ||
            !roomId ||
            !checkIN ||
            !checkOUT ||
            !numOfGuest) {
            return res.status(401).json("Details must not be empty");
        }
        const existingBooking = yield bookingModel_1.default.findOne({
            roomId,
            $or: [
                {
                    $and: [
                        { checkIN: { $lt: checkOUT } },
                        { checkOUT: { $gt: checkIN } },
                    ],
                },
            ],
        });
        if (existingBooking) {
            return res
                .status(401)
                .json("Sorry, the room is already booked for the specified time range.");
        }
        const findRoom = yield roomModel_1.default.findById(roomId);
        if (!findRoom) {
            return res.status(401).json("Room not found");
        }
        const setBooking = new bookingModel_1.default({
            guestName,
            gender,
            address,
            occupation,
            phoneNumber,
            nationality,
            passportNumber,
            roomId,
            price: findRoom === null || findRoom === void 0 ? void 0 : findRoom.price,
            email,
            discountAmount,
            refundAmount,
            checkIN,
            checkOUT,
            numOfGuest,
            adults,
            children,
        });
        const createBookingsResponse = yield setBooking.save();
        res.status(201).json(createBookingsResponse);
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json(err.message);
    }
});
exports.createBookings = createBookings;
const updateBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { price, discountAmount, refundAmount, checkOUT } = req.body;
        const totalPrice = price - discountAmount - refundAmount;
        const body = {
            price,
            discountAmount,
            refundAmount,
            checkOUT: new Date(),
            totalAmount: totalPrice,
        };
        console.log("totalPrice", totalPrice);
        const updatedBooking = yield bookingModel_1.default.findByIdAndUpdate(id, {
            $set: body,
        }, { new: true });
        res.status(200).json(updatedBooking);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.updateBookings = updateBookings;
// Update & Cancel booking
const cancelBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.cancelBookings = cancelBookings;
