import rentals from "../model/roomModel";
import bookings from "../model/bookingModel";

// Function to get collaborative filtering recommendations for a user
export async function getCollaborativeFilteringRecommendations(userId: any) {
  try {
    // Find the bookings made by the user
    const userBookings = await bookings.find({ userId }).exec();

    // Extract the rental IDs from the user's bookings
    const rentalIds = userBookings.map((booking) => booking.place);

    // Find rentals booked by users who booked the same rentals
    const similarUserBookings = await bookings
      .find({
        place: { $in: rentalIds },
        userId: { $ne: userId }, // Exclude the current user
      })
      .exec();

    // Extract rental IDs from bookings of similar users
    const similarRentalIds = similarUserBookings.map(
      (booking) => booking.place,
    );

    // Find rentals that were booked by similar users but not by the current user
    const recommendations = await rentals
      .find({
        _id: { $in: similarRentalIds, $nin: rentalIds }, // Exclude rentals booked by the current user
        // Include rentals booked by similar users
      })
      .limit(5) // Limit the number of recommendations
      .exec();

    return recommendations;
  } catch (error: any) {
    console.error(error.message);
  }
}

// Example usage: Get collaborative filtering recommendations for a specific user
// const userIdToRecommendFor = "your-user-id";
// getCollaborativeFilteringRecommendations(userIdToRecommendFor)
//   .then((recommendations) => {
//     console.log("Collaborative Filtering Recommendations:", recommendations);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
