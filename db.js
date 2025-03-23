const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://sakshichaurasia66:5sakshi12345@cluster0.8pr1d.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  await mongoose.connect(mongoURI);
  console.log("Connected to MongoDB");

  const fetched_data = await mongoose.connection.db.collection("food_items");

  // Use async/await instead of callback for cleaner code
  fetched_data.find({}).toArray(async function (err, data) {
    const foodCategory = await mongoose.connection.db.collection(
      "foodCategory"
    );
    foodCategory.find({}).toArray(function (err, catData) {
      if (err) console.log(err);
      else {
        global.food_items = data;
        global.foodCategory = catData;
      }
    });
  });
};


module.exports = mongoDB;
























// const mongoose = require('mongoose');

// const mongoDB = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://sakshichaurasia66:5sakshi12345@cluster0.8pr1d.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB Connected");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//   }
// };

// module.exports = mongoDB;

