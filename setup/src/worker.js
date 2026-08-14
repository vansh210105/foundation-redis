import {Worker} from 'bullmq';
import {connection} from './queue.js';
const worker=new Worker(
    "emails",
    async (job)=>{
        console.log("processing email job", Job.name, Job.id, Job.data);
        await new Promise((res)=>{
            setTimeout(res,1500);
        })
    },
    {connection},
);
worker.on("completed",(job)=>{
    console.log("job completed",job.id,job.name,job.data);
});
worker.on("failed",(job,err)=>{
    console.log("job failed",job.id,job.name,job.data,err);
})
