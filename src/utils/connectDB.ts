import mongoose from 'mongoose';

const dbUrl = `mongodb://localhost:6000/mern?authSource=admin`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Database connected...');
  } catch (err: any) {
    console.log(err.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
