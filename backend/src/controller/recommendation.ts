// import rentals from "../model/roomModel";
// import bookings from "../model/bookingModel";
// const calculateFeatureScore = (
//   feature: string,
//   userPreference: string,
// ): number =>
//   feature.toLowerCase().includes(userPreference.toLowerCase()) ? 1 : 0;

// // Define a function to calculate the perks score
// const calculatePerksScore = (
//   rentalPerks: string[],
//   userPerks: string[],
// ): number => {
//   const commonPerks = rentalPerks.filter((perk) => userPerks.includes(perk));
//   return commonPerks.length / userPerks.length;
// };

// // Define a function to calculate the price score
// const calculatePriceScore = (
//   rentalPrice: number,
//   userPrice: number,
// ): number => {
//   const maxPriceDifference = 1000; // Adjust this based on your use case
//   const priceDifference = Math.abs(rentalPrice - userPrice);
//   return 1 - Math.min(1, priceDifference / maxPriceDifference);
// };

// // Define a function to calculate the recommendation score
// const calculateRecommendationScore = (
//   rental: any,
//   userPreferences: Record<string, any>,
// ): number => {
//   const weights: Record<string, number> = {
//     title: 0.2,
//     description: 0.3,
//     perks: 0.2,
//     price: 0.3,
//   };

//   const score = Object.keys(weights).reduce((total, feature) => {
//     if (rental[feature] && userPreferences[feature]) {
//       return (
//         total +
//         weights[feature] *
//           calculateFeatureScore(rental[feature], userPreferences[feature])
//       );
//     }
//     return total;
//   }, 0);

//   return score;
// };

// // Define a function to get recommendations
// export const getRecommendations = async (
//   userId: string,
//   numRecommendations: number,
// ) => {
//   try {
//     const availableRentals = await rentals.find({ isDeleted: false });

//     // Fetch user preferences based on userId from your user model
//     const userPreferences: Record<string, any> = {}; // Retrieve user preferences here

//     const recommendations = availableRentals.map((rental) => {
//       const score = calculateRecommendationScore(rental, userPreferences);
//       return { rental, score };
//     });

//     recommendations.sort((a, b) => b.score - a.score);

//     return recommendations
//       .slice(0, numRecommendations)
//       .map((rec) => rec.rental);
//   } catch (error) {
//     console.error("Error fetching recommendations:", error);
//     throw error;
//   }
// };

// // Define a function to calculate user booking recommendations
// export const calculateUserBookingRecommendations = async (
//   userId: string,
//   numRecommendations: number,
// ) => {
//   try {
//     // Fetch user's bookings
//     const userBookings = await bookings.find({ userId });

//     // Extract place IDs from the user's bookings
//     const placeIds = userBookings.map((booking) => booking.place);

//     // Fetch recommendations based on the places booked by the user
//     const recommendations = await rentals.find({
//       isDeleted: false,
//       _id: { $nin: placeIds }, // Exclude places already booked by the user
//     });

//     return recommendations.slice(0, numRecommendations);
//   } catch (error) {
//     console.error("Error fetching user booking recommendations:", error);
//     throw error;
//   }
// };

// // Create a new endpoint for user booking recommendations

// // ... Keep the previous endpoints and listeners ...

// // ...
