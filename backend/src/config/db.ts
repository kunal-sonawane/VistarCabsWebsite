import mongoose from "mongoose";

export function isDatabaseUnavailable(error?: unknown) {
  if (mongoose.connection.readyState !== 1) return true;
  if (!error || typeof error !== "object") return false;
  const name = "name" in error ? String(error.name) : "";
  const message = "message" in error ? String(error.message) : "";
  return (
    /serverselection|network|notconnected|topology|timeout/i.test(name) ||
    /buffering timed out|connection timed out|failed to connect/i.test(message)
  );
}

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
