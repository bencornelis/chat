import express from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as R from 'ramda';
import authMiddleware from '../middleware/auth';

const router = express.Router();

const SAFE_USER_FIELDS = ['id', 'username'];
const filterUser = R.pick(SAFE_USER_FIELDS);

router.post('/signup', async (req, res) => {
  const {
    username,
    password,
  } = req.body;

  let id;
  try {
    id = await User.create({
      username,
      password,
    });
  } catch(error) {
    console.error('could not sign up user', error);
    res.status(500).send('There was a problem registering the user.');
  }

  const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: 86400 });
  res.json({ auth: true, token, user: { id, username } });
});

router.post('/login', async (req, res) => {
  const {
    username,
    password,
  } = req.body;

  let user;
  try {
    user = await User.findBy({ username });
  } catch(error) {
    console.error('could not log in user', error);
    res.sendStatus(500);
  }

  if (!user) {
    console.log('could not find user with username', username);
    return res.sendStatus(404);
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({ auth: false, token: null });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });
  res.json({ auth: true, token, user: filterUser(user) });
});

router.get('/user/me', authMiddleware.isUserAuthenticated, async (req, res) => {
  const userId = req.userId;

  let user;
  try {
    user = await User.find(userId);
  } catch(error) {
    console.error('error finding user', error);
    res.sendStatus(500);
  }

  if (!user) {
    console.log('could not find user with id', userId);
    return res.sendStatus(404);
  }

  res.json({ user: filterUser(user) });
});

export default router;
