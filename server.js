import { app } from "./app.js";
import { connectToMongoDB } from "./data/database.js";

// Connecting to MongoDB
connectToMongoDB();

// Listen on Server
app.listen(process.env.PORT, () => {
  console.log(`Server is working on port ${process.env.PORT}`);
});
