import BaseRepository from "./base/baseRepository";
import Message from "./entity/messages";

export default class MessageRepository extends BaseRepository<Message> {
  countOfMessages(): Promise<number> {
    return this.collection.countDocuments({});
  }
}