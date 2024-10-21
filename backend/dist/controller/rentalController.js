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
exports.searchRentals = exports.roomRecommendation = exports.bookmarkRentalHomes = exports.createRentalHomes = exports.viewSuggestHome = exports.viewSingleHome = exports.viewHome = void 0;
const rentalModel_1 = __importDefault(require("../model/rentalModel"));
const usersModel_1 = __importDefault(require("../model/usersModel"));
const bookingModel_1 = __importDefault(require("../model/bookingModel"));
const recommendAlgo_1 = require("../middleware/recommendAlgo");
const cloudinary_1 = __importDefault(require("../middleware/cloudinary"));
// View all rooms
const viewHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        let findHome;
        search === ""
            ? (findHome = yield rentalModel_1.default.find())
            : (findHome = yield rentalModel_1.default.find({
                $or: [
                    { address: { $regex: search, $options: "i" } },
                    { title: { $regex: search, $options: "i" } },
                    {
                        checkIN: { $regex: search, $options: "i" },
                    },
                    { checkOut: { $regex: search, $options: "i" } },
                ],
            }));
        const newRentals = findHome.map((home) => {
            var _a, _b;
            const averageRatingLenght = (_a = home.ratings) === null || _a === void 0 ? void 0 : _a.length;
            let averageRating = 0;
            if (averageRating > 0) {
                const totalRating = (_b = home.ratings) === null || _b === void 0 ? void 0 : _b.reduce((acc, rating) => acc + rating, 0);
                averageRating = totalRating / averageRatingLenght;
            }
            return {
                _id: home._id,
                title: home.title,
                description: home.description,
                address: home.address,
                ratings: averageRating,
                photos: home.photos,
                perks: home.perks,
                price: home.price,
                maxGuest: home.maxGuest,
            };
        });
        res.status(200).json(newRentals);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.viewHome = viewHome;
// View Single Rental homes
const viewSingleHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const singleHome = yield rentalModel_1.default.findById(id);
        let averageRating = 0;
        const totalLenght = (_a = singleHome === null || singleHome === void 0 ? void 0 : singleHome.ratings) === null || _a === void 0 ? void 0 : _a.length;
        if (averageRating > 0) {
            const totalRatings = (_b = singleHome === null || singleHome === void 0 ? void 0 : singleHome.ratings) === null || _b === void 0 ? void 0 : _b.reduce((acc, rating) => acc + rating, 0);
            averageRating = totalRatings / totalLenght;
        }
        res.status(200).json({ singleHome, rating: averageRating });
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.viewSingleHome = viewSingleHome;
// Recommendation Algorithm for users based on saved Previous bookings and Bookmarked homes
const viewSuggestHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const recommend = (0, recommendAlgo_1.getCollaborativeFilteringRecommendations)(userId);
        res.status(200).json(recommend);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.viewSuggestHome = viewSuggestHome;
// Create rental home
const createRentalHomes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { title, description, address, perks, price, maxGuest } = req.body;
        const photo = (_c = req.file) === null || _c === void 0 ? void 0 : _c.path;
        const cloudUpload = yield cloudinary_1.default.uploader.upload(photo);
        const rntHome = new rentalModel_1.default({
            title,
            description,
            address,
            photos: cloudUpload.url,
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
exports.createRentalHomes = createRentalHomes;
// Bookmark rental home
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
        const singleHome = yield rentalModel_1.default.findById(productId);
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
// Room Recommendation
// export const roomRecommendation = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     // Retrieve the user's bookmarked rooms and bookings
//     const user = await users.findById(userId).populate("bookmark").exec();
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const bookmarkedRoomIds = user.bookmark.map((room: any) =>
//       room._id.toString(),
//     );
//     // Retrieve the user's booked rooms
//     const userBookings = await bookings.find({ userId });
//     const bookedRoomIds = userBookings.map((booking: any) =>
//       booking.place.toString(),
//     );
//     // Filter out the rentals that are in the bookmark but not booked
//     const recommendations = bookmarkedRoomIds.filter(
//       (roomId: string) => !bookedRoomIds.includes(roomId),
//     );
//     if (recommendations.length === 0) {
//       return res.json({ message: "No recommendations available" });
//     }
//     // Retrieve rental details for the recommended rooms
//     const recommendedRoomDetails = await rentals.find({
//       _id: { $in: recommendations },
//     });
//     // Process and format the rental details as needed
//     const refreshedProducts = recommendedRoomDetails.map((newProduct: any) => {
//       const ratingLength = newProduct.ratings.length;
//       let averageRating = 0;
//       if (ratingLength > 0) {
//         const totalRating = newProduct.ratings.reduce(
//           (rating: any, total: any) => rating + total,
//           0,
//         );
//         averageRating = totalRating / ratingLength;
//       }
//       return {
//         _id: newProduct._id,
//         title: newProduct.title,
//         description: newProduct.description,
//         address: newProduct.address,
//         ratings: averageRating,
//         photos: newProduct.photos,
//         perks: newProduct.perks,
//         price: newProduct.price,
//         maxGuest: newProduct.maxGuest,
//       };
//     });
//     res.status(200).json(refreshedProducts);
//   } catch (err: any) {
//     res.status(500).json(err.message);
//   }
// };
// export const roomRecommendation = async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.userId;
//     // Get user's bookmarked rentals
//     const user = await users.findById(userId).populate("bookmark");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const userBookmarks = user.bookmark.map((bookmark) => bookmark._id);
//     // Find users who have bookmarked similar rentals
//     const similarUsersByBookmarks = await users.find({
//       bookmark: { $in: userBookmarks },
//       _id: { $ne: userId },
//     });
//     // Find users who have similar bookings
//     const userBookings = await bookings.find({ userId });
//     const similarUsersByBookings = await users.find({
//       _id: { $ne: userId },
//       bookmark: { $in: userBookings.map((booking) => booking.place) },
//     });
//     // Get rental recommendations from both similar bookmarks and similar bookings
//     const recommendedRentals = await rentals.find({
//       _id: {
//         $in: [
//           ...similarUsersByBookmarks.flatMap((user) => user.bookmark),
//           ...similarUsersByBookings.flatMap((user) => user.bookmark),
//         ],
//       },
//     });
//     // Filter out rentals that the user has already booked or bookmarked
//     const filteredRecommendations = recommendedRentals.filter(
//       (rental) =>
//         !userBookmarks.includes(rental._id) &&
//         !userBookings.some((booking) => booking.place.equals(rental._id)),
//     );
//     if (!filteredRecommendations) {
//       return res.status(200).json("No recommendations found");
//     }
//     res.status(200).json(filteredRecommendations);
//   } catch (error) {
//     res.status(500).json({ error: "Could not fetch recommendations." });
//   }
// };
const roomRecommendation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const userBookings = yield bookingModel_1.default.find({ userId }).populate("place");
        const userRentalIds = userBookings.map((booking) => booking.place._id);
        const similarBookings = yield bookingModel_1.default
            .find({
            place: { $in: userRentalIds },
            userId: { $ne: userId },
        })
            .populate("place");
        const similarRentalIds = similarBookings.map((booking) => booking.place._id);
        const recommendedRentals = yield bookingModel_1.default
            .find({
            place: { $in: similarRentalIds },
            userId: { $ne: userId },
        })
            .populate("place")
            .limit(2)
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).json(recommendedRentals);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error recommending rentals", error: error.message });
    }
});
exports.roomRecommendation = roomRecommendation;
// Recommend rentals based on similar bookings
// export const roomRecommendation = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   const { userId } = req.params;
//   try {
//     const userBookings = await bookings.find({ userId }).populate("place");
//     const userRentalIds = userBookings.map((booking) => booking.place._id);
//     const similarBookings = await bookings
//       .find({
//         place: { $in: userRentalIds },
//         userId: { $ne: userId },
//       })
//       .populate("place");
//     const similarRentalIds = similarBookings.map(
//       (booking) => booking.place._id,
//     );
//     const recommendedRentals = await bookings
//       .find({
//         place: { $in: similarRentalIds },
//         userId: { $ne: userId },
//       })
//       .populate("place");
//     res.status(200).json(recommendedRentals);
//   } catch (error: any) {
//     res
//       .status(500)
//       .json({ message: "Error recommending rentals", error: error.message });
//   }
// };
const searchRentals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        const homes = yield rentalModel_1.default.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { address: { $regex: search, $options: "i" } },
            ],
        });
        const newRentals = homes.map((home) => {
            var _a, _b;
            const averageRatingLenght = (_a = home.ratings) === null || _a === void 0 ? void 0 : _a.length;
            let averageRating = 0;
            if (averageRating > 0) {
                const totalRating = (_b = home.ratings) === null || _b === void 0 ? void 0 : _b.reduce((acc, rating) => acc + rating, 0);
                averageRating = totalRating / averageRatingLenght;
            }
            return {
                _id: home._id,
                title: home.title,
                description: home.description,
                address: home.address,
                ratings: averageRating,
                photos: home.photos,
                perks: home.perks,
                price: home.price,
                maxGuest: home.maxGuest,
            };
        });
        res.status(200).json(newRentals);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.searchRentals = searchRentals;
// Update existing rental home
// export const updateRentalHomes = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { title, description, address, perks, price, maxGuest } = req.body;
//     const photo: any = req.file?.path;
//     // const cloudUpload = await cloudinary.upload(photo);
//     const hotel = {
//       title,
//       description,
//       address,
//       perks,
//       price,
//       maxGuest,
//     };
//     // if (req.file?.path) {
//     //   hotel.photos : photo.,
//     // }
//     const updateHome = await rentals.findByIdAndUpdate(
//       id,
//       { $set: hotel },
//       { new: true },
//     );
//     res.status(200).json(updateHome);
//   } catch (err: any) {
//     res.status(500).json(err.message);
//   }
// };
