const redis = require('redis');
let redisClient;

(async () => {
  redisClient = redis.createClient({  url: 'redis://redis:6379'});
  //redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();

module.exports = redisClient;