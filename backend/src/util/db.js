import { MongoClient } from 'mongodb';

let dbInstance = null;


export const getDbConnection =  async (dbName) => {
    if (dbInstance) {
         return dbInstance; // Return the existing dbInstance
    }
   try{
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    dbInstance = client.db(dbName); // Store the connection in dbInstance
    console.log('Connected to MongoDB');

    return dbInstance;
   } catch (error) {
       console.error('Error connecting to the database:', error);
       throw new Error('Database connection failed');
   }
}