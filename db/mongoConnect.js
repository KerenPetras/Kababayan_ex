const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb+srv://dio_rull3rJojo:5POJnMDLiNLrhi6u@cluster0.cwiy20e.mongodb.net/Kababayan_explore');
  console.log("mongo connect Kababayan_explore_serverside");
  
}