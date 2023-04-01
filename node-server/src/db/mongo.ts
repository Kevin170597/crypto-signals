import 'dotenv/config';
import { connect } from 'mongoose';

export const dbConnect = async () => {
    const DB_URI = <string>process.env.DB_URI;
    await connect(DB_URI, { dbName: process.env.DB_NAME});
};