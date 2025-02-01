import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../services/database.service';
import User from '../models/User';

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

export default router;
