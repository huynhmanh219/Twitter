import {Collection, Db, MongoClient} from 'mongodb';
import 'dotenv/config' 
import User from '~/models/Schema/User.schema';
const url = process.env.MONGO_URL || "mongodb://localhost:27017/twitter-dev"

class DatabaseService{
    private client:MongoClient
    private db:Db
  constructor(){
      this.client = new MongoClient(url);
      this.db = this.client.db("twitter-dev")
  }

  async connect(){
    try {
      await this.client.connect();
      await this.db.command({ ping: 1 });
      console.log("Connected successfully to server");
      
    } finally {
      await this.client.close();
    }
  }

  get users():Collection<User>{
    return this.db.collection(process.env.DB_COLLECTION_USERS as string)
  }
}

const databaseService = new DatabaseService();

export default databaseService;