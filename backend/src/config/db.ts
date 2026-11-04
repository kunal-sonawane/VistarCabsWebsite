import mongoose from "mongoose";
export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri)
    throw new Error(
      "MONGODB_URI is required. Configure MongoDB before starting the inquiry API.",
    );
  const dbName = process.env.MONGODB_DATABASE_NAME || "vistar_cabs";
  await mongoose.connect(uri, { dbName, serverSelectionTimeoutMS: 10000 });
  console.log(`MongoDB connected to database: ${mongoose.connection.name}`);
}
