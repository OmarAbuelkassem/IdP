// Use Google and Cloudflare DNS to resolve the connection issue with mongoDB
import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import "dotenv/config"; // Must stay at the top to load .env before anything else.
import app from "./app.js";
import connectToMongoDB from "./config/mongo.js";
import redis from "./config/redis.js";

connectToMongoDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
