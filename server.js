const express = require('express')
const dbClient = require("./config/dbDetails.js");
const redisClient = require("./config/redisDetails.js");


const app = express();
  
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.get('/redis-demo', async (req, res) => {
  const key1 = req.query.key;
  const valueStored = await redisClient.get(key1);
  res.send(`GET request received on redis-demo EP, response : ${valueStored}`);
})

app.post('/redis-demo', async (req, res) => {
  const key1 = req.query.key;
  const value1 = req.query.value;
  await redisClient.set(key1, value1);
  res.send(`POST request received on redis-demo EP,and value set`);
})


app.get('/', async (req, res) => {
    const user = req.query.user;
    const db = dbClient.db("autoTrader");
    const collection = db.collection('users');
    //const projection = { password: 1};
    const data=  await collection.findOne({userName:user});
    res.send(`GET request received , response : ${data.accessToken}`);
  })

app.post('/', (req, res) => {
  const user = req.query.user;
  const newToken = req.query.token;
  
  const db = dbClient.db("autoTrader");
  const collection = db.collection('users');

  const query = { userName:user } ;
  const update = { $set: { accessToken:newToken}};
  const options = { upsert: true };
  collection.updateOne(query, update, options);      
  
  res.send('POST request done')
})  

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});