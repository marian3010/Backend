"use strict";
/*import {
    Db,
    Collection,
    InsertOneWriteOpResult,
    WithId,
    DeleteWriteOpResultObject,
    UpdateWriteOpResult,
    ObjectId,
} from "mongodb";
  
  import IWrite from "../interfaces/IWrite";
  import IRead from "../interfaces/IRead";
  
  export default abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    public readonly collection: Collection;
  
    constructor(db: Db, collectionName: string) {
      this.collection = db.collection(collectionName);
    }
  
    async create(item: T): Promise<boolean> {
      const result: InsertOneWriteOpResult<WithId<T>> =
        await this.collection.insertOne(item);
  
      return !!result.result.ok;
    }
  
    async find(): Promise<T[]> {
      return this.collection.find({}).toArray();
    }
  
  }
  */ 
