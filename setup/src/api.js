const express=require("express");
import {emailQueue} from './queue.js';
const app=express();
app.use(express.json());

app.post("/welcome",async(req,resp)=>{
    const job=emailQueue.add(
        "send welcome email",
        {
            to:req.body.to,
            name:req.body.name || "Leaner",
        },
        {
            attempts:3,
            backoff:{
                type:"exponential",
                delay:1000,
            }
        }
    )
})
app.listen(3000);

const express=require('express');
const app=express();
app.use(express.json());
app.post("/emails-req",(req,resp)=>{
    const job=emailQueue.add("send welcome email",
        {
            to:req.body.to,
            name:req.body.name,
        }
    )
})