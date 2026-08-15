import express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const BANNER_KEY="hello";
const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) return;

  const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/appdb";
  await mongoose.connect(mongoUrl);
};

function otpkey(phone){
    return `otp:${phone}`;
}
app.post("/otp",(req,resp)=>{
    const {phone}=req.body;
    const otp=Math.floor(10000+Math.random()*90000).toString();
    await redis.set(otpkey(phone),otp,'EX',30);
    resp.json({message:'otp sent',otp})
})

app.get("otp/verify",async(req,resp)=>{
    const {phone,otp}=req.body;
    const savedOtp=await redis.get(otpKey(phone));
     if(savedOtp==otp){
        resp
     }
})

app.post("/user/:id/json",async(req,resp)=>{
    await redis.set(`user:${req.params.id}:json`,Stringify(req.body));
    resp.json({savedAs:"json"});
})

app.get("/user/:id/json",async(req,resp)=>{
    console.log("testing github")
    let res=await redis.get(`user:${req.params.id}:json`);
    resp.json({user:res?JSON.parse(res):null});

})

app.post("user/:id/hash",(req,resp)=>{
    console.log("testing feature branchs")
    await redis.hset(`user:${req.params.id}:hash`,req.body);
    resp.json({savedAs:"hash"});
})

app.get("user/:id/hash",(req,resp)=>{
    let res=await redis.hgetall(`user:${req.params.id}:hash`);
    resp.json({res})
})

app.listen(3000,()=>{
    console.log("app listening on port 3000");
})

// app.get("/health", (_req, res) => {
//   res.json({ status: "ok" });
// });

// app.get("/redis", async (_req, res) => {
//   try {
//     const reply = await redis.ping();
//     res.json({ redis: reply });
//   } catch (error) {
//     console.error("Redis error:", error);
//     res.status(500).json({ error: "Redis unavailable" });
//   }
// });

// app.post("/make",async(req,resp)=>{
//     try{
//         const 
//         const res=await redis.set(BANNER_KEY,req.body.message||"welcome to chai or code")
//     }
// })

// app.get("/mongo", async (_req, res) => {
//   try {
//     await connectMongo();
//     res.json({ mongo: "connected" });
//   } catch (error) {
//     console.error("MongoDB error:", error);
//     res.status(500).json({ error: "MongoDB unavailable" });
//   }
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
