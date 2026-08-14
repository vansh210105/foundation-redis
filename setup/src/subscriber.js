import Redis from "ioredis";

const subscriber = new Redis(
    process.env.REDIS_URL || "redis://localhost:6379"
);

// Step 1: Join the "notifications" channel
subscriber.subscribe("notifications", (err) => {
  if (err) {
    console.log("Subscription failed:", err.message);
    return;
  }

  console.log("Successfully subscribed to notifications");
});



// Step 2: Wait for incoming messages
subscriber.on("message", (channel, message) => {
  console.log("\nNew Message Received!");
  console.log("Channel:", channel);

  const data = JSON.parse(message);

  console.log("User:", data.user);
  console.log("Message:", data.text);
});

console.log("Waiting for messages...");