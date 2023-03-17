import * as mongoDB from 'mongodb';
import { ObjectId } from 'mongodb';

require('dotenv').config();

let db : mongoDB.Db;
let col: mongoDB.Collection;

const init = async () => {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hackdayidea.bdc1jdl.mongodb.net/?retryWrites=true&w=majority`,
      );
    try {
        await client.connect();
        db = await client.db(`${process.env.MONGO_DB}`);
        col = db.collection(`${process.env.MONGO_COLLECTION}`);
        console.log('Connected successfully to server');
    } catch (err) {
        console.error(err);
    }
};

type User = {
    _id?: ObjectId,
    username: string,
    password: string,
    savedQuotes: string[],
}

export const getOne = async (username: string, password: string) => {
    const data = (await col.find<User>({ username: `${username}`, password: `${password}` }).toArray());
    return data;
};

export const saveQuote = async (id: ObjectId, quote: string) => {
    const data = (await col.updateOne({ _id: new ObjectId(id) },
     { $push: {savedQuotes: `${quote}`}}));
    return data;
};  

export const deleteQuote = async (id: ObjectId, quote: string) => {
    const data = (await col.updateOne({ _id: new ObjectId(id) },
     { $pull: {savedQuotes: `${quote}`}}));
    return data;
}

export const createUser = async (username: string, password: string) => {
    const newUser = {
        username: username,
        password: password,
        savedQuotes: [],
    }
    const data = await col.insertOne(newUser);
    return data;
}

init();