"use strict";
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
exports.deleteRoom = exports.updateRoom = exports.searchRoom = exports.bookmarkRentalHomes = exports.createRoom = exports.getRoomAvailability = exports.viewSingleHome = exports.viewHome = void 0;
const roomModel_1 = __importDefault(require("../model/roomModel"));
const usersModel_1 = __importDefault(require("../model/usersModel"));
const bookingModel_1 = __importDefault(require("../model/bookingModel"));
const date_fns_1 = require("date-fns");
// View all rooms
const viewHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        let findRoom;
        search === ""
            ? (findRoom = yield roomModel_1.default
                .find({ isDeleted: false })
                .sort({ createdAt: -1 }))
            : (findRoom = yield roomModel_1.default
                .find({
                isDeleted: false,
                $or: [
                    { roomNumber: { $regex: search, $options: "i" } },
                    { roomType: { $regex: search, $options: "i" } },
                ],
            })
                .sort({ createdAt: -1 }));
        res.status(200).json(findRoom);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.viewHome = viewHome;
// View Single Room
const viewSingleHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).json("Not Found");
        }
        const singleHome = yield roomModel_1.default.findById(id);
        if ((singleHome === null || singleHome === void 0 ? void 0 : singleHome.isDeleted) === false) {
            res.status(200).json(singleHome);
        }
        else {
            res.status(404).json("Room has been deleted by Admin");
        }
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.viewSingleHome = viewSingleHome;
const getRoomAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Convert Date.now() to a JavaScript Date object and normalize it
        const currentDate = new Date(Date.now());
        currentDate.setHours(0, 0, 0, 0); // Normalize the current date to start of the day
        const startofToday = (0, date_fns_1.startOfDay)(currentDate); // Start of today (midnight)
        const endofToday = (0, date_fns_1.endOfDay)(currentDate);
        // Fetch all bookings that overlap with today
        const bookingsToday = yield bookingModel_1.default
            .find({
            $or: [
                { checkIN: { $gte: startofToday, $lte: endofToday } },
                { checkOUT: { $gte: startofToday, $lte: endofToday } },
                { checkIN: { $lte: startofToday }, checkOUT: { $gte: endofToday } }, // spans across today
            ],
        })
            .select("roomId")
            .lean();
        // Extract room IDs from bookings
        const bookedRoomIds = bookingsToday.map((booking) => booking.roomId);
        // Find all rooms that are NOT in the booked room IDs
        const vacantRooms = yield roomModel_1.default.find({
            _id: { $nin: bookedRoomIds },
        });
        const bookedRooms = yield roomModel_1.default.find({
            _id: { $in: bookedRoomIds },
        });
        res.status(200).json({
            date: (0, date_fns_1.startOfDay)(currentDate),
            vacantRooms,
            bookedRooms,
        });
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.getRoomAvailability = getRoomAvailability;
// Create Room
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomNumber, roomType, description, perks, price, maxGuest } = req.body;
        if (!roomNumber ||
            !roomType ||
            !description ||
            !perks ||
            !price ||
            !maxGuest) {
            return res.status(401).json("Fields must be not be empty ");
        }
        //@ts-ignore
        const photo = 
        //@ts-ignore
        req.files["photos"] && req.files["photos"].map((file) => file.path);
        console.log(req.body);
        const rntHome = new roomModel_1.default({
            roomNumber,
            description,
            photos: photo,
            roomType,
            perks,
            price,
            maxGuest,
        });
        const newHome = yield rntHome.save();
        res.status(200).json(newHome);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.createRoom = createRoom;
// Bookmark room
const bookmarkRentalHomes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { productId } = req.params;
        const activeUser = yield usersModel_1.default.findById(id);
        // checking id user exist
        if (!activeUser) {
            return res.status(404).json("Please login to add to wishlist");
        }
        // checking if room exists in the bookmark
        const singleHome = yield roomModel_1.default.findById(productId);
        if (!singleHome) {
            return res.status(404).json("No room found");
        }
        // checking if room already exist in wishlist
        if (activeUser === null || activeUser === void 0 ? void 0 : activeUser.bookmark.includes(singleHome === null || singleHome === void 0 ? void 0 : singleHome.id)) {
            yield usersModel_1.default.findByIdAndUpdate(id, { $pull: { bookmark: productId } }, { new: true });
            res.status(400).json("Room removed from wishlist");
        }
        else {
            yield usersModel_1.default.findByIdAndUpdate(id, { $push: { bookmark: productId } }, { new: true });
            res.status(400).json("Room added to wishlist");
        }
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.bookmarkRentalHomes = bookmarkRentalHomes;
const searchRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        const searchRooms = yield roomModel_1.default.find({
            $or: [
                { roomNumber: { $regex: search, $options: "i" } },
                { roomType: { $regex: search, $options: "i" } },
            ],
        });
        res.status(200).json(searchRooms);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.searchRoom = searchRoom;
// Update existing rental home
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { roomNumber, description, address, perks, price, maxGuest } = req.body;
        //@ts-ignore
        const photo = 
        //@ts-ignore
        req.files["photos"] && req.files["photos"].map((file) => file.path);
        // const cloudUpload = await cloudinary.upload(photo);
        const hotel = {
            roomNumber,
            description,
            address,
            photos: photo,
            perks,
            price,
            maxGuest,
        };
        // if (req.files['photos'].path) {
        //   hotel.photos: photo,
        // }
        const updateHome = yield roomModel_1.default.findByIdAndUpdate(id, { $set: hotel }, { new: true });
        res.status(200).json(updateHome);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.updateRoom = updateRoom;
// soft delete to remove rooms
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const removeRoom = roomModel_1.default.findByIdAndUpdate(id, {
            $set: { isDeleted: true },
        });
        res.status(200).json(removeRoom);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.deleteRoom = deleteRoom;
