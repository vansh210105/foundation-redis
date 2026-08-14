import Redis from "ioredis";

const publisher = new Redis(
    process.env.REDIS_URL || "redis://localhost:6379"
);

const message = {
    user: "Vansh",
    text: "Hello from Publisher!"
};

publisher.publish(
    "notifications",
    JSON.stringify(message)
);

console.log("Message Published!");