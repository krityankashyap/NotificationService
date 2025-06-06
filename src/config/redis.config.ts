import Redis from 'ioredis';
import { serverConfig } from '.';

// Singleton pattern to connect with Redis
function connectionToRedis(){

 try {

  let connection: Redis;

  const redisConfig = {
    host: serverConfig.REDIS_HOST,
    port: serverConfig.REDIS_PORT,
    maxRetriesPerRequest: null, // Disable automatic reconnection
  }
  
  return () => {
    if(!connection){
      connection = new Redis(redisConfig);
      return connection;
    }

    return connection;
  }

 } catch (error) {
   console.log("Error connection to reddis: ",error);
   throw error;
 }
}

// Singleton Object :- it is an object that is actually created once in the lifetime of ur code running and whenever someone agains tries to get that object the same already created object will returned, u don't create a brand new object for the same singleton alltogether so here we gonna make this function as singleton so that we don't need to make connection object again and again

export const getRedisConnectionObject = connectionToRedis();