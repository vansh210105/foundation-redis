const express=require('express');
const app=express();
const stripe=require('stripe');
app.post("/checkout",async(req,resp)=>{
    const {amount,productName}=req.body;
    const session=await stripe.checkout.session.create({
        payment_method_types:['card'],
        line_items:[{
            price_data:{
                currency:'usd',
                product_data:{
                    name:productName,
                },
                unit_amount:amount*100,
            },
            quantity:req.body.quantity,
        }],
        mode:'payment',
        success_url:"https://localhost:3000/success",
        cancel_url:"https://localhost:3000/cancel",
        

    })
})

app.post('/checkout/add',(req,resp)=>{
    const {sessionId,...productData}=req.body;
    if(!sessionId){
        return resp.status.send({result:"sessionId is required"})
    };
    const session=stripe.checkout.session.retrieve(sessionId);
    if(session.payment_status!=='paid'){
        return resp.status(400).send({result})
    }
})

