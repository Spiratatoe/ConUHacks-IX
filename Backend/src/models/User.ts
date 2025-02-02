import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public _id: ObjectId,
    public email: string,
    public password: string,
    public name: string,
    public data?: {
      cumulativeEarnings: { [year: number]: number[] },
      cumulativeSpendings: { [year: number]: number[] },

      spending: {
        categories: {
          name: string, amount: number
        }[],
      },
      [key: string]: any
    }
  ) { }
}