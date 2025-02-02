import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../services/database.service';
import User from '../models/User';
import { randomInt } from 'crypto';

const router: Router = Router();

router.post('/signup', async (req: Request, res: Response) => {

  const email: string = req.body.email as string;
  const password: string = req.body.password as string;
  const name: string = req.body.name as string;

  if (!email || !password || !name) {
    res.status(400).send('Email and password are required');
    return;
  }

  const user: User = {
    _id: new ObjectId(),
    email,
    password,
    name,
  };

  user.data = generateMockData();

  const result = await collections.users.insertOne(user);
  res.status(201).send();
});

router.post('/login', async (req: Request, res: Response) => {
  const email: string = req.body.email as string;
  const password: string = req.body.password as string;

  if (!email || !password) {
    res.status(400).send('Email and password are required');
    return;
  }

  const user = await collections.users.findOne({ email, password });
  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  res.send(user._id);
});

router.get('/user/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).send('User ID is required');
    return;
  }

  const user = await collections.users.findOne({ _id: new ObjectId(userId) });
  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  res.send(user);
});

router.put('/user/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).send('User ID is required');
    return;
  }

  const result = await collections.users.updateOne({ _id: new ObjectId(userId) }, { $set: req.body as User });

  if (result.modifiedCount === 0) {
    res.status(404).send('User not found');
    return;
  }
});

router.get('/users', async (req: Request, res: Response) => {

  const users = await collections.users.find().toArray();
  res.send(users);
});

export function generateMockData(): any {

  let data: {
    cumulativeEarnings: { [year: number]: number[] },
    cumulativeSpendings: { [year: number]: number[] },
    spending: {
      categories: {
        name: string, amount: number
      }[],
    },
  } = {
    cumulativeEarnings: { 2024: Array(12).fill(randomInt(1500, 2500)) },
    cumulativeSpendings: { 2024: Array.from({ length: 12 }, () => randomInt(1500, 2000)) },
    spending: {
      categories: [
        { name: 'Rent', amount: randomInt(1000, 1600) },
        { name: 'Food', amount: randomInt(250, 500) },
        { name: 'Transportation', amount: randomInt(20, 150) },
        { name: 'Entertainment', amount: randomInt(50, 250) },
        { name: 'Shopping', amount: randomInt(50, 250) },
        { name: 'Health', amount: randomInt(50, 150) },
        { name: 'Other', amount: randomInt(50, 250) },
      ],
    },
  };

  return data;
}

export default router;