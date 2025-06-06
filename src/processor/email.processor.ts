import { Job, Worker } from 'bullmq';
import { notificationDTO } from '../dto/notification.dto';
import { MAILER_QUEUE } from '../queues/mailer.queue';
import { getRedisConnectionObject } from '../config/redis.config';
import { MAILER_PAYLOAD } from '../producer/email.producer';


export const setupMailWorker = () => {
  const emailProcessor = new Worker<notificationDTO>(
    MAILER_QUEUE,  // Name of the queue
    async (job: Job)=>{  // Process function where how email is gonna processed is defined 
       
    if(job.name !== MAILER_PAYLOAD){
      throw new Error("invalid job name");
    }
  
  
    // else call the service layer  
   const payload = job.data;
   console.log(`Processing email for: ${JSON.stringify(payload)}`);
  
    }, 
    {
      connection: getRedisConnectionObject(), // which redis instance u technically want to connect 
    }
  )
  
  // this on function technically gives a lots of events like fails etc
  emailProcessor.on("failed" , ()=>{
    console.log("Email Processing failed");
  });
  
  emailProcessor.on("completed" , ()=>{
    console.log("Email processing completed successfully");
  });
}