import * as mongoDB from 'mongodb';
import { ObjectId } from 'mongodb';

require('dotenv').config();

type User = {
    _id?: ObjectId,
    username: string,
    password: string,
    savedQuotes: string[],
}

export const getOne = async (username: string, password: string) => {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hackdayidea.bdc1jdl.mongodb.net/?retryWrites=true&w=majority`,
    );
    await client.connect();
    const db: mongoDB.Db = client.db(`${process.env.MONGO_DB}`);
    const col: mongoDB.Collection = db.collection(`${process.env.MONGO_COLLECTION}`);
    const data = (await col.find<User>({ username: `${username}`, password: `${password}` }).toArray());
    await client.close();
    return data;
};

export const saveQuote = async (id: ObjectId, quote: string) => {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hackdayidea.bdc1jdl.mongodb.net/?retryWrites=true&w=majority`,
    );
    await client.connect();
    const db: mongoDB.Db = client.db(`${process.env.MONGO_DB}`);
    const col: mongoDB.Collection = db.collection(`${process.env.MONGO_COLLECTION}`);
    const data = (await col.updateOne({ _id: new ObjectId(id) },
     { $push: {savedQuotes: `${quote}`}}));
    await client.close();
    return data;
};  

export const deleteQuote = async (id: ObjectId, quote: string) => {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hackdayidea.bdc1jdl.mongodb.net/?retryWrites=true&w=majority`,
    );
    await client.connect();
    const db: mongoDB.Db = client.db(`${process.env.MONGO_DB}`);
    const col: mongoDB.Collection = db.collection(`${process.env.MONGO_COLLECTION}`);
    const data = (await col.updateOne({ _id: new ObjectId(id) },
     { $pull: {savedQuotes: `${quote}`}}));
    await client.close();
    return data;
}

export const createUser = async (username: string, password: string) => {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hackdayidea.bdc1jdl.mongodb.net/?retryWrites=true&w=majority`,
    );
    await client.connect();
    const db: mongoDB.Db = client.db(`${process.env.MONGO_DB}`);
    const col: mongoDB.Collection = db.collection(`${process.env.MONGO_COLLECTION}`);
    const newUser = {
        username: username,
        password: password,
        savedQuotes: [],
    }
    const data = await col.insertOne(newUser);
    await client.close();
    return data;
}