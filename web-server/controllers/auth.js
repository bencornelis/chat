import express from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const {
    username,
    password,
  } = req.body;
console.log('signing up user', username, password)
  const hashedPassword = bcrypt.hashSync(password, 8);

  let id;
  try {
    id = await User.create({
      username,
      password: hashedPassword
    });
  } catch(error) {
    console.error('could not sign up user', error);
    res.status(500).send('There was a problem registering the user.');
  }

  const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: 86400 });
  res.json({ auth: true, token });
});

router.post('/login', async (req, res) => {
  console.log('headers', req.headers)
  const {
    username,
    password,
  } = req.body;

  let user;
  try {
    user = await User.findBy({ username });
  } catch(error) {
    console.error('could not log in user', error);
    res.sendStatus(404).send('No user found');
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    res.status(401).send({ auth: false, token: null });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });
  res.json({ auth: true, token });
});

export default router;
