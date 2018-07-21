import express from 'express';
import Channel from '../models/channel';
import authMiddleware from '../middleware/auth';
import User from '../models/user';
import * as R from 'ramda';

const router = express.Router();
router.use(authMiddleware.isUserAuthenticated);

router.get('/', async (req, res) => {
  let channels;
  try {
    channels = await Channel.getAll();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  res.json({ channels });
});

router.get('/:channelId/messages', async (req, res) => {
  let messages;
  try {
    messages = await Channel.getMessages(req.params.channelId);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  let users;
  try {
    const userIds = R.compose(R.uniq, R.map(R.prop('userId')))(messages);
    users = await User.getByIds(userIds);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  const userMap = R.reduce((acc, user) => R.assoc(user.id, user)(acc), {})(users);
  messages = R.map(message => {
    const username = R.path([message.userId, 'username'])(userMap);
    return R.merge(message, { username });
  })(messages);

  res.json({ messages });
});

export default router;
