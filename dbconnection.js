const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      // const url =
      // "mongodb+srv://root:" +
      // process.env.MONGO_ATLAS_PASS +
      // "@docdb-2022-02-17-21-16-45.cluster-c6uvus96jlgd.eu-central-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";
    

      const conn = await mongoose.connect(`mongodb://localhost:27017/local_nuavto`, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected:` ,conn.connection.host);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
  module.exports = connectDB