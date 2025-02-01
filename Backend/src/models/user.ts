import { ObjectId } from "mongodb";

export default class user {
  constructor(
    public id: ObjectId,
    public email: string,
    public password: string,
    public name: string,
  ) { }
}